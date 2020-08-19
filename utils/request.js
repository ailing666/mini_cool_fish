const BASE_URL = 'http://localhost:3000'

// 在request.js封装wx.request，对外暴露request方法
function request (options) {
  // 这里一定要需要return，否则new没啥用啊。需要返回一个Promise的对象
  return new Promise((resolve, reject) => {
    // 请求前开启loading
    wx.showLoading({
      title: '加载中...',
      // 请求中，不允许点击
      mask: true
    })

    wx.request({
      url: BASE_URL + options.url,
      method: options.method,
      data: options.data,
      header: options.header,
      success: res => {
        let { status } = res.data
        if (status === 0) {
          //注意这里向外传res.data，而不是res，否则在外边解析需要res.data.message
          resolve(res.data)
        } else {
          reject(res.data)
        }
      },
      complete () {
        // 请求结束后，关闭loading
        wx.hideLoading()
      }
    })
  })
}
export default request
