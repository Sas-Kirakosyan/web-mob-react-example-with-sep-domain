import { useEffect, useRef } from "react";

// Custom hook that returns a ref
export function useCustomHook() {
  const ref = useRef<any>(null);

  useEffect(() => {
    // Do something with the ref, e.g., add event listeners
    const handleClick = () => {
      console.log("Clicked!");
    };

    ref.current.addEventListener("click", handleClick);

    return () => {
      // Clean up the event listener
      ref.current.removeEventListener("click", handleClick);
    };
  }, [ref]); // Include ref in the dependency array

  return ref;
}
