const formCadastro = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");

formCadastro.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const pessoa = {
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

    fetch("/pessoas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pessoa)
    })
    .then(function(resposta) {
        if (!resposta.ok) {
            throw new Error("Erro ao cadastrar");
        }

        return resposta.json();
    })
    .then(function() {
        mensagem.textContent = "Pessoa cadastrada com sucesso!";
        formCadastro.reset();
    })
    .catch(function() {
        mensagem.textContent = "Erro ao cadastrar pessoa.";
    });
});