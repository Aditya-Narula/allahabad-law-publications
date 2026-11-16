
"use client";

import { books } from "@/app/data/books";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "alp-shopping-cart";


function isBookAvailable(book) {
  return (
    book &&
    book.unavailable !== true &&
    Number(book.mrp) > 0 &&
    Number(book.salePrice) > 0 &&
    Number(book.stock) > 0
  );
}


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
    stock: Math.max(0, Math.floor(Number(book.stock) || 0)),
    quantity: Math.max(1, Number(quantity) || 1),
  };
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [cartVerified, setCartVerified] = useState(false);
  const [cartVerificationError, setCartVerificationError] = useState("");

const syncSequence = useRef(0);
const cartRef = useRef(cartItems);

useEffect(() => {
  cartRef.current = cartItems;
}, [cartItems]);

  // Load the saved cart from browser storage.
  useEffect(() => {
    let isActive = true;

    async function loadCart() {
      // Defer state updates until after the effect has completed.
      await Promise.resolve();

      if (!isActive) {
        return;
      }

      try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);

        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);

          if (Array.isArray(parsedCart)) {

const validItems = parsedCart.flatMap((item) => {
  if (!item || typeof item.slug !== "string") {
    return [];
  }

  const currentBook = books[item.slug];

  if (!isBookAvailable(currentBook)) {
    return [];
  }

  const requestedQuantity = Math.floor(
    Number(item.quantity)
  );

  if (!Number.isFinite(requestedQuantity) || requestedQuantity <= 0) {
    return [];
  }

  const quantity = Math.min(
    requestedQuantity,
    Number(currentBook.stock)
  );

  return [
    createCartItem(item.slug, currentBook, quantity),
  ];
});


            if (isActive) {
              setCartItems(validItems);
            }
          }
        }
      } catch (error) {
        console.error("Unable to load the shopping cart:", error);

        try {
          localStorage.removeItem(CART_STORAGE_KEY);
        } catch (storageError) {
          console.error("Unable to clear invalid cart storage:", storageError);
        }
      } finally {
        if (isActive) {
          setIsReady(true);
        }
      }
    }

    loadCart();

    return () => {
      isActive = false;
    };
  }, []);

  // Save cart changes to browser storage.
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
    setCartVerified(false);
    syncSequence.current += 1;
   const currentBook = books[slug];
   const visibleBook = isBookAvailable(book) ? book : currentBook;

if (!isBookAvailable(visibleBook) || !isBookAvailable(currentBook)) {
  return;
}
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.slug === slug);

      if (existingItem) {
        return currentItems.map((item) =>
          item.slug === slug
            ? {
                ...item,
                stock: Math.min(Number(currentBook.stock), Number(visibleBook.stock)),
                quantity: Math.min(
  Number(currentBook.stock),
  Number(visibleBook.stock),
  item.quantity + Math.max(1, Math.floor(Number(quantity) || 1))
),
              }
            : item
        );
      }

      return [
  ...currentItems,
  createCartItem(
    slug,
    visibleBook,
    Math.min(
      Number(currentBook.stock),
      Number(visibleBook.stock),
      Math.max(1, Math.floor(Number(quantity) || 1))
    )
  ),
];
    });
  }, []);

  const increaseQuantity = useCallback((slug) => {
    setCartVerified(false);
    syncSequence.current += 1;
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.slug === slug
          ? {
              ...item,
              quantity: Math.min(
                Math.max(0, Number(item.stock) || 0),
                item.quantity + 1
              ),
            }
          : item
      )
    );
  }, []);

  const decreaseQuantity = useCallback((slug) => {
    setCartVerified(false);
    syncSequence.current += 1;
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
    setCartVerified(false);
    syncSequence.current += 1;
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
              quantity: Math.min(
                Math.max(0, Number(item.stock) || 0),
                Math.floor(numericQuantity)
              ),
            }
          : item
      )
    );
  }, []);

  const removeItem = useCallback((slug) => {
    setCartVerified(false);
    syncSequence.current += 1;
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.slug !== slug)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartVerified(false);
    syncSequence.current += 1;
    setCartItems([]);
  }, []);

  const getItemQuantity = useCallback(
    (slug) => {
      const item = cartItems.find((cartItem) => cartItem.slug === slug);
      return item ? item.quantity : 0;
    },
    [cartItems]
  );

  const syncCart = useCallback(async () => {
    const seq = ++syncSequence.current;
    const snapshot = cartRef.current;
    const slugs = [...new Set(snapshot.map((item) => item.slug))];
    setCartVerified(false);
    setCartVerificationError("");

    if (slugs.length === 0) {
      setCartVerified(true);
      return true;
    }

    try {
      const res = await fetch("/api/cart/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slugs }),
        cache: "no-store",
      });
      const result = await res.json();
      if (!res.ok || !Array.isArray(result.books)) {
        throw new Error(result.error || "Cart verification is unavailable.");
      }

      if (seq !== syncSequence.current) return false;
      const databaseBooks = new Map(result.books.map((book) => [book.slug, book]));
      const updated = snapshot.flatMap((item) => {
        const db = databaseBooks.get(item.slug);
        const local = books[item.slug];
        if (!local || !db) return [];
        const stock = Number(db.stock);
        const price = Number(db.price);
        if (
          local.unavailable === true ||
          !Number.isInteger(stock) || stock <= 0 ||
          !Number.isFinite(price) || price <= 0
        ) return [];
        return [{
          ...item,
          stock,
          salePrice: price,
          quantity: Math.min(item.quantity, stock),
        }];
      });

      const changed = updated.length !== snapshot.length || updated.some((item, i) =>
        item.slug !== snapshot[i]?.slug ||
        item.quantity !== snapshot[i]?.quantity ||
        item.salePrice !== snapshot[i]?.salePrice ||
        item.stock !== snapshot[i]?.stock
      );
      if (changed) setCartItems(updated);
      setCartVerified(true);
      if (updated.length !== snapshot.length || updated.some((item, i) =>
        item.quantity !== snapshot[i]?.quantity || item.salePrice !== snapshot[i]?.salePrice
      )) {
        setCartVerificationError("Your cart was updated to match current prices and availability.");
      }
      return true;
    } catch (error) {
      if (seq === syncSequence.current) {
        setCartVerified(false);
        setCartVerificationError(error.message || "Cart verification failed.");
      }
      return false;
    }
  }, []);

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
      cartVerified,
      cartVerificationError,
      syncCart,
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
      cartVerified,
      cartVerificationError,
      syncCart,
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
