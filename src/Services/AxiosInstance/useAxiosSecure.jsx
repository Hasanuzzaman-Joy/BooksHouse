import axios from "axios";
import useAuth from '../../Hooks/useAuth'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5173'
})

const useAxiosSecure = () => {

    const { user } = useAuth();

    axios.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user?.accessToken}`
        return config;
    }
    )

    axios.interceptors.response.use(
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