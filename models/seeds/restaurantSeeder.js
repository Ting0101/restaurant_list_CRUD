// 種子資料產生器
const mongoose = require('mongoose') //載入mongoose
const restaurant = require('../restaurant') //載入model
const restaurantList = require('../../restaurant.json').results //範本資料載入

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
//連線到資料庫
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//連線狀態
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  restaurant.create(restaurantList)
    .then(() => console.log('Seeder done'))
    .catch(error => console.log('error!'))
})