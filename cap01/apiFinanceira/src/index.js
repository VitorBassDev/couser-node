const { request } = require('express')
const express = require('express')
const {v4: uuidv4} = require('uuid')
const app = express()

app.use(express.json())

/** 
 *** REQ 01 - Criar uma conta de Customer
 *** REQ 02 - Buscar o extrato da conte de um Customer
 *** REQ 03 - Depositar na conta de um Customer
 *** REQ 04 - Buscar o extrato da conte de um Customer Por Data
 * 
 * - CPF (String)
 * - Name (String)
 * - ID (UUID)
 * - Statement []
 *  nnnnnnnnn
 *** RN 01 - Verificar CPF existente
 *** RN 02 - Verificar CPF existente para buscar extrato bancário
 */

const customers = []

// MIDDLWARE 
function verifyIfExistsAccountCPF (request, response, next) {
  
  /**
  * MEDDLEWARE
  * FIND = Busca e retorna o valor do Objeto
  * HEADERS PARAM - CPF
  * RN 01 - Validar CPF existente
  **/ 

  const {cpf} = request.headers

  const customer = customers.find((customer) => customer.cpf === cpf)
 
  if(!customer) {
    return response.status(400).json({error: "Usuário não Encontrado"})  
  }

  request.customer = customer

  return next()
  
}

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

app.get('/statement', verifyIfExistsAccountCPF, (request, response) =>{

  /** 
  * REQ 02 - Buscar Extrato Bancario de um Cliente Existente
  */

  const {customer} = request
  
  return response.json(customer.statement)

})

app.post('/deposit', verifyIfExistsAccountCPF, (request, response) =>{

  /** 
  * REQ 03 - Depositar na conta de um Custome
  */

  const {description, amount} = request.body

  // MEDDLEWARE - VERIFICA SE A CONTA É VÁLIDA E RECUPERA AS INFORMAÇÕES DA CONTA
  const {customer} = request

  // INSERE A INFORMAÇÃO DO DEPÓSITO DENTRO DO STATEMENT
  // PUSH - INSERE  OS DADOS DENTRO DO ARRAY
  const statementOperation = {
    description,
    amount,
    created_date: new Date(),
    type: "credit"
  }
  
  // 
  customer.statement.push(statementOperation)

  return response.status(201).json({message: "Depósito efetuado"})

})

app.post('/withdraw', verifyIfExistsAccountCPF, (request, response) =>{

  const {amount} = request.body
  const {customer} = request

  const balance = getBalance(customer.statement)

  if(balance < amount) {
    return response.status(400).json({error: "Saldo Insuficiente"})
  }

  // INSERE A INFORMAÇÃO DO DEPÓSITO DENTRO DO STATEMENT
  // PUSH - INSERE  OS DADOS DENTRO DO ARRAY
  const statementOperation = {
    amount,
    created_date: new Date(),
    type: "debit"
  }
  
  // 
  customer.statement.push(statementOperation)

  return response.status(201).json({message: "Saque efetuado"})

})

app.get("/statement/date", verifyIfExistsAccountCPF, (request, response) =>{

  /** 
  * REQ 05 - Buscar Extrato Bancario de um Cliente Existente
  */

  const {customer} = request
  const {date} = request.query
  
  // CONVERSÃO DE DATA
  const dateFormat = new Date(date + " 00:00")

  // FILTER = FILTRAGEM POR PARAMETRO E CONVERTER PARA O FORMATO 00/00/0000
  const statement = customer.statement.filter(
    (statement) =>
      statement.created_at.toDateString() === 
      new Date(dateFormat).toDateString()
    )

  return response.json(statement)

})

app.put("/account", verifyIfExistsAccountCPF, (request, response) =>{

  /** 
  - Ser possível atualizar os dados da conta do cliente. (REQ 06)
  */

  const {name} = request.body
  const {customer} = request

  customer.name = name;

  return response.status(201).send()
})

app.get("/account", verifyIfExistsAccountCPF, (request, response) => {
  
  /**
  - Ser possível obter dados da conta do cliente. (REQ 07)
   */

  const {customer} = request
  return response.json(customer)

})

app.delete("/account", verifyIfExistsAccountCPF, (request, response) =>{
  
  /**
   - Ser possível deletar uma conta.(REQ 08)
   */
  
   const {customer} = request

   // SPLICE = ESPERA UM ARRAY E REMOVE UMA POSSIÇÃO
   customers.splice(customer, 1)

   return response.status(200).json(customers)

})

app.get("/balance", verifyIfExistsAccountCPF, (request, response) =>{
  
  /**
   - ser possível retornar o balanço da conta de um cliente. (REQ 09)
   */
  
  const {customer} = request

  const balance = getBalance(customer.statement)

  return response.json(balance)
})

app.listen(3333, () => {
  console.log("Server On - API Financeira")
}) 