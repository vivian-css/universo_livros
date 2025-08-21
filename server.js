const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();

// iniciar banco de dados
const db = new sqlite3.Database('database.db');

db.serialize(() => {
  // Tabela livros
  db.run(`CREATE TABLE IF NOT EXISTS livros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT,
    genero TEXT,
    descricao TEXT,
    preco REAL
  )`);

  // Tabela usuarios
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    cpf TEXT,
    telefone TEXT,
    email TEXT,
    endereco TEXT,
    sexo TEXT,
    senha TEXT
  )`);

  // Tabela pedidos
  db.run(`CREATE TABLE IF NOT EXISTS pedidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    data TEXT,
    itens TEXT,
    total REAL,
    status TEXT
  )`);

  // Inserir livros iniciais
  //db.get("SELECT COUNT(*) AS count FROM livros", (err, row) => {
  //  if (row.count === 0) {
   //   const stmt = db.prepare(`INSERT INTO livros (titulo, genero, descricao, preco) VALUES (?, ?, ?, ?)`);
   //   stmt.run('É Assim que Acaba', 'Romance', 'Romance emocionante de Colleen Hoover.', 49.90);
    //  stmt.run('Café com Deus Pai 2025', 'Autoajuda', 'Devocional diário para transformação espiritual.', 39.90);
   //   stmt.run('O Ladrão de Raios', 'Ficção', 'Mitologia grega misturada ao século XXI.', 69.90);
  //    stmt.run('Bluey: O Amor de Bluey', 'Infantil', 'História divertida e emocionante para crianças.', 29.90);
   //   stmt.finalize();
   //   console.log('Livros iniciais inseridos.');
  //  }
 });


// Configurações do Express
app.use(express.static('html'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======== ROTAS ========

// Página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

// ======== API USUÁRIOS ========

// Cadastro
app.post('/api/cadastro', (req, res) => {
  const { nome, cpf, telefone, email, endereco, sexo, senha } = req.body;
  const sql = `INSERT INTO usuarios (nome, cpf, telefone, email, endereco, sexo, senha)
               VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.run(sql, [nome, cpf, telefone, email, endereco, sexo, senha], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id: this.lastID });
  });
});

// Listar todos usuários (para login)
app.get('/api/usuarios', (req, res) => {
  db.all('SELECT * FROM usuarios', (err, rows) => {
    if(err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;
  const sql = `SELECT * FROM usuarios WHERE email = ? AND senha = ?`;
  db.get(sql, [email, senha], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(401).json({ error: 'Usuário ou senha incorretos' });
    res.json({ success: true, usuario: row });
  });
});

// ======== API LIVROS ========

// Listar livros com filtro e busca
app.get('/api/livros', (req, res) => {
  const { genero, busca } = req.query;
  let sql = 'SELECT * FROM livros WHERE 1=1';
  const params = [];

  if(genero && genero !== 'todos'){
    sql += ' AND genero = ?';
    params.push(genero);
  }
  if(busca && busca.trim() !== ''){
    sql += ' AND titulo LIKE ?';
    params.push(`%${busca}%`);
  }

  db.all(sql, params, (err, rows) => {
    if(err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Buscar livro por ID
app.get('/api/livros/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM livros WHERE id = ?', [id], (err, row) => {
    if(err) return res.status(500).json({ error: err.message });
    if(!row) return res.status(404).json({ error: 'Livro não encontrado' });
    res.json(row);
  });
});

// Adicionar livro
app.post('/api/livros', (req, res) => {
  const { titulo, genero, descricao, preco } = req.body;
  const sql = `INSERT INTO livros (titulo, genero, descricao, preco) VALUES (?, ?, ?, ?)`;
  db.run(sql, [titulo, genero, descricao, preco], function(err){
    if(err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id: this.lastID });
  });
});

// Editar livro
app.put('/api/livros/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, genero, descricao, preco } = req.body;
  if(!titulo || !genero || !descricao || preco == null) 
    return res.status(400).json({ error: 'Dados incompletos' });

  const sql = `UPDATE livros SET titulo=?, genero=?, descricao=?, preco=? WHERE id=?`;
  db.run(sql, [titulo, genero, descricao, preco, id], function(err){
    if(err) return res.status(500).json({ error: err.message });
    if(this.changes === 0) return res.status(404).json({ error: 'Livro não encontrado' });
    res.json({ success: true });
  });
});

// Excluir livro
app.delete('/api/livros/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM livros WHERE id = ?', [id], function(err){
    if(err) return res.status(500).json({ error: err.message });
    if(this.changes === 0) return res.status(404).json({ error: 'Livro não encontrado' });
    res.json({ success: true });
  });
});

// ======== PEDIDOS ========

// Finalizar compra
app.post('/api/finalizar', (req, res) => {
  const { usuarioId, carrinho } = req.body;

  if(!usuarioId || !carrinho || carrinho.length === 0){
    return res.status(400).json({ error: 'Carrinho vazio ou usuário não informado' });
  }

  const ids = carrinho.map(i => i.id);
  const placeholders = ids.map(() => '?').join(',');
  const sql = `SELECT * FROM livros WHERE id IN (${placeholders})`;

  db.all(sql, ids, (err, livros) => {
    if(err) return res.status(500).json({ error: err.message });

    const itensPedido = livros.map(l => {
      const itemCarrinho = carrinho.find(c => c.id === l.id);
      return { id: l.id, titulo: l.titulo, preco: l.preco, quantidade: itemCarrinho.quantidade };
    });

    const total = itensPedido.reduce((acc, i) => acc + i.preco * i.quantidade, 0);
    const data = new Date().toISOString().split('T')[0];
    const status = 'Em andamento';

    db.run(`INSERT INTO pedidos (usuario_id, data, itens, total, status) VALUES (?, ?, ?, ?, ?)`,
      [usuarioId, data, JSON.stringify(itensPedido), total, status],
      function(err){
        if(err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: this.lastID, message: 'Compra finalizada com sucesso!' });
      });
  });
});

// Listar pedidos do usuário
app.get('/api/pedidos/:usuarioId', (req, res) => {
  const { usuarioId } = req.params;
  db.all('SELECT * FROM pedidos WHERE usuario_id=? ORDER BY id DESC', [usuarioId], (err, rows) => {
    if(err) return res.status(500).json({ error: err.message });
    const pedidos = rows.map(r => ({ ...r, itens: JSON.parse(r.itens) }));
    res.json(pedidos);
  });
});

// ======== INICIAR SERVIDOR ========
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));

// Rota temporária apenas para testes! Apaga usuários, pedidos e livros
app.get('/resetar-banco', (req, res) => {
  db.serialize(() => {
    db.run(`DELETE FROM usuarios`);
    db.run(`DELETE FROM pedidos`);
    db.run(`DELETE FROM livros`);
  });
  res.json({ success: true, message: 'Banco resetado. Usuários, pedidos e livros apagados.' });
});
// Rota para verificar conexão com o banco
app.get('/testar-banco', (req, res) => {
  db.get('SELECT 1', (err) => {
    if(err) return res.status(500).json({ error: 'Erro ao conectar com o banco de dados' });
    res.json({ success: true, message: 'Conexão com o banco de dados bem-sucedida!' });
  });
  }); 