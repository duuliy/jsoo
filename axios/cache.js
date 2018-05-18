// node.js lru-cache
import LRU from 'lru-cache'

const lruCache = LRU({
    // 缓存队列长度
    max: 2000,
    // 缓存有效期
    maxAge: 60000
})

export const cache = {
    get: function (key) {
        let result = lruCache.get(key)

        if (result) {
            return JSON.parse(result);
        }

        return null
    },
    set: function (key, value) {
        if (value) {
            lruCache.set(key, JSON.stringify(value))
            return true
        }

        return false
    }
}

// export const get = async (url) => {
//     let data = cache.get(url);
//     if (data) {
//       return JSON.parse(data);
//     }
//     const res = await axios.get(url);
//     data = res.data;
//     cache.set(url, JSON.stringify(data));
//     return data;
//   };