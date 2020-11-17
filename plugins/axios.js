//  import Cookie from 'js-cookie'

import { Message, MessageBox } from 'element-ui'

export default function(app) {
  const axios = app.$axios
  // 基本配置
  axios.defaults.timeout = 10000
  axios.defaults.headers.post['Content-Type'] = 'application/json'
  axios.defaults.headers.patch['Content-Type'] = 'application/json'
  axios.defaults.headers.put['Content-Type'] = 'application/json'
  axios.defaults.headers.delete['Content-Type'] = 'application/json'

  // 请求回调
  axios.onRequest((config) => {
    /*const token = Cookie.get('token')
    config.headers.Authorization = `Bearer ${token}`*/
  })

  // 返回回调
  axios.onResponse((res) => {
    console.log(res)
    /*if (res.headers.refreshtoken) {
      Cookie.set('token', res.headers.refreshtoken)
    }*/
    res.data.$res = res
    var r = res.data
    if (r.code === 0) {
      if (res.config.disableMsg !== true) {
        if (r.msg && r.msg !== '') {
          Message({
            message: r.msg,
            type: 'success',
            duration: 5 * 1000
          })
        }
      }
    } else {
      if (res.config.disableMsg !== true) {
        Message({
          message: r.msg,
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(new Error(r.msg))
    }
    return res.data
  })

  // 错误回调
  axios.onError((error) => {

    switch (error.response.status) {
      case 401:
        location.href = '/login'
        break
    }
  })
}
