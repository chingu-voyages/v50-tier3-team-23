import React from 'react';

interface ProductDetail {
  type?: string;
  name?: string;
  price?: number;
  description?: string;
  discount?: number;
}

export const Product: React.FC<ProductDetail> = ({
  type = "Pizza",
  name = "Pepperoni Pineapple Pizza",
  price = 15,
  description = "This is a pizza with pepperoni and pineapple",
  discount = 0
}) => {
  return (
    <div className={type}>
      <div>{name}</div>
      <div>{price + "$"}</div>
      <div>{description}</div>
    </div>
  );
};
