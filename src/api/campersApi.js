import axios from "axios";
import QueryString from "qs";

export const api = axios.create({
  baseURL: " https://66b1f8e71ca8ad33d4f5f63e.mockapi.io",
  paramsSerializer: (params) =>
    QueryString.stringify(params, { arrayFormat: "repeat" }),
});
