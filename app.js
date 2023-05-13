
const express = require('express')
const mongoose = require('mongoose') //載入mongoose
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

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
})


app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList.results })
})

app.get('/restaurants/:id', (req, res) => {
  // console.log(req.params.id)
  const restaurant = restaurantList.results.find(
    restaurant => restaurant.id.toString() === req.params.id
  )
  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  // console.log('req.query', req.query)
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurants => {
    return restaurants.category.includes(keyword) || restaurants.name.includes(keyword)
  })
  res.render('index', { restaurant: restaurants })
})


// 告訴express將樣板引擎交給express-handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))


app.listen(port, () => {
  console.log(`running`)
})