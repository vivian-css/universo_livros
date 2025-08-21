// usuário logado


let usuarioLogado = JSON.parse(localStorage.getItem('usuario')) || null;

// login
async function login(email, senha) {
  try {
    const res = await fetch('/api/usuarios');
    const usuarios = await res.json();
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    if (usuario) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
      usuarioLogado = usuario;
      alert('Login realizado com sucesso!');
      window.location.href = 'index.html';
      return true;
    } else {
      alert('Email ou senha incorretos!');
      return false;
    }
  } catch (err) {
    console.error(err);
    alert('Erro ao tentar logar');
    return false;
  }
}

// Função de logout
function logout() {
  localStorage.removeItem('usuario');
  usuarioLogado = null;
  window.location.reload();
}

// Atualizar menu (login/logout)
function atualizarMenu() {
  const menu = document.querySelector('.menu');
  if (!menu) return;

  if (usuarioLogado) {
    const liLogin = menu.querySelector('li a[href="login.html"]');
    const liCadastro = menu.querySelector('li a[href="cadastro.html"]');

    if (liLogin) liLogin.textContent = 'Logout';
    if (liLogin) liLogin.onclick = e => { e.preventDefault(); logout(); };

    if (liCadastro) liCadastro.style.display = 'none';
  }
}

atualizarMenu();


let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];


function adicionarAoCarrinho(livro) {
  const index = carrinho.findIndex(i => i.id === livro.id);
  if (index >= 0) {
    carrinho[index].quantidade += 1;
  } else {
    carrinho.push({ ...livro, quantidade: 1 });
  }
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  atualizarCarrinhoUI();
}



function removerDoCarrinho(id) {
  carrinho = carrinho.filter(i => i.id !== id);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  atualizarCarrinhoUI();
}


function limparCarrinho() {
  carrinho = [];
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  atualizarCarrinhoUI();
}


function atualizarCarrinhoUI() {
  const cartCount = document.getElementById('cartCount');
  if (cartCount) cartCount.textContent = carrinho.reduce((acc, i) => acc + i.quantidade, 0);
}


atualizarCarrinhoUI();

// finalizar compra
async function finalizarCompra() {
  if (!usuarioLogado) {
    alert('Você precisa estar logado para finalizar a compra.');
    window.location.href = 'login.html';
    return;
  }

  if (carrinho.length === 0) {
    alert('Carrinho vazio!');
    window.location.href = 'carrinho.html';
    return;
  }

  const pedidoEnvio = carrinho.map(i => ({ id: i.id, quantidade: i.quantidade }));
  try {
    const res = await fetch('/api/finalizar', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ usuarioId: usuarioLogado.id, carrinho: pedidoEnvio })
    });
    const data = await res.json();
    if (data.success) {
      alert(data.message);
      limparCarrinho();
      window.location.href = 'pedidos.html';
    }
  } catch (err) {
    console.error(err);
    alert('Erro ao finalizar compra');
  }
}

// listar pedidos do usuário
async function carregarPedidos() {
  if (!usuarioLogado) {
    alert('Você precisa estar logado para ver seus pedidos.');
    window.location.href = 'login.html';
    return;
  }

  const tbody = document.querySelector('#pedidosTable tbody');
  if (!tbody) return;

  try {
    const res = await fetch(`/api/pedidos/${usuarioLogado.id}`);
    const pedidos = await res.json();
    tbody.innerHTML = '';
    pedidos.forEach(p => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>#${p.id}</td>
        <td>${p.data}</td>
        <td>${p.itens.map(i => `${i.titulo} (${i.quantidade})`).join(', ')}</td>
        <td>R$ ${p.total.toFixed(2)}</td>
        <td>${p.status}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error(err);
  }
}

// =================== EXPORTS GLOBAIS ===================
window.adicionarAoCarrinho = adicionarAoCarrinho;
window.removerDoCarrinho = removerDoCarrinho;
window.limparCarrinho = limparCarrinho;
window.finalizarCompra = finalizarCompra;
window.login = login;
window.carregarPedidos = carregarPedidos;
      (err) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json({ success: true, message: 'Compra finalizada com sucesso!' });
      }
// =================== SERVIDOR ===================
const express = require('express');   