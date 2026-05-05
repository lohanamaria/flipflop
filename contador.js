function bitsNecessarios(max) {
  return Math.ceil(Math.log2(max + 1));
}

function bin(num, bits) {
  return num.toString(2).padStart(bits, "0").split("").map(Number);
}

function jk(Q, Qf) {
  if (Q === 0 && Qf === 0) return ["0", "X"];
  if (Q === 0 && Qf === 1) return ["1", "X"];
  if (Q === 1 && Qf === 0) return ["X", "1"];
  if (Q === 1 && Qf === 1) return ["X", "0"];
}

function gerarContador() {
  const seq = document.getElementById("seq").value
    .trim()
    .split(/\s+/)
    .map(Number);

  if (seq.length < 2) {
    alert("digite pelo menos 2 estados");
    return;
  }

  const bits = bitsNecessarios(Math.max(...seq));

  let html = "<table>";

  // cabeçalho
  html += "<tr>";
  html += `<th colspan="${bits}">Estado atual</th>`;
  html += `<th colspan="${bits}">Estado futuro</th>`;
  html += `<th colspan="${bits * 2}">JK</th>`;
  html += "</tr>";

  html += "<tr>";
  for (let i = bits - 1; i >= 0; i--) html += `<th>q${i}</th>`;
  for (let i = bits - 1; i >= 0; i--) html += `<th>q${i}</th>`;
  for (let i = bits - 1; i >= 0; i--) html += `<th>J${i}</th><th>K${i}</th>`;
  html += "</tr>";

  // tabela 
  for (let t = 0; t < seq.length; t++) {
    const atual = bin(seq[t], bits);
    const futuro = bin(seq[(t + 1) % seq.length], bits);

    html += "<tr>";

 atual.forEach((v, i) => {
  html += `<td class="bit-${bits - 1 - i}">${v}</td>`;
});

futuro.forEach((v, i) => {
  html += `<td class="bit-${bits - 1 - i}">${v}</td>`;
});

    for (let i = 0; i < bits; i++) {
      const [J, K] = jk(atual[i], futuro[i]);
      html += `<td>${J}</td><td>${K}</td>`;
    }

    html += "</tr>";
  }

  html += "</table>";

  document.getElementById("saida").innerHTML =
    `<div class="table-wrapper">${html}</div>`;
}

// limpa
function limparTabela() {
  document.getElementById("saida").innerHTML = "";
}

// exporta imagem
function exportarImagem() {
  const area = document.querySelector(".table-wrapper");

  if (!area) {
    alert("gere a tabela primeiro");
    return;
  }

  html2canvas(area).then(canvas => {
    const link = document.createElement("a");
    link.download = "tabela.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}