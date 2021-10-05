const express = require('express')

const app = express()

app.get('/', (request, response) => {
  return response.json({
    message: "Sobre o NodeJS"
  })
})

app.listen(3333, () => {
  console.log("Server On")
})