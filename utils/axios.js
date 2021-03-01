import axios from "axios";

const axiosInstance = axios.create({
  
  baseURL: 'https://auctionation.herokuapp.com/api',
});

export default axiosInstance;