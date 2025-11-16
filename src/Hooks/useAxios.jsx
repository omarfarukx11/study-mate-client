import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://study-mate-server-tau.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
