const express = require('express')
const app = express()
const moment = require('moment')
const port = 3000

// prevent favicon request
const icon = '<link rel="icon" href="data:,"></link>'

// time 
function timestamps(time) {
  return moment().format('YYYY-MM-DD HH:mm:ss')
}

app.use((req, res, next) => {
  // startTime
  const startTime = Date.now()
  // request method 
  const method = req.method
  // request url
  const url = req.originalUrl
  // sever log 
  console.log(timestamps(startTime), '|', method, 'from ', url,)

  res.on('finish', () => {
    const endTime = Date.now()
    const duration = endTime - startTime
    console.log(timestamps(endTime), '|', method, 'from ', url, '|', 'total time: ', duration, 'ms')
  })
  // call the next middleware
  next()
})

app.get('/', (req, res) => {
  res.send(icon + '列出全部 Todo')
})

app.get('/new', (req, res) => {
  res.send(icon + '新增 Todo 頁面')
})

app.get('/:id', (req, res) => {
  res.send(icon + '顯示一筆 Todo')
})

app.post('/', (req, res) => {
  res.send(icon + '新增一筆  Todo')
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
