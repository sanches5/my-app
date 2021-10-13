import { stringify } from "querystring";

export default (url, method, body, params) => {
    const sd = {
        method: method,
        headers: new Headers({ "content-type": "application/json;charset=utf-8" }),
    };

  let setUrl = url;

  if (Object.keys(body).length) {
    sd.body = JSON.stringify(body);
  }
  if (params) {
    setUrl = url + "?" + stringify(params);
  }

  return fetch(setUrl, sd)
    .then((response) => {
      if (response.status === 200) {
        if (method === "DELETE") {
          return response.text().then(function (text) {
            return text;
          });
        }
        return response.json();
      } else {
        throw new Error("Something went wrong on api server!");
      }
    })
    .then((response) => {
      console.debug(response);
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
};
