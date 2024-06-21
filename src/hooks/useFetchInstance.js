import { useState } from "react";
import axios from "axios";

export const useFetchIstance = () => {
  const [reponse, setResponse] = useState({
    data: null,
    error: null,
    pending: false,
  });

  const ApiCall = (url, method = "GET", body = null) => {
    setResponse({ data: null, error: null, pending: true });
    try {
      if (method.toUpperCase() === "GET") {
        fetch(url)
          .then((res) => res.json())
          .then((data) =>
            setResponse({ data: data, error: null, pending: false })
          );
      }
      if (method.toUpperCase() === "POST") {
        axios({
          method: "post",
          url: url,
          headers: {},
          data: body,
        })
          .then(function (response) {
            setResponse({ data: response, error: null, pending: false });
          })
          .catch(function (error) {
            console.log(error.response.status);
            console.log(error.response.data.error);
            setResponse({ data: null, error: error, pending: false });
          });
      }
    } catch (err) {
      setResponse({ data: null, error: err, pending: false });
    }
  };

  return { ...reponse, ApiCall };
};
