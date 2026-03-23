import { useEffect, useState } from "react";

function Counter({ value }) {

  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0); // ✅ reset when value changes

    let start = 0;
    const duration = 500;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);

  }, [value]); // ⭐ IMPORTANT

  return <>{count}</>;
}

export default Counter;