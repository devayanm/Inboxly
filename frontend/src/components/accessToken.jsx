import axios from "axios";
import { configs } from "eslint-plugin-react-refresh";

const AccessToken=axios.create({
    baseURL: "/api",
})

//Add token automatically to all request
AccessToken.interceptors.request.use((config)=>{
    const token=localStorage.getItem("accessToken");
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
// console.log(config);
    return config;
})

export default AccessToken;