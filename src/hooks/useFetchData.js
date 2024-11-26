import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const useFetchData = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/${url}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url]);

  return [data, setData];
};
