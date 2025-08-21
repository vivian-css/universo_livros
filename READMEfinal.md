**CSI606-2025-01 - Trabalho Final -SISTEMAS WEB I**

 *Discente: Vivian Cristina Santana de Souza  19.2.8199*


**Universo dos Livros**

Este projeto consiste no desenvolvimento de um sistema web para vendas de uma livraria fictícia chamada Universo dos Livros. 
O sistema tem como objetivo proporcionar aos usuários uma experiência intuitiva para navegação, busca, visualização e aquisição de livros, com interface moderna, responsiva e organizada.
Entre as principais funcionalidades estão a página principal com menu de navegação, catálogo de livros organizado por genero e opção de busca, área de login e cadastro de usuários, carrinho de compras e fluxo de fechamento de pedidos.


**1. Funcionalidades implementadas**

- Página inicial com destaques para livros e folder que chamasse atenção do usuário e livros promocionais;
- Catálogo de livros com busca e filtros por gêneros literários;  
- Página de detalhes de cada livro contendo livro,capa,genêro,valor e opção de adicionar ao carrinho;
- Área de login e cadastro de usuários; 
- Carrinho de compras com visualização de itens selecionados , opção de limpar livros , remover somente livro desejado e opção de finalizar compra;
- Sobre Nós com Missão, Visão e Valores;
  
**2. Funcionalidades previstas e não implementadas**

Não foram implementadas pagina específica para promoções e dicas de Leitura referente ao escopo inicial do projeto, 
pois o foco foi em desenvolver as funcionalidades principais como catálogo, detalhes dos livros, 
login e cadastro de usuários, carrinho de compras e checkout. As paginas iriam repetir as mesmas funcionalidades 
do catálogo, portanto, não foram implementadas.

**3. Outras funcionalidades implementadas**

Foi implentado uma pagina de CRUD de gerenciamento de livros (gerenciamento.html) que permite realizar 
alteração no banco de dados como  adicionar, editar e remover livros do catálogo.

**4. tecnologias utilizadas**
- Figma: Ferramenta de design para prototipagem e layout.
- HTML5: Estruturação do conteúdo e páginas do site.
- CSS3: Estilização e layout responsivo, utilizando Flexbox e Grid. 
- JavaScript: Interatividade, manipulação do DOM e eventos de usuário.
- sqlite: Banco de dados utilizado para armazenar os livros e usuários.
- script.js: Arquivo JavaScript responsável por toda a lógica de interação do site, incluindo busca, filtros e manipulação do carrinho de compras.
- style.css: Arquivo CSS que define o estilo visual do site, incluindo cores, fontes e layout responsivo.
- server.js: Servidor Node.js simples para simular o backend e servir os arquivos estáticos do projeto.

**5. Principais desafios e dificuldades**

- O principal desafio foi a integração entre as páginas, especialmente manter o carrinho de compras funcional ao navegar entre elas.
- A organização do CSS foi desafiadora, para manter layouts padronizados incluindo cabeçalho e rodapé e menu entre as páginas.
- A estruturação do JavaScript para lidar com eventos de busca, filtros e manipulação foi complexa, exigindo atenção para evitar conflitos e garantir a fluidez da interação do usuário.   
- A implementação do fluxo de checkout e carrinho de compras exigiu atenção aos detalhes, como a contagem dinâmica de itens e a persistência dos dados durante a navegação.
- A criação de um layout padronizado com cabeçalho e rodapé que funcionasse bem em todas as páginas foi um desafio, especialmente para garantir a responsividade e a consistência visual.

**6. Instruções para instalação e execução**
Para instalar e executar o projeto, siga os passos abaixo:  
1. Baixe ou clone o repositório do projeto.
2. Mantenha a seguinte estrutura de pastas:
 /projeto-universo
│
├─ index.html           Página inicial
├─ catalogo.html        Catálogo de livros
├─ detalhes.html        Página de detalhes de cada livro
├─ sobre.html           Sobre o projeto
├─ pedidos.html         Histórico de pedidos
├─ cadastro.html        Página de cadastro de usuários
├─ login.html           Página de login
├─ carrinho.html        Carrinho de compras
├─ gerenciamento.html   Página de gerenciamento de livros (CRUD)
├─ finalizar.html       Página de checkout
|
├─ style.css            Arquivo de estilos principal
├─ script.js            Funções de interação e dinamismo
├─ server.js            Servidor Node.js simulando backend com SQLite
│
└─ img/                 Imagens, favicon e capas de livros

  
3. Abra o terminal e navegue até a pasta do projeto. Faça instalação das dependências necessárias do projeto,
como o SQLite,node.js e npm, caso ainda não tenha instalado.
Escreva o seguinte comando para iniciar o servidor:
node server.js

4. Abra o navegador e acesse `http://localhost:3000` para visualizar a página inicial do projeto.
Para atualizar o catálogo de livros, pode executar o arquivo gerenciamento.html, que permite adicionar, 
editar e remover livros do catálogo sem precisar reiniciar o servidor.

**6. Conclusão**
O projeto Universo dos Livros foi desenvolvido com o objetivo de criar uma experiência de compra online intuit
iva e agradável para os usuários.
Através do uso de tecnologias modernas como HTML, CSS e JavaScript, foi possível criar um sistema funcional que
atende às necessidades básicas de uma livraria online.
A implementação de funcionalidades como catálogo de livros, carrinho de compras e área de login/cadastro proporciona 
uma base sólida para futuras expansões e melhorias.
O projeto pode ser aprimorado com a adição de recursos como recomendações personalizadas, avaliações
de usuários e integração com sistemas de pagamento.
A experiência adquirida no desenvolvimento deste projeto contribuiu significativamente para o aprendizado e compreensão dos conceitos de
desenvolvimento web, além de proporcionar uma visão prática de como criar um sistema completo e funcional.

**7. Referências**
Aulas web do curso de Sistemas Web I, incluindo conceitos de HTML, CSS e JavaScript.
- [Figma](https://www.figma.com/) - Ferramenta de design utilizada para prototipagem.
- [W3Schools](https://www.w3schools.com/) - Referência para HTML, CSS e JavaScript.
- [MDN Web Docs](https://developer.mozilla.org/) - Documentação e guias de desenvolvimento web.
- [Bootstrap](https://getbootstrap.com/) - Framework CSS utilizado para responsividade e design.
- [SQLite](https://www.sqlite.org/index.html) - Banco de dados utilizado para persistência de dados.
- [Node.js](https://nodejs.org/) - Ambiente de execução JavaScript utilizado para o servidor.
