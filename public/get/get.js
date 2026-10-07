const listaPessoas = document.getElementById("listaPessoas");
const botaoBuscar = document.getElementById("buscar");
const cpfBusca = document.getElementById("cpfBusca");

function mostrarPessoas(pessoas) {
    listaPessoas.innerHTML = "";

    if (pessoas.length === 0) {
        listaPessoas.innerHTML = "<p>Nenhum registro encontrado.</p>";
        return;
    }

    pessoas.forEach(function(pessoa) {
        const card = document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `
            <p><strong>Nome:</strong> ${pessoa.nome} ${pessoa.sobrenome}</p>
            <p><strong>E-mail:</strong> ${pessoa.email}</p>
            <p><strong>Idade:</strong> ${pessoa.idade}</p>
            <p><strong>Telefone:</strong> ${pessoa.telefone}</p>
            <p><strong>Rua:</strong> ${pessoa.rua}</p>
            <p><strong>Bairro:</strong> ${pessoa.bairro}</p>
            <p><strong>Cidade:</strong> ${pessoa.cidade}</p>
            <p><strong>Estado:</strong> ${pessoa.estado}</p>
            <p><strong>RG:</strong> ${pessoa.rg}</p>
            <p><strong>CPF:</strong> ${pessoa.cpf}</p>
        `;

        listaPessoas.appendChild(card);
    });
}

function carregarPessoas() {
    fetch("/pessoas")
        .then(function(resposta) {
            return resposta.json();
        })
        .then(function(pessoas) {
            mostrarPessoas(pessoas);
        })
        .catch(function() {
            listaPessoas.innerHTML = "<p>Erro ao carregar registros.</p>";
        });
}

botaoBuscar.addEventListener("click", function() {
    const cpf = cpfBusca.value.trim();

    if (cpf === "") {
        carregarPessoas();
        return;
    }

    fetch("/pessoas?cpf=" + cpf)
        .then(function(resposta) {
            return resposta.json();
        })
        .then(function(pessoas) {
            mostrarPessoas(pessoas);
        })
        .catch(function() {
            listaPessoas.innerHTML = "<p>Erro na busca.</p>";
        });
});

carregarPessoas();