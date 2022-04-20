import axios from "axios";

const baseURL = process.env.REACT_APP_URL_API;
axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

const responseBody = (response) => response.data;

axios.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    const userInfo = decodeToken(token);
    if (userInfo) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const { status } = await error?.response;
    switch (status) {
      case 401:
        break;
      case 403:
        break;
      default:
        break;
    }
    return Promise.reject(error?.response);
  },
);

const requests = {
  get: (url, params) => axios.get(url, { params }).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  patch: (url, body) => axios.patch(url, body).then(responseBody),
  delete: (url) => axios.delete(url).then(responseBody),
  postForm: (url, data) =>
    axios
      .post(url, data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody),
  putForm: (url, data) =>
    axios
      .put(url, data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody),
  createFormData,
};

function createFormData(item) {
  let formData = new FormData();
  for (const key in item) {
    formData.append(key, item[key]);
  }
  return formData;
}

export default requests;