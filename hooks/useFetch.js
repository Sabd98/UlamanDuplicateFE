import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export function useFetch(apiUrl) {
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      // Add this to verify the full URL
      const response = await axios.get(apiUrl);
      setFetchedData(response.data);
    } catch (err) {
      setError("Failed to load data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

//   if (!apiUrl) return <div>Loading...</div>;

  useEffect(() => {
    fetchData();
  }, []);

  return { fetchedData, loading, error, fetchData };
}
