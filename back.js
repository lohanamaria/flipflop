function criarEntradas() {
  const bits = parseInt(document.getElementById("bits").value);
  const div = document.getElementById("entradas");
  div.innerHTML = "";

  for (let i = bits - 1; i >= 0; i--) {
    div.innerHTML += `
      <div class="bit-input">
        <label>q${i} (ex: 0 1 1 0):</label><br>
        <input id="q${i}" type="text">
      </div>
    `;
  }
}

// tabekla
function jk(Q, Qf) {
  if (Q === 0 && Qf === 0) return ["0", "X"];
  if (Q === 0 && Qf === 1) return ["1", "X"];
  if (Q === 1 && Qf === 0) return ["X", "1"];
  if (Q === 1 && Qf === 1) return ["X", "0"];
}

function gerar() {
  const bits = parseInt(document.getElementById("bits").value);
  const estados = [];

  // le as seq de cada bit
  for (let i = bits - 1; i >= 0; i--) {
    const seq = document.getElementById(`q${i}`).value
      .trim()
      .split(/\s+/)
      .map(Number);
    estados.push(seq);
  }

  const passos = estados[0].length;

  let html = "<table><tr>";

  // estado atual
  for (let i = bits - 1; i >= 0; i--) html += `<th>q${i}a</th>`;
  // estado futuro
  for (let i = bits - 1; i >= 0; i--) html += `<th>q${i}f</th>`;
  // JK
  for (let i = bits - 1; i >= 0; i--) html += `<th>J${i}</th><th>K${i}</th>`;

  html += "</tr>";

  // linhas da tabela
  for (let t = 0; t < passos - 1; t++) {
    html += "<tr>";

    //  atual
    for (let b = 0; b < bits; b++) {
      html += `<td>${estados[b][t]}</td>`;
    }

    // futuro
    for (let b = 0; b < bits; b++) {
      html += `<td>${estados[b][t + 1]}</td>`;
    }

    // JK
    for (let b = 0; b < bits; b++) {
      const [J, K] = jk(estados[b][t], estados[b][t + 1]);
      html += `<td>${J}</td><td>${K}</td>`;
    }

    html += "</tr>";
  }

  html += "</table>";
  document.getElementById("saida").innerHTML = html;
}

criarEntradas();
