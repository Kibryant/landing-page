"use client";

import { useCallback, useEffect, useReducer } from "react";

interface StateProps<T> {
  data?: T;
  error?: string;
  isLoading: boolean | null;
}

type ActionProps<T> = { type: "isLoading" } | { type: "error"; error: string } | { type: "fetched"; payload: T };

function useFetch<T = unknown>(url: string) {
  const initialState: StateProps<T> = {
    error: undefined,
    data: undefined,
    isLoading: null
  };

  const reducer = (state: StateProps<T>, action: ActionProps<T>) => {
    switch (action.type) {
      case "isLoading":
        return { ...initialState, isLoading: true };
      case "fetched":
        return { ...initialState, isLoading: false, data: action.payload };
      case "error":
        return { ...initialState, isLoading: false, error: action.error };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleFetch = useCallback(async () => {
    dispatch({ type: "isLoading" });

    try {
      const req = await fetch(url);
      console.log(req);
      const res = await req.json();
      console.log(res);

      dispatch({ type: "fetched", payload: res });
    } catch (error) {
      dispatch({ type: "error", error: `Error: ${error}` });
    }
  }, [url]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return {
    data: state.data,
    error: state.error,
    isLoading: state.isLoading
  };
}

export { useFetch };
