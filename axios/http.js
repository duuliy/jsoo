/**
 * Created by Administrator on 2018/3/27/027.
 */
import axios from 'axios'
import Promise from 'promise-polyfill'
import qs from 'qs'
import { getLgToken } from '~/util/auth'

//测试环境，服务器环境，线上环境
let baseUrl = '地址';
// let baseUrl="";
// if (process.server) {
//     baseURL = `http://${process.env.HOST || 'ip'}:${process.env.PORT || 8887}`
// }
// if (!window.Promise) {
//     window.Promise = Promise;
// }

let token = '';
// let token = 'eyJ1aWQiOjMzNjkyfQ==.LHs1ggJVnKw1qEW8ta8jvQYyyTXpDEvsJFj4z9nD6h6WKcThhDFpxOrwPiaaymfEm39NKhvezYG0Cau4JIn+oA==';
export function fetch(type,url, params) {
    if( type == 'post' ) {
        return new Promise((resolve,reject) => {
            axios.post(url,  qs.stringify(params), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                    'token':token
                    // 'App-Token': token
                },
                // withCredentials: true
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error)
                })
        });
    }else if ( type =='get' ) {
        return new Promise((resolve,reject) => {
            axios.get(url, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                    'token':token
                    // 'App-Token': token
                },
                // withCredentials: true
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error)
                })
        });
    }else if ( type =='delete' ) {
        return new Promise((resolve,reject) => {
            axios.delete(url,  qs.stringify(params), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                    'token':token
                    // 'App-Token': token
                },
                // withCredentials: true
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error)
                })
        });
    }else if ( type =='patch' ) {
        return new Promise((resolve,reject) => {
            axios.patch(url,  qs.stringify(params), {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'token':token
                    // 'App-Token': token
                },
                // withCredentials: true
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error)
                })
        });
    }else if ( type =='put' ) {
        return new Promise((resolve,reject) => {
            axios.put(url,  qs.stringify(params), {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'token':token
                    // 'App-Token': token
                },
                // withCredentials: true
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error)
                })
        });
    }
}

export default {
    getData: function(type,url,data) {
        let newtoken = getLgToken();
        if( newtoken ) {
            token = newtoken
        }
        return fetch(type, baseUrl+url, data)
    }
}
