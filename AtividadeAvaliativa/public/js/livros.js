document.addEventListener("DOMContentLoaded", function () {
    // Obtém referências para os formulários e elementos da página
    const createForm = document.getElementById("createForm");
    const buscarForm = document.getElementById("buscarForm");
    const editarForm = document.getElementById("editarForm");
    const deletarForm = document.getElementById("deletarForm");
    const mensagemSucesso = document.getElementById("mensagemSucesso");
    const output = document.getElementById("output");
  
    // URL base da API para operações CRUD dos livros
    const apiBase = "http://localhost:3000/livro"; // ajuste se necessário
  
    /**
     * Exibe uma mensagem na tela (sucesso ou erro).
     * @param {string} texto - Texto da mensagem
     * @param {boolean} sucesso - true = mensagem verde, false = vermelha
     */
    function exibirMensagem(texto, sucesso = true) {
      mensagemSucesso.textContent = texto;
      mensagemSucesso.style.color = sucesso ? "green" : "red";
  
      // Limpa a mensagem após 3 segundos
      setTimeout(() => mensagemSucesso.textContent = "", 3000);
    }
  
    /**
     * Mostra o resultado da requisição no elemento output.
     * Exibe um JSON formatado (usado nas operações de cadastro, busca, edição).
     * @param {Object} dado - Objeto JSON para exibir
     */
    function mostrarResultado(dado) {
      output.textContent = JSON.stringify(dado, null, 2);
    }
  
    /**
     * Cadastra um novo livro enviando dados para a API via POST.
     * Captura os valores do formulário createForm.
     * Exibe mensagens de sucesso ou erro.
     */
    async function cadastrarLivro(e) {
      e.preventDefault();
  
      const name = createForm.querySelector('input[name="name"]').value;
      const tipo = createForm.querySelector('input[name="tipo"]').value;
      const ano = parseInt(createForm.querySelector('input[name="ano"]').value);
  
      try {
        const res = await fetch(apiBase, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, tipo, ano })
        });
  
        const data = await res.json();
  
        if (res.ok) {
          exibirMensagem(data.message || "Livro cadastrado com sucesso");
          mostrarResultado(data);
        } else {
          exibirMensagem(data.message || "Erro ao cadastrar livro", false);
        }
      } catch (err) {
        exibirMensagem("Erro de rede: " + err.message, false);
      }
    }
  
    /**
     * Busca um livro pelo ID informado no formulário buscarForm.
     * Faz uma requisição GET para a API e mostra o resultado ou erro.
     */
    async function buscarLivro(e) {
        e.preventDefault();
      
        const id = buscarForm.querySelector('input[name="id"]').value;
      
        try {
          const res = await fetch(`${apiBase}/${id}`);
          const data = await res.json();
      
          if (res.ok) {
            // Monta tabela com um único livro (data)
            let tabela = `<table class="tabela-livros">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Tipo</th>
                  <th>Ano</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${data.id ?? '-'}</td>
                  <td>${data.name}</td>
                  <td>${data.tipo}</td>
                  <td>${data.ano}</td>
                </tr>
              </tbody>
            </table>`;
      
            output.innerHTML = `
              <h3>Livro Encontrado</h3>
              ${tabela}
            `;
          } else {
            exibirMensagem(data.message || "Livro não encontrado", false);
            output.innerHTML = "";
          }
        } catch (err) {
          exibirMensagem("Erro ao buscar livro", false);
          output.innerHTML = "";
        }
      }
      
  
    /**
     * Atualiza os dados de um livro com o ID informado no formulário editarForm.
     * Envia dados via PUT para a API e exibe mensagens de sucesso ou erro.
     */
    async function editarLivro(e) {
      e.preventDefault();
  
      const id = editarForm.querySelector('input[name="id"]').value;
      const name = editarForm.querySelector('input[name="name"]').value;
      const tipo = editarForm.querySelector('input[name="tipo"]').value;
      const ano = parseInt(editarForm.querySelector('input[name="ano"]').value);
  
      try {
        const res = await fetch(`${apiBase}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, tipo, ano })
        });
  
        const data = await res.json();
  
        if (res.ok) {
          exibirMensagem("Livro atualizado com sucesso");
        } else {
          exibirMensagem(data.message || "Erro ao atualizar", false);
        }
      } catch (err) {
        exibirMensagem("Erro ao atualizar livro", false);
      }
    }
  
    /**
     * Deleta um livro pelo ID informado no formulário deletarForm.
     * Envia uma requisição DELETE para a API e exibe mensagens de sucesso ou erro.
     */
    async function deletarLivro(e) {
      e.preventDefault();
  
      const id = deletarForm.querySelector('input[name="id"]').value;
  
      try {
        const res = await fetch(`${apiBase}/${id}`, { method: "DELETE" });
  
        if (res.status === 204) { // sucesso sem conteúdo
          exibirMensagem("Livro deletado com sucesso");
          output.textContent = "";
        } else {
          const data = await res.json();
          exibirMensagem(data.message || "Erro ao deletar", false);
        }
      } catch (err) {
        exibirMensagem("Erro ao deletar livro", false);
      }
    }
  
    /**
     * Lista todos os livros existentes na API.
     * Renderiza uma tabela HTML estilizada com os dados dos livros.
     * Em caso de erro, exibe mensagem apropriada.
     */
    window.listarLivros = async function () {
      try {
        const res = await fetch(apiBase);
        const data = await res.json();
  
        if (!data || data.length === 0) {
          output.innerHTML = "<p>Nenhum livro encontrado.</p>";
          return;
        }
  
        let tabela = `<table class="tabela-livros">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Ano</th>
            </tr>
          </thead>
          <tbody>`;
  
        data.forEach(livro => {
          tabela += `
            <tr>
              <td>${livro.id ?? '-'}</td>
              <td>${livro.name}</td>
              <td>${livro.tipo}</td>
              <td>${livro.ano}</td>
            </tr>`;
        });
  
        tabela += "</tbody></table>";
  
        output.innerHTML = `
          <h3>Lista de Livros</h3>
          ${tabela}
        `;
  
      } catch (err) {
        exibirMensagem("Erro ao listar livros", false);
      }
    };
  
    // Associa os formulários às suas funções de tratamento
    if (createForm) createForm.addEventListener("submit", cadastrarLivro);
    if (buscarForm) buscarForm.addEventListener("submit", buscarLivro);
    if (editarForm) editarForm.addEventListener("submit", editarLivro);
    if (deletarForm) deletarForm.addEventListener("submit", deletarLivro);
  });
  