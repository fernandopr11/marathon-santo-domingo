const columns = [
  {
    name: "ID",
    uid: "id",
    sortable: true,
  },
  {
    name: "NOMBRES",
    uid: "nombres",
    sortable: true,
  },
  {
    name: "APELLIDOS",
    uid: "apellidos",
    sortable: true,
  },
  {
    name: "EMAIL",
    uid: "email",
    sortable: true,
  },
  {
    name: "CEDULA",
    uid: "cedula",
    sortable: true,
  },
  {
    name: "NUMERO COMPROBANTE",
    uid: "numeroComprobante",
  },
  {
    name: "VALOR CANCELADO",
    uid: "valorCancelado",
  },
  {
    name: "FECHA DE PAGO",
    uid: "fechaPago",
  },
  {
    name: "ESTADO", // Agregar la columna STATUS
    uid: "status",
    sortable: true,
  },
  {
    name: "ACCIONES",
    uid: "actions",
  }
];

const valoresCancelados = [60, 45, 30];

const pagos = Array(10).fill(null).map((_, index) => ({
  id: index + 1,
  nombres: `Nombre ${index + 1}`,
  apellidos: `Apellido ${index + 1}`,
  email: `email${index + 1}@example.com`,
  cedula: Math.floor(1000000000 + Math.random() * 9000000000),
  numeroComprobante: `Comprobante ${index + 1}`,
  valorCancelado: valoresCancelados[index % valoresCancelados.length],
  fechaPago: new Date(),
  status: 'Pendiente', // Agregar estado inicial
}));

export { pagos, columns };
