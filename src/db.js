const mongoose = require('mongoose')

module.exports = async () => {
  // mongoose.Promise = global.Promise
  try {
    const res = await mongoose.connect(process.env.MONGODB_URI)
    console.log('数据看连接成功')
  } catch (err) {
    console.log('数据看连接失败')
    console.log(err)
  }
}
