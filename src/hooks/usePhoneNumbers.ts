import { useEffect, useState } from "react";
import { getPhoneNumbers } from "@/api/api";
import type { PhoneNumber } from "@/types/types";

const usePhoneNumbers = () => {
  const [data, setData] = useState<PhoneNumber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const result = await getPhoneNumbers();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        console.error("Failed to load phone numbers", err);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  return { data, isLoading, error, isError: !!error };
};

export { usePhoneNumbers };
