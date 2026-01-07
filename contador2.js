function Teste() {
  let html = "<table>";
  html += "";

  for (let i = 0; i < 10; i++) {
    const atual = i;
    const futuro = (i + 1) % 10;

    html += `
      <tr>
        <td>${atual}</td>
        <td>${futuro}</td>
      </tr>
    `;
  }

  html += "</table>";

  document.getElementById("saida").innerHTML = html;
}
