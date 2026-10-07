const cpfBusca = document.getElementById("cpfBusca");
const botaoBuscar = document.getElementById("buscar");
const botaoExcluir = document.getElementById("excluir");
const dadosPessoa = document.getElementById("dadosPessoa");
const mensagem = document.getElementById("mensagem");

let idPessoa = null;

botaoBuscar.addEventListener("click", function() {
    const cpf = cpfBusca.value.trim();

    fetch("/pessoas?cpf=" + cpf)
        .then(function(resposta) {
            return resposta.json();
        })
        .then(function(pessoas) {

            if (pessoas.length === 0) {
                dadosPessoa.innerHTML = "";
                mensagem.textContent = "Pessoa não encontrada.";
                idPessoa = null;
                return;
            }

            const pessoa = pessoas[0];

            idPessoa = pessoa.id;

            dadosPessoa.innerHTML = `
                <div class="card">
                    <p><strong>Nome:</strong> ${pessoa.nome} ${pessoa.sobrenome}</p>
                    <p><strong>E-mail:</strong> ${pessoa.email}</p>
                    <p><strong>CPF:</strong> ${pessoa.cpf}</p>
                </div>
            `;

            mensagem.textContent = "Pessoa encontrada.";
        });
});

botaoExcluir.addEventListener("click", function() {

    if (idPessoa === null) {
        mensagem.textContent = "Busque uma pessoa primeiro.";
        return;
    }

    fetch("/pessoas/" + idPessoa, {
        method: "DELETE"
    })
    .then(function(resposta) {
        if (!resposta.ok) {
            throw new Error("Erro ao excluir");
        }

        dadosPessoa.innerHTML = "";
        cpfBusca.value = "";
        idPessoa = null;

        mensagem.textContent = "Pessoa excluída com sucesso!";
    })
    .catch(function() {
        mensagem.textContent = "Erro ao excluir pessoa.";
    });
});