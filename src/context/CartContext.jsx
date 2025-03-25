import React, { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  
  const addToCart = (item) => {
    
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    
    if (existingItem) {
      
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      
      setCartItems((prevItems) => [
        ...prevItems,
        { ...item, quantity: 1 },
      ]);
    }
  };

  
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  
  const clearCart = () => {
    setCartItems([]);
  };

  
  const isCartEmpty = () => {
    return cartItems.length === 0;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        isCartEmpty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
