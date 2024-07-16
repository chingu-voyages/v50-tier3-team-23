import React, { useState } from 'react';
import "./ProductSelector.css"
type Product = {
  img: string;
  name: string;
  dsc: string;
  price: number;
};

type ProductsSelectorProps = {
  data: Record<string, Product[]>; 
  selectedProduct: string;
};

export const ProductSelector: React.FC<ProductsSelectorProps> = (props) => {
  const { data, selectedProduct } = props;

  function createProductDivs(productData: Record<string, Product[]>): React.ReactNode {
    if (productData && productData[selectedProduct]) {
      return productData[selectedProduct].slice(-5).map((item, index) => (
        <div className='product-info-div' key={index}>
          <div className='info-and-img'>
            <img src={item.img} alt={item.name} width={50} height={50} />
            <p>{item.dsc}</p>
          </div>
          <div>
            <p>{item.price}.00 $</p>
            <button>+</button>
          </div>
        </div>
      ));
    }
    return null; // Handle case when selectedProduct is not found
  }

  return (
    <div className="">
      {createProductDivs(data)}
    </div>
  );
};
