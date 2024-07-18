# Documentação do Projeto de Chat ao Vivo usando WebSocket

## Introdução
Este projeto implementa um chat ao vivo utilizando WebSockets. A aplicação é composta por um servidor Node.js com Express e Socket.IO para comunicação em tempo real, e uma interface front-end simples em HTML, CSS e JavaScript.
    - WebSocket é um protocolo de comunicação que permite a troca de dados em tempo real entre o cliente (como um navegador web) e o servidor. Diferente do protocolo HTTP, onde as comunicações são iniciadas pelo cliente, o WebSocket permite uma comunicação bidirecional persistente. Isso significa que, uma vez estabelecida a conexão, tanto o cliente quanto o servidor podem enviar dados a qualquer momento sem a necessidade de reestabelecer a conexão. Essa característica torna o WebSocket ideal para aplicações que requerem atualização constante e em tempo real, como chat ao vivo, jogos online, e sistemas de trading.


## Estrutura do Projeto
```
chat-live/
├── index.js
├── view/
│   ├── index.html
│   ├── main.css
│   └── main.js
├── package.json
└── package-lock.json
```

## index.js
O `index.js` é responsável por configurar o servidor Express, inicializar o Socket.IO e gerenciar a lógica do chat em tempo real.

### Dependências
As dependências principais são:
- `express` para criar o servidor HTTP.
- `http` para permitir a comunicação HTTP.
- `path` para manipular caminhos de arquivos e diretórios.
- `socket.io` para implementar WebSockets.

### Configuração do Servidor
- Cria uma instância do Express.
- Cria um servidor HTTP utilizando o módulo `http` e o Express.
- Inicializa o Socket.IO com o servidor HTTP.

### Variáveis de Ambiente
- `APP_PORT`: Porta na qual o servidor irá rodar. Padrão: 8080.
- `APP_URL`: URL do servidor.

### Rotas
- Rota raiz (`/`): Serve o arquivo `index.html` localizado na pasta `view`.

### Inicialização do Servidor
- O servidor é configurado para escutar na porta especificada e exibe uma mensagem de confirmação no console.

### Lógica do Socket.IO
- Evento `connection`: Dispara quando um cliente se conecta.
- Evento `join`: Verifica se o nome do usuário já está em uso.
- Evento `logged`: Adiciona o usuário à lista de usuários conectados.
- Evento `send-message`: Envia a mensagem para todos os clientes conectados.
- Evento `disconnect`: Remove o usuário das listas de usuários conectados ao se desconectar.

## Front-End

### index.html
Estrutura básica da interface do usuário, contendo:
- Área de entrada para o nome do usuário.
- Área principal do chat para exibição das mensagens.
- Área para enviar novas mensagens.
- Inclusão de arquivos CSS e JavaScript necessários.

### main.css
Arquivo de estilos CSS para definir a aparência da interface do usuário.

### main.js
Script JavaScript que gerencia a lógica do cliente, incluindo:
- Conexão com o servidor Socket.IO.
- Eventos para envio e recebimento de mensagens.
- Atualização dinâmica da interface do usuário.

### Funcionalidades Principais
- **Entrar no Chat**: O usuário insere um nome e se junta ao chat.
- **Enviar Mensagens**: O usuário envia mensagens que são exibidas em tempo real para todos os participantes do chat.
- **Receber Mensagens**: O cliente escuta novas mensagens do servidor e as exibe na interface.

### Eventos JavaScript
- `click` no botão de entrar (`btn-join`) ou `keydown` no input (`input-join`): Inicia o processo de junção ao chat.
- `click` no botão de enviar (`btn-send`): Envia a mensagem digitada.
- `keydown` no textarea (`textarea`): Envia a mensagem ao pressionar Enter.

## Conclusão
Este projeto demonstra como implementar um chat ao vivo utilizando WebSockets com Node.js, Express e Socket.IO.