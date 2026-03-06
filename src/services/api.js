//connecting frontend with backend
import axios from 'axios';

const api=axios.create({
    baseURL:'http://127.0.0.1:5000/api',
    headers:{
        'Content-Type':'application/json'
    }
});
//checks if there's a token in localStorage and if there is, it automatically attaches it to the request header
api.interceptors.request.use(config=>{
    const token=localStorage.getItem('accessToken');
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
})

export default api;