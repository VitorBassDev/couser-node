const express = require('express')
const {v4: uuidv4} = require('uuid')
const app = express()

app.use(express.json())

/** 
 *** RN 01 - Verificar CPF Existente
 */

/** 
 *** REQ 01 - Criar Customer
 * 
 * - CPF (String)
 * - Name (String)
 * - ID (UUID)
 * - Statement []
 */

const customers = []

app.post('/account', (request, response) => {

  const {cpf, name} = request.body
  
  /** 
   * RN 01
   * SOME = Realiza uma busca e retorna VERDADEIRO ou FALSO
   **/

  const customerAlreadyExists = customers.some(customer =>
    customer.cpf === cpf
  )

  if(customerAlreadyExists) {
    return response.status(400).json({error: "CPF já existente"})
  }

  /** 
   * REQ 01
   * PUSH - INSERE DADOS DENTRO DE UM ARRAY  
   **/

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  })
  
  return response.status(201).json({
    Message:{
      Resposta: "Dados enviados",
      cpf
    }
  })
})

app.listen(3333, () => {
  console.log("Server On - API Financeira")
})