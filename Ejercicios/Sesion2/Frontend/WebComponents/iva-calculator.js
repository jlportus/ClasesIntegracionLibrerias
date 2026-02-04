import { calcularIva, calcularTotal } from "./lib/finanzas-component.js";

let cachedTpl;

class IvaCalculator extends HTMLElement {
 async connectedCallback() {
    this.innerHTML = `
      <section>
        <label>Base (€): <input id="base" type="number" value="100"></label><br/>
        <label>IVA (ej. 0.21): <input id="iva" type="number" step="0.01" value="0.21"></label><br/>
        <button id="calc">Calcular</button>
        <pre id="out"></pre>
      </section>
    `;
 
    if (!cachedTpl) {
      const res = await fetch(new URL('./tpl.html', import.meta.url));
      const html = await res.text();
      const tmp = document.createElement('div');
      tmp.innerHTML = html;
      cachedTpl = tmp.querySelector('#tpl');
      }
    

     const node = cachedTpl.content.cloneNode(true);
    // Opcional: shadow root para encapsular
    // this.attachShadow({ mode: 'open' }).appendChild(node);
   // this.appendChild(node);

    this.querySelector("#calc").addEventListener("click", () => {
      const base = Number(this.querySelector("#base").value);
      const tipoIva = Number(this.querySelector("#iva").value);

      const iva = calcularIva(base, tipoIva);
      const total = calcularTotal(base, tipoIva);

      this.querySelector("#out").textContent = `IVA: ${iva}\nTotal: ${total}`;
    });
  }
}

customElements.define("iva-calculator", IvaCalculator);