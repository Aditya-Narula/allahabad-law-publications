"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "alp-shopping-cart";

function createCartItem(slug, book, quantity = 1) {
  return {
    slug,
    englishTitle: book.englishTitle,
    hindiTitle: book.hindiTitle || "",
    cover: book.cover || "/covers/alp-placeholder.jpg",
    category: book.category || "",
    author: book.author || "",
    edition: book.edition || "",
    mrp: Number(book.mrp) || 0,
    salePrice: Number(book.salePrice) || 0,
    discountPercent: Number(book.discountPercent) || 0,
    quantity: Math.max(1, Number(quantity) || 1),
  };
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          const validItems = parsedCart.filter(
            (item) =>
              item &&
              item.slug &&
              item.englishTitle &&
              Number(item.quantity) > 0
          );

          setCartItems(validItems);
        }
      }
    } catch (error) {
      console.error("Unable to load the shopping cart:", error);
      localStorage.removeItem(CART_STORAGE_KEY);
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Unable to save the shopping cart:", error);
    }
  }, [cartItems, isReady]);

  const addItem = useCallback((slug, book, quantity = 1) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.slug === slug);

      if (existingItem) {
        return currentItems.map((item) =>
          item.slug === slug
            ? {
                ...item,
                quantity: item.quantity + Math.max(1, Number(quantity) || 1),
              }
            : item
        );
      }

      return [...currentItems, createCartItem(slug, book, quantity)];
    });
  }, []);

  const increaseQuantity = useCallback((slug) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.slug === slug
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }, []);

  const decreaseQuantity = useCallback((slug) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.slug === slug
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const setItemQuantity = useCallback((slug, quantity) => {
    const numericQuantity = Number(quantity);

    if (!Number.isFinite(numericQuantity)) {
      return;
    }

    if (numericQuantity <= 0) {
      setCartItems((currentItems) =>
        currentItems.filter((item) => item.slug !== slug)
      );

      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.slug === slug
          ? {
              ...item,
              quantity: Math.floor(numericQuantity),
            }
          : item
      )
    );
  }, []);

  const removeItem = useCallback((slug) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.slug !== slug)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getItemQuantity = useCallback(
    (slug) => {
      const item = cartItems.find((cartItem) => cartItem.slug === slug);
      return item ? item.quantity : 0;
    },
    [cartItems]
  );

  const totalQuantity = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0
      ),
    [cartItems]
  );

  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total +
          Number(item.salePrice || 0) * Number(item.quantity || 0),
        0
      ),
    [cartItems]
  );

  const totalSavings = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total +
          Math.max(
            0,
            Number(item.mrp || 0) - Number(item.salePrice || 0)
          ) *
            Number(item.quantity || 0),
        0
      ),
    [cartItems]
  );

  const value = useMemo(
    () => ({
      cartItems,
      isReady,
      addItem,
      increaseQuantity,
      decreaseQuantity,
      setItemQuantity,
      removeItem,
      clearCart,
      getItemQuantity,
      totalQuantity,
      cartTotal,
      totalSavings,
    }),
    [
      cartItems,
      isReady,
      addItem,
      increaseQuantity,
      decreaseQuantity,
      setItemQuantity,
      removeItem,
      clearCart,
      getItemQuantity,
      totalQuantity,
      cartTotal,
      totalSavings,
    ]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider.");
  }

  return context;
}