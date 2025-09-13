import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

const useAuth = () => {

    const contextAuthInfo = useContext(AuthContext);

    return contextAuthInfo;
};

export default useAuth;