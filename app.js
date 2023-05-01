
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurant_list = require('./restaurant.json')

app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurant_list.results })
})

app.get('/restaurants/:id', (req, res) => {
  // console.log(req.params.id)
  const restaurantOne = restaurant_list.results.find(
    restaurant => restaurant.id.toString() === req.params.id
  )
  res.render('show', { restaurant: restaurantOne })
})

app.get('/search', (req, res) => {
  // console.log('req.query', req.query)
  const keyword = req.query.keyword
  const restaurants = restaurant_list.results.filter(restaurant => {
    return restaurant.category.includes(keyword) || restaurant.name.includes(keyword)
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