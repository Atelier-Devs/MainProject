import React, { useEffect, useState } from "react";
import { addToCart, fetchCartItems } from "./api.js";

const CartPage = ({ userId }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    try {
      const items = await fetchCartItems(userId);
      setCartItems(items);
    } catch (error) {
      console.error("Failed to load cart items", error);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(userId, productId);
      loadCartItems();
    } catch (error) {
      console.error("Failed to add item to cart", error);
    }
  };

  return (
    <div>
      <h1>장바구니</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.cartNo}>
            {item.product.pName} - {item.product.pPrice}원
          </li>
        ))}
      </ul>
      <button onClick={() => handleAddToCart(1)}>상품 1번 장바구니 추가</button>
    </div>
  );
};

export default CartPage;
