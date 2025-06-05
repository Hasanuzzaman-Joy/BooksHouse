import axios from "axios";
import useAuth from '../../Hooks/useAuth'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL
})

const useAxiosSecure = () => {

    const { user } = useAuth();

    axiosInstance.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user?.accessToken}`
        return config;
    }
    )

    axiosInstance.interceptors.response.use(
        (res => {
            return res.data
        }),
        (error => {
            return Promise.reject(error);
        })
    )

    return axiosInstance;
}

export default useAxiosSecure;