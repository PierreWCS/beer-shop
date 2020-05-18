import axios from "axios";

const apiUrl = "http://localhost:8000/api/";

export default {
  get(url) {
    return axios({
      method: "get",
      url: apiUrl + url,
    })
      .then((response) => response)
      .catch((error) => error);
  },

  getByUserId(url) {
    return axios({
      method: "get",
      url: apiUrl + url,
    })
      .then((response) => response)
      .catch((error) => error);
  },

  post(url, data) {
    return axios({
      method: "post",
      url: apiUrl + url,
      data: data,
    })
      .then((response) => response)
      .catch((error) => error);
  },

  update(url, token, data) {
    return axios({
      method: "patch",
      url: apiUrl + url,
      data: data,
    })
      .then((response) => response)
      .catch((error) => error);
  },

  delete(url, token, id) {
    return axios({
      method: "delete",
      url: apiUrl + url,
      id: id,
    })
      .then((response) => response)
      .catch((error) => error);
  },
};
