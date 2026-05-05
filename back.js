function criarEntradas() {
  const div = document.getElementById("entradas");

  div.innerHTML = `
    <div id="grid-estados"></div>
  `;

  addLinha(); // primeira linha
}

// tabela JK
function jk(Q, Qf) {
  if (Q === 0 && Qf === 0) return ["0", "X"];
  if (Q === 0 && Qf === 1) return ["1", "X"];
  if (Q === 1 && Qf === 0) return ["X", "1"];
  if (Q === 1 && Qf === 1) return ["X", "0"];
}

// adiciona nova linha de estado
function addLinha() {
  const bits = parseInt(document.getElementById("bits").value);
  const grid = document.getElementById("grid-estados");

  let linha = `<div class="linha">`;

  for (let i = bits - 1; i >= 0; i--) {
    linha += `<input type="number" min="0" max="1" placeholder="q${i}">`;
  }

  linha += `</div>`;

  grid.innerHTML += linha;
}

// função principal
function gerar() {
  const bits = parseInt(document.getElementById("bits").value);
  const linhas = document.querySelectorAll(".linha");

  if (linhas.length < 2) {
    alert("adicione pelo menos 2 estados");
    return;
  }

  const estados = [];

  // cria estrutura
  for (let i = 0; i < bits; i++) estados[i] = [];

  // coleta valores
  for (let linha of linhas) {
    const inputs = linha.querySelectorAll("input");

    inputs.forEach((input, idx) => {
      const valor = Number(input.value);

      if (valor !== 0 && valor !== 1) {
        alert("preencha apenas 0 ou 1");
        throw "erro";
      }

      const bitIndex = bits - 1 - idx;
      estados[bitIndex].push(valor);
    });
  }

  const passos = estados[0].length;

  let html = "<table>";

  // cabeçalho 1
  html += "<tr>";
  html += `<th colspan="${bits}">Estado atual (Qn)</th>`;
  html += `<th colspan="${bits}">Estado futuro (Qn+1)</th>`;
  html += `<th colspan="${bits * 2}">Entradas JK</th>`;
  html += "</tr>";

  // cabeçalho 2
  html += "<tr>";
  for (let i = bits - 1; i >= 0; i--) html += `<th>q${i}</th>`;
  for (let i = bits - 1; i >= 0; i--) html += `<th>q${i}</th>`;
  for (let i = bits - 1; i >= 0; i--) html += `<th>J${i}</th><th>K${i}</th>`;
  html += "</tr>";

  // linhas da tabela 
  for (let t = 0; t < passos; t++) {
    html += "<tr>";

    // atual
    for (let i = bits - 1; i >= 0; i--) {
      html += `<td class="bit-${i}">${estados[i][t]}</td>`;
    }

    // futuro (cíclico)
    for (let i = bits - 1; i >= 0; i--) {
      html += `<td class="bit-${i}">${estados[i][(t + 1) % passos]}</td>`;
    }

    // JK
    for (let i = bits - 1; i >= 0; i--) {
      const [J, K] = jk(
        estados[i][t],
        estados[i][(t + 1) % passos]
      );

      html += `
        <td class="bit-${i}">${J}</td>
        <td class="bit-${i}">${K}</td>
      `;
    }

    html += "</tr>";
  }

  html += "</table>";

  document.getElementById("saida").innerHTML =
    `<div class="table-wrapper">${html}</div>`;
}

// inicia
criarEntradas();