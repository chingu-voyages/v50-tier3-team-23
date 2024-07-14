import React, { useState, useEffect } from 'react';
import "./navbar.css";

export const Navbar = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [products, setProducts] = useState<string[]>([]);
  const [productsInfo, setProductsInfo] = useState<any[]>([]);
  const [data, setData] = useState<any | null>(null);

  //fetch the data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://menus-api.vercel.app/");

        if (!response.ok) {
          throw new Error("Failed to fetch the data");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  //organize data
  useEffect(() => {
    if (data) {
      divideRelevantData(data);
    }
  }, [data]);

  function divideRelevantData(data: Record<string, any[]>) {
    
    const newProducts = ["burgers", "fried-chicken", "bbqs","pizzas", "drinks", "desserts"];
    setProducts(newProducts);

    const newProductsInfo = newProducts.map(key => ({ [key]: data[key].slice(-5) }));
    setProductsInfo(newProductsInfo);
  }

  function createNavbarItems(productsCategories: string[]) {
    return productsCategories.map((prod, index) => (
      <div
        className={`product ${selectedProduct === prod ? 'selected' : ''}`}
        id={prod + index}
        key={index}
        onClick={() => setSelectedProduct(prod)}
      >
        {prod}
      </div>
    ));
  }

  function createProductDivs(productsInfo: any[]) {
    const selectedProductInfo = productsInfo.find(info => info[selectedProduct]);

    if (selectedProductInfo) {
      return selectedProductInfo[selectedProduct].map((item: any, index: number) => (
        <div className='product-info-div' key={index}>
          <div className='info-and-img'>
          <img src={item.img} alt={item.name} width={50} height={50}/>
            <p>{item.dsc}</p>
          </div>
          <div>
            <p>{item.price}.00 $</p>
            <button>+</button>
          </div>
        </div>
      ));
    }

    return null; // Handle case when selectedProductInfo is not found
  }

  if (!data) return <div>Loading...</div>;

  return (
    <div>

      <div className='navbar'>
        <div className='iconDiv'>
          <img src="/src/assets/pictures/knife-fork-nutrition-food-128.svg" alt="fork and knife" width="24" height="24" />
        </div>
        <div className='menu-list'>
          {createNavbarItems(products)}
        </div>
      
      </div>
      <div className='list-items'>
        {createProductDivs(productsInfo)}
      </div>
    </div>
  );
};
