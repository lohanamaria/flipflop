// calcula n de bits 
function bitsNecessarios(max) {
  return Math.ceil(Math.log2(max + 1));
}

// converte decimal para bin
function bin(num, bits) {
  return num.toString(2).padStart(bits, "0").split("").map(Number);
}

// tabela de excitação jk
function jk(Q, Qf) {
  if (Q === 0 && Qf === 0) return ["0", "X"];
  if (Q === 0 && Qf === 1) return ["1", "X"];
  if (Q === 1 && Qf === 0) return ["X", "1"];
  if (Q === 1 && Qf === 1) return ["X", "0"];
}

function gerar() {
  const seq = document.getElementById("seq").value
    .trim()
    .split(/\s+/)
    .map(Number);

  const bits = bitsNecessarios(Math.max(...seq));

  let html = "<table>";

  html += "<tr>";
  html += `<th colspan="${bits}">Estado atual (Qn)</th>`;
  html += `<th colspan="${bits}">Estado uturo (Qn+1)</th>`;
  html += `<th colspan="${bits * 2}">Entradas JK</th>`;
  html += "</tr>";

  html += "<tr>";

  for (let i = bits - 1; i >= 0; i--) html += `<th>q${i}</th>`;
  for (let i = bits - 1; i >= 0; i--) html += `<th>q${i}</th>`;
  for (let i = bits - 1; i >= 0; i--) html += `<th>J${i}</th><th>K${i}</th>`;

  html += "</tr>";


  for (let t = 0; t < seq.length - 1; t++) {
    const Qa = bin(seq[t], bits);
    const Qf = bin(seq[t + 1], bits);

    html += "<tr>";

    Qa.forEach(v => html += `<td>${v}</td>`);
    Qf.forEach(v => html += `<td>${v}</td>`);

    for (let b = 0; b < bits; b++) {
      const [J, K] = jk(Qa[b], Qf[b]);
      html += `<td>${J}</td><td>${K}</td>`;
    }

    html += "</tr>";
  }

  html += "</table>";

  document.getElementById("saida").innerHTML =
    `<div class="table-wrapper">${html}</div>`;
}
