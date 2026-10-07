const botaoBuscar = document.getElementById("buscar");
const cpfBusca = document.getElementById("cpfBusca");
const formAtualizar = document.getElementById("formAtualizar");
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
                mensagem.textContent = "Pessoa não encontrada.";
                idPessoa = null;
                return;
            }

            const pessoa = pessoas[0];

            idPessoa = pessoa.id;

            document.getElementById("nome").value = pessoa.nome;
            document.getElementById("sobrenome").value = pessoa.sobrenome;
            document.getElementById("email").value = pessoa.email;
            document.getElementById("idade").value = pessoa.idade;
            document.getElementById("telefone").value = pessoa.telefone;
            document.getElementById("rua").value = pessoa.rua;
            document.getElementById("bairro").value = pessoa.bairro;
            document.getElementById("cidade").value = pessoa.cidade;
            document.getElementById("estado").value = pessoa.estado;
            document.getElementById("rg").value = pessoa.rg;
            document.getElementById("cpf").value = pessoa.cpf;

            mensagem.textContent = "Pessoa encontrada.";
        });
});

formAtualizar.addEventListener("submit", function(evento) {
    evento.preventDefault();

    if (idPessoa === null) {
        mensagem.textContent = "Busque uma pessoa primeiro.";
        return;
    }

    const pessoaAtualizada = {
        nome: document.getElementById("nome").value,
        sobrenome: document.getElementById("sobrenome").value,
        email: document.getElementById("email").value,
        idade: Number(document.getElementById("idade").value),
        telefone: document.getElementById("telefone").value,
        rua: document.getElementById("rua").value,
        bairro: document.getElementById("bairro").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
        rg: document.getElementById("rg").value,
        cpf: document.getElementById("cpf").value
    };

    fetch("/pessoas/" + idPessoa, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pessoaAtualizada)
    })
    .then(function(resposta) {
        if (!resposta.ok) {
            throw new Error("Erro ao atualizar");
        }

        return resposta.json();
    })
    .then(function() {
        mensagem.textContent = "Pessoa atualizada com sucesso!";
    })
    .catch(function() {
        mensagem.textContent = "Erro ao atualizar pessoa.";
    });
});