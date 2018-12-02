const express = require('express')
const fs = require('fs')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/add', (req, res, next) => {
  let wordInfo = req.body

  new Promise((resolve, reject) => {
    fs.readFile('./storage/words.json', {encoding: 'utf-8'}, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  }).then(data => {
    if (!data) {
      data = "{}"
    }
    data = JSON.parse(data)
    if (!data[wordInfo.word]) {
      data[wordInfo.word] = [wordInfo['part-of-speech'], wordInfo.paraphrase]
      fs.writeFile('./storage/words.json', JSON.stringify(data), (err) => {
        if (err) {
          console.log(err)
          res.send({status: 0, msg: err})
        } else {
          res.send({status: 1})
        }
      })
    } else {
      res.send({status: 1})
    }
  }).catch(reason => {
    console.log(reason)
    res.send({status: 0, msg: reason})
  })
})

app.post('/search', (req, res, next) => {
  let word = req.body.word

  new Promise((resolve, reject) => {
    fs.readFile('./storage/words.json', {encoding: 'utf-8'}, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  }).then(data => {
    if (!data) {
      data = "{}"
    }
    data = JSON.parse(data)
    if (data[word]) {
      res.send({
        status: 1,
        wordInfo: {
          word: word,
          paraphrase: data[word]
        }
      })
    } else {
      res.send({
        status: 1,
        wordInfo: null
      })
    }
  }).catch(reason => {
    console.log(reason)
    res.send({status: 0, msg: reason})
  })
})

app.post('/getOne', (req, res, next) => {
  
  res.send('...')
})

app.listen('8888', () => {
  console.log('start')
})
