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

/** 
 *** RN 02 - Validar Conta para buscar extrato bancário
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
''
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


app.get('/statement', (request, response) =>{

  /** 
   * REQ 02 - Buscar Extrato Bancario de um Cliente Existente
   * FIND = Busca e retorna o valor do Objeto
   * HEADERS PARAM - CPF
   **/ 

 const {cpf} = request.headers

 const customer = customers.find((customer) => customer.cpf === cpf)

  /**
    * RN 01 - Validar CPF existente
    **/

  if(!customer) {
    return response.status(400).json({error: "Usuário não Encontrado"})  
  }

  return response.json(customer.statement)

})

app.listen(3333, () => {
  console.log("Server On - API Financeira")
})