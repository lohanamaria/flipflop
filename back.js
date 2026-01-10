function criarEntradas() {
  const bits = parseInt(document.getElementById("bits").value);
  const div = document.getElementById("entradas");
  div.innerHTML = "";

  for (let i = bits - 1; i >= 0; i--) {
    div.innerHTML += `
      <div class="bit-input">
        <label>q${i}:</label><br>
        <input id="q${i}" type="text">
      </div>
    `;
  }
}

// tabela 
function jk(Q, Qf) {
  if (Q === 0 && Qf === 0) return ["0", "X"];
  if (Q === 0 && Qf === 1) return ["1", "X"];
  if (Q === 1 && Qf === 0) return ["X", "1"];
  if (Q === 1 && Qf === 1) return ["X", "0"];
}

// funcao principal
function gerar() {
  const bits = parseInt(document.getElementById("bits").value);
  const estados = [];

  // le as seq de cada bit
  for (let i = bits - 1; i >= 0; i--) {
    const seq = document.getElementById(`q${i}`).value
      .trim()
      .split(/\s+/)
      .map(Number);
    estados[i] = seq; 
  }

  const passos = estados[0].length;

  let html = "<table><tr>";

  // estado atual q
  for (let i = bits - 1; i >= 0; i--) {
    html += `<th class="bit-${i}">q${i}a</th>`;
  }

  // estado futuro q+1
  for (let i = bits - 1; i >= 0; i--) {
    html += `<th class="bit-${i}">q${i}f</th>`;
  }

  // jk
  for (let i = bits - 1; i >= 0; i--) {
    html += `<th class="bit-${i}">J${i}</th><th class="bit-${i}">K${i}</th>`;
  }

  html += "</tr>";

  // linhas da tabela
  for (let t = 0; t < passos - 1; t++) {
    html += "<tr>";

    // agora
    for (let i = bits - 1; i >= 0; i--) {
      html += `<td class="bit-${i}">${estados[i][t]}</td>`;
    }

    // futuro
    for (let i = bits - 1; i >= 0; i--) {
      html += `<td class="bit-${i}">${estados[i][t + 1]}</td>`;
    }

    // jk
    for (let i = bits - 1; i >= 0; i--) {
      const [J, K] = jk(estados[i][t], estados[i][t + 1]);
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

criarEntradas();

function toggleDarkMode() {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", isDark);

  const toggle = document.getElementById("darkToggle");
  if (toggle) toggle.checked = isDark;
}

window.addEventListener("load", () => {
  const isDark = localStorage.getItem("darkMode") === "true";
  document.body.classList.toggle("dark", isDark);

  const toggle = document.getElementById("darkToggle");
  if (toggle) toggle.checked = isDark;
});
