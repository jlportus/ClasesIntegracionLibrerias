export function calcularIva(base, tipoIva) {
  if (base < 0) throw new Error("La base no puede ser negativa");
  if (tipoIva < 0) throw new Error("El tipo de IVA no puede ser negativo");
  return base * tipoIva;
}

export function calcularTotal(base, tipoIva) {
  return base + calcularIva(base, tipoIva);
}