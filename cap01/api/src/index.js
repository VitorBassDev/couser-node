const express = require('express')

const app = express()

// MIDDLEWARE PARA CONVERTAR OS DADOS JSON
app.use(express.json())

  /**
   * UTILIZAÇÃO DO ROUTE PARAMS => 
   - IDENTIFICAÇÃO, EDIÇÃO, DELEÇÃO, BUSCAS EM UM RECURSO
  
  
   * UTILIZAÇÃO DO QUERY PARAMS => 
   - Paginação / Filtro
   

   * UTILIZAÇÃO DO BODY PARAMS => 
   - OBJETOS DE INSERÇÃO E ALTERAÇÃO
     

   * UTILIZAÇÃO DOS MÉTODOS HTTPS
   - GET
   - POST
   - PUT
   - DELETE
   - PATCH
  */

app.get('/courses', (request, response) => {

  /** QUERY PARAMS */
  const query = request.query
  console.log(query)
  return response.json(["Curso 01, Curso 02, Curso 03, Curso 04"])
})

app.post('/courses', (request, response) => {
  
  /** BODY PARAMS */
  const body = request.body
  console.log(body)
  return response.json(["Curso 01, Curso 02, Curso 03, Curso 04"])
})

app.put('/courses/:id', (request, response) => {

  /** ROUTER PARAMS */
  const params = request.params
  console.log(params)
  return response.json(["Curso 01, Curso 02, Curso 03, Curso 04"])
})

app.patch('/courses/:id', (request, response) => {

  /** ROUTER PARAMS */
  const params = request.params
  console.log(params)
  return response.json(["Curso 01, Curso 02, Curso 03, Curso 04"])
})

app.delete('/courses/:id', (request, response) => {
  
  /** ROUTER PARAMS */
  const params = request.params
  console.log(params)
  return response.json(["Curso 01, Curso 02, Curso 03, Curso 04"])
})


app.listen(3333, () => {
  console.log("Server On")
})