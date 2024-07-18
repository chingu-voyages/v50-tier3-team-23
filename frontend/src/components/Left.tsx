import React, {useState} from 'react';
import {Navbar} from '../components/navbar/Navbar';
import {ProductSelector} from './productSelector/ProductSelector';

type LeftProps = {
    data: any;
};

const Left:React.FC<LeftProps> = (props) => {
    const {data} = props;
    const productCategs = Object.keys(data || {});

    const [selectedProduct, setSelectedProduct] = useState("");

    function navbarHasSelected(selection:string){
        setSelectedProduct(selection);
    }

    return (
    <div className=" flex-1">
        <h2 className="font-poppins-bold cursor-pointer inline-block relative select-none text-3xl">What you like ? </h2>
        <Navbar categs={productCategs} navbarHasSelected={navbarHasSelected}/>
        <ProductSelector data = {data} selectedProduct = {selectedProduct} ></ProductSelector>
    </div>    
    )
}

export default Left