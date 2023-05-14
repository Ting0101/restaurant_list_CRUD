
const express = require('express')
const mongoose = require('mongoose') //載入mongoose
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurant = require('./models/restaurant')
const bodyParser = require('body-parser') //載入body-parser
// const restaurantList = require('./restaurant.json')

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

// 告訴express將樣板引擎交給express-handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
//規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))


//瀏覽全部餐廳
app.get('/', (req, res) => {
  restaurant.find()
    .lean()
    .then(restaurantData => res.render('index', { restaurantData }))
    .catch(error => console.log('瀏覽error!'))
})

//新增一家餐廳-開啟new頁面輸入表單資料
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})
//用來接住表單資料的路由
app.post('/restaurants', (req, res) => {
  console.log('req.body', req.body)
  restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log('新增error!'))
})

//瀏覽一家餐廳資訊
app.get(`/restaurants/:id`, (req, res) => {
  const id = req.params.id
  restaurant.findById(id)
    .lean()
    .then(restaurantData => (res.render('show', { restaurantData })))
    .catch(error => console.log('餐廳資訊error!'))
})

//修改餐廳資訊
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  restaurant.findById(id)
    .lean()
    .then(restaurantData => (res.render('edit', { restaurantData })))
    .catch(error => console.log('edit error!'))
})
//修改的資料更新資料庫
app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log('edit error!'))
})




app.get('/search', (req, res) => {
  // console.log('req.query', req.query)
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurants => {
    return restaurants.category.includes(keyword) || restaurants.name.includes(keyword)
  })
  res.render('index', { restaurant: restaurants })
})




app.listen(port, () => {
  console.log(`running`)
})