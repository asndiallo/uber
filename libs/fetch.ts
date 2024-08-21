import { useCallback, useEffect, useState } from "react";

/**
 * Fetch data from an API
 * @param {string} url - The URL to fetch data from
 * @param {RequestInit} options - The options to pass to the fetch function
 * @returns {Promise<any>} The data fetched from the API
 */
export const fetchAPI = async (
  url: string,
  options?: RequestInit,
): Promise<any> => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

/**
 * Fetch data from an API and return the data, loading state, and error
 * @param {string} url - The URL to fetch data from
 * @param {RequestInit} options - The options to pass to the fetch function
 * @returns {Object{data: T | null, loading: boolean, error: string | null, refetch: () => void}} The data fetched from the API, loading state, error, and refetch function
 */
export const useFetch = <T>(url: string, options?: RequestInit): object => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchAPI(url, options);
      setData(result.data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
