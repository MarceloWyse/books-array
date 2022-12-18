let livros = [];
const APILivros = 'http://guilhermeonrails.github.io/casadocodigo/livros.json';
const sectionLivros = document.getElementById('livros'); 
buscarLivros()
const valorDosDisponieis = document.getElementById('valor_total_livros_disponiveis');

async function buscarLivros(){
    const res = await fetch(APILivros);
    livros = await res.json();
    let livrosDesconto = descontar(livros);
    exibirLivros(livrosDesconto);
}

function exibirLivros(e){
    valorDosDisponieis.innerHTML = '';
    sectionLivros.innerHTML = "";
    e.forEach(elemento => {
        let disponivel = elemento.quantidade > 0 ? 'livro_imagens' : 'livro__imagens indisponivel';
        sectionLivros.innerHTML += `
        <div class="livro">
      <img class="${disponivel}" src=${elemento.imagem} alt=${elemento.alt} />
      <h2 class="livro__titulo">
        ${elemento.titulo}
      </h2>
      <p class="livro__descricao">${elemento.autor}</p>
      <p class="livro__preco" id="preco">${elemento.preco.toFixed(2)}</p>
      <div class="tags">
        <span class="tag">${elemento.categoria}</span>
      </div>
      </div>
        `
    })
}

function descontar(e) {
    const desconto = 0.3;
    const livrosDesc = e.map(elemento => {
        return {...elemento, preco: elemento.preco - (elemento.preco * desconto)}
    })
    return livrosDesc;
}

const btns = document.querySelectorAll('.btn');
btns.forEach(e => e.addEventListener('click', filtrar));

function filtrar(){
    const btnClicado = document.getElementById(this.id);
    const valorDoBotao =  btnClicado.value;
    let arrayFiltro = valorDoBotao == 'disponivel' ? filtraPorDisponibilidade() : filtrarPorCategoria(valorDoBotao);
    exibirLivros(arrayFiltro);
    if (valorDoBotao == 'disponivel'){
        const valorTotal = calcularValorTotal(arrayFiltro);
        ordenarDisponiveis(valorTotal);
    }
}

let btnLivrosOrdenados = document.getElementById('btnOrdenarPorPreco');
btnLivrosOrdenados.addEventListener('click', ordenarPreco);

function calcularValorTotal(e) {
    return e.reduce((acc, atual) => acc + atual.preco, 0).toFixed(2);
}

function filtrarPorCategoria(valorDoBotao) {
    return livros.filter(e => e.categoria == valorDoBotao);
}

function filtraPorDisponibilidade() {
    return livros.filter(e => e.quantidade > 0);
}

function ordenarPreco(){
    let livrosOrdenados = livros.sort((a,b) => a.preco - b.preco);
    exibirLivros(livrosOrdenados);
}

function ordenarDisponiveis(e){
    valorDosDisponieis.innerHTML = `
    <div class="livros__disponiveis">
      <p>Todos os livros disponíveis por R$ <span id="valor">${e}</span></p>
    `
}

/* function disponibilidade(e){
    if (e.quantidade > 0) {
        return 'livro__imagens';
    }
    else {
        return 'livro__imagens indisponivel'
    }
} */