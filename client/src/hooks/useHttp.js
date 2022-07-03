import axios from "axios";
import { useCallback, useState } from "react";

const useHttp = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const sendRequest = useCallback(async (requestConfig, applyDataFunc) => {
    setIsFetching(true);
    setError(null);
    const data = JSON.stringify(requestConfig.data);

    axios({
      method: requestConfig.method ? requestConfig.method : "get",
      url: requestConfig.url,
      headers: { "Content-Type": "application/json" },
      data: data,
    })
      .then((res) => {
        const { data } = res;
        applyDataFunc(data);
      })
      .catch((error) => {
        setError(error.message || "Something went wrong!");
      });

    setIsFetching(false);
  }, []);
  return { isFetching, error, sendRequest };
};
export default useHttp;
