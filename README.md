# Sistema de Tickets

## Primeiros passos

```bash
npm i
git https://github.com/andrelinos/desafio-tickets.git

cd desafio-tickets

npm i

npx prisma migrate dev

npm run prisma:seed

npm run dev

```

## Usando a aplicação

- Após instalar as dependências e executar a aplicação, acesse o link: <http://localhost:3000>
- Informe um nome qualquer para entrar
- Terá acesso a página principal, onde poderá filtrar por status, editar clicando no Título do Ticket
- Poderá alterar o status por clicar no mesmo e confirmar na tela de confirmação (precisa ser melhorada 😊)
- Poderá também apagar um ticket ao clicar no botão com o simbolo de uma lixeira ao lado direto da linha
- Poderá adicionar novos tickets
- Nas propriedades do Ticket, poderá também inserir novos comentários
