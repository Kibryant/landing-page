"use client";

import { ResProps } from "@/types/ResProps";
import { useCallback, useEffect, useState } from "react";

interface UseFetchProps<T> {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  bodyContent: T;
}

interface UseFetchReturn<T> {
  data: T | null;
  error?: string;
  isLoading: boolean;
}

enum StatusCode {
  OK = 201,
  ERROR = 400
}

const useFetch = <T>({ url, method, bodyContent }: UseFetchProps<T>): UseFetchReturn<T> => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const handleFetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const req = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          bodyContent
        })
      });

      const res: ResProps<T> = await req.json();

      if (res.status !== StatusCode.OK) {
        setError(res.message);
        setIsLoading(false);
        return;
      }

      if (typeof res.data !== "undefined") {
        setData(res.data);
      }

      setError("");
      setIsLoading(false);
      return;
    } catch (error) {
      setError(`FATAL ERRO: ${error}`);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return { data, error, isLoading };
};

export { useFetch };
