let livros = [];
const APILivros = 'http://guilhermeonrails.github.io/casadocodigo/livros.json';
const sectionLivros = document.getElementById('livros'); 
buscarLivros()

async function buscarLivros(){
    const res = await fetch(APILivros);
    livros = await res.json();
    let livrosDesconto = descontar(livros);
    exibirLivros(livrosDesconto);
}

function exibirLivros(e){
    sectionLivros.innerHTML = "";
    e.forEach(elemento => {
        sectionLivros.innerHTML += `
        <div class="livro">
      <img class="livro__imagens" src=${elemento.imagem} alt=${elemento.alt} />
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
    let arrayFiltro = livros.filter(e => e.categoria == valorDoBotao);
    exibirLivros(arrayFiltro);
}
