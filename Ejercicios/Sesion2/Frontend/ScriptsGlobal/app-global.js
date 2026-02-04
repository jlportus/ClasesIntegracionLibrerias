const root = document.getElementById("root");

root.innerHTML = `
  <label>Base (€): <input id="base" type="number" value="100"></label><br/>
  <label>IVA (ej. 0.21): <input id="iva" type="number" step="0.01" value="0.21"></label><br/>
  <button id="calc">Calcular</button>
  <pre id="out"></pre>
`;

document.getElementById("calc").addEventListener("click", () => {
  const base = Number(document.getElementById("base").value);
  const tipoIva = Number(document.getElementById("iva").value);

  const iva = window.Finanzas.calcularIva(base, tipoIva);
  const total = window.Finanzas.calcularTotal(base, tipoIva);

  document.getElementById("out").textContent =
    `IVA: ${iva}\nTotal: ${total}`;
});