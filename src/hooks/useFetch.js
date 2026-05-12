import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

/**
 * Tiny data-fetching hook around `fetchDataFromApi`.
 *
 * @param {string} url - REST endpoint relative to the API base.
 * @returns {{ data: any, loading: boolean, error: string | null }}
 */
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setData(null);
    setError(null);

    fetchDataFromApi(url)
      .then((res) => {
        if (cancelled) return;
        setLoading(false);
        setData(res);
      })
      .catch(() => {
        if (cancelled) return;
        setLoading(false);
        setError("Something went wrong");
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
