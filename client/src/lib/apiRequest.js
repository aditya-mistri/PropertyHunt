import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://propertyyhuntt.onrender.com/api",
  withCredentials: true,
});

export default apiRequest;
