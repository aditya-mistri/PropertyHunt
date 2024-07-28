import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://propertyyhuntt.onrender.com",
  withCredentials: true,
});

export default apiRequest;
