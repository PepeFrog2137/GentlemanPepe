// hooks/usePriceData.ts
import { useEffect, useState } from "react";

interface PriceData {
  SOL: any;
}

const usePriceData = () => {
  const [data, setData] = useState<PriceData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://price.jup.ag/v6/price?ids=SOL`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        setError("huj");
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Optionally add cleanup logic if needed
    };
  }, []);

  return { data, error };
};

export default usePriceData;
