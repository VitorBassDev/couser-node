## 1. API Financeira*
  
  * Excuta o Servidor na porta `3333`.
  * Utilização dos `*HTTPS VERBS*`
  * Utilização do Middlware de conversão de recebimento de dados para JSON


## 2. Bibliotecas
  [x] Express
  [x] Nodemon
  [x] UUid

## 3. Requisitos e Regras de Negócio

### Requisitos
  - [x] Ser possível criar uma conta. (REQ 01)
  - Ser possível buscar o extrato bancário de um cliente.
  - Ser possível realizar um depósito.
  - Ser possível realizar um saque.
  - Ser possível buscar o extrato bancário de um cliente por data.
  - Ser possível atualizar os dados da conta do cliente. (REQ 06)
  - Ser possível obter dados da conta do cliente. (REQ 07)
  - Ser possível deletar uma conta.(REQ 08)
  - ser possível retornar o balanço da conta de um cliente. (REQ 09)

---

### Regras de Negócio
  - [x] Não deve ser possível cadastrar uma conta com CPF já existente. (RN 01)
  - Não deve ser possível buscar extrato em uma conta não existente.
  - Não deve ser possível realizar depósito em uma conta não existente.
    - Não deve ser possível realizar saque em uma conta não existente.
  - Não deve ser possível excluir uma conta não existente.
  - Não deve ser possível realizar saque quando o saldo for insuficiente.