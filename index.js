var aggiungiPiatti = document.querySelector('.aggiungi-piatto');
var piatti = document.querySelector('.piatti');
var listaOrdini = JSON.parse(localStorage.getItem('ordini')) || [];
var cancellaPiatti = document.querySelector('.reset-piatti');
aggiungiPiatti.addEventListener('submit', aggiungiPiatto);
cancellaPiatti.addEventListener('click', cancellaPiatto);
function aggiungiPiatto(e) {
    e.preventDefault();
    var nome = (this.querySelector('[name="piatto"]')).value;
    var piatto = {
        nome: nome,
        portato: false
    };
    listaOrdini.push(piatto);
    popolaLista();
    localStorage.setItem('ordini', JSON.stringify(listaOrdini));
    this.reset();
}
function cancellaPiatto() {
    localStorage.removeItem('ordini');
    listaOrdini.length = 0;
    popolaLista();
}
function popolaLista() {
    piatti.innerHTML = listaOrdini.map(function (ordine, index) {
        return "\n        <li>\n        <input type=\"checkbox\" data-index=\"".concat(index, "\" id=\"item").concat(index, "\" ").concat(ordine.portato ? 'checked' : '', " />\n        <label for=\"item").concat(index, "\">").concat(ordine.nome, "</label>\n        </li>\n        ");
    }).join('');
}
piatti.addEventListener('click', togglePortato);
function togglePortato(e) {
    var el = e.target;
    if (el.matches('input')) {
        var index = Number(el.dataset.index);
        listaOrdini[index].portato = !listaOrdini[index].portato;
        localStorage.setItem('ordini', JSON.stringify(listaOrdini));
        popolaLista();
    }
}
popolaLista();
