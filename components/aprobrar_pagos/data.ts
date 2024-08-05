import { getPayments } from "@/services/api";

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
    name: "CATEGORIA",
    uid: "categoria",
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

let pagos: any[] = [];

getPayments().then((data) => {
  pagos = data;
  console.log(pagos);
});

export { pagos, columns };
