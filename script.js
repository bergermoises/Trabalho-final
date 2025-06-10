const form = document.getElementById('form-transacao');
const lista = document.getElementById('lista-transacoes');
const saldo = document.getElementById('saldo');

let dados = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const desc = document.getElementById('campoDescricao').value.trim();
  const valor = parseFloat(document.getElementById('campoValor').value);
  const tipo = document.getElementById('campoTipo').value;

  if (!desc || isNaN(valor) || !tipo) return;

  const item = {
    desc,
    valor,
    tipo,
    data: new Date().toLocaleDateString('pt-BR')
  };

  dados.push(item);
  atualizarLista();
  form.reset();
});

function atualizarLista() {
  lista.innerHTML = "";
  let total = 0;

  dados.forEach(el => {
    const li = document.createElement('li');
    li.classList.add(el.tipo);

    const simbolo = el.tipo === "entrada" ? "+" : "-";
    const texto = `${el.desc} - ${simbolo} R$ ${el.valor.toFixed(2)} (${el.data})`;

    li.textContent = texto;
    lista.appendChild(li);

    total += el.tipo === "entrada" ? el.valor : -el.valor;
  });

  saldo.textContent = total.toFixed(2);
}
