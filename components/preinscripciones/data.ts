import { getUsers } from "@/services/api";

const columns2 = [
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
    name: "CEDULA",
    uid: "cedula",
    sortable: true,
  },
  {
    name: "FECHA DE NACIMIENTO",
    uid: "fechaNacimiento",
  },
  {
    name: "SEXO",
    uid: "sexo",
    sortable: true,
  },
  {
    name: "TELEFONO",
    uid: "telefono",
    sortable: true,
  },
  {
    name: "EMAIL",
    uid: "email",
  },
  {
    name: "CATEGORIA",
    uid: "categoria",
    sortable: true,
  },
  {
    name: "TALLA",
    uid: "talla",
    sortable: true,
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


let users2:any[] = [];

getUsers().then((data) => {
  users2 = data;
  console.log(users2);
});

export { users2, columns2 };
