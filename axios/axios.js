import axios from 'axios'
import { Indicator,Toast} from "mint-ui";

// The server-side needs a full url to works
if (process.server) {
    axios.defaults.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 8888}`
}
axios.defaults.timeout = 5000 

//拦截器
axios.interceptors.request.use(config=> {
    // 在发送请求之前做些什么
    if(process.client){
        Indicator.open();
    }
    return config;
}, err=> {
    // 对请求错误做些什么
    // console.log(err)
    console.log('请求错误');
    if(process.client){
        Indicator.close();
        Toast({
            message:'加载超时,请稍后再试',
            duration:800
        })
    }
    return Promise.reject(err);
});


axios.interceptors.response.use(response=> {
    // 对响应数据做点什么
    if(process.client){
        Indicator.close();
    }
    return response;
}, err=> {
    // 对响应错误做点什么
    // console.log(err)
    console.log('响应错误')
    if(process.client){
        Indicator.close();
        Toast({
            message:'加载失败,请稍后再试',
            duration:1200
        })
        history.go(-1);
    }else{
        console.log('服务端渲染')
    }
    return Promise.reject(err);
});

export default axios
