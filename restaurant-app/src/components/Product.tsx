import React from 'react';

interface ProductProps {
  type?: string;
  name?: string;
  price?: number;
  description?: string;
  discount?: number;
}

export const Product: React.FC<ProductProps> = ({
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
