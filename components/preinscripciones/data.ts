const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "AGE", uid: "age", sortable: true },
  { name: "ROLE", uid: "role", sortable: true },
  { name: "TEAM", uid: "team" },
  { name: "EMAIL", uid: "email" },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

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

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

const categories = ['42k', '21k', '10k'];
const sizes = ['XS', 'S', 'M', 'L', 'XL'];

const users2 = Array(10).fill(null).map((_, index) => ({
  id: index + 1,
  nombres: `Nombre ${index + 1}`,
  apellidos: `Apellido ${index + 1}`,
  cedula: Math.floor(1000000000 + Math.random() * 9000000000),
  fechaNacimiento: `Fecha ${index + 1}`,
  sexo: index % 2 === 0 ? 'Masculino' : 'Femenino',
  telefono: `Telefono ${index + 1}`,
  email: `email${index + 1}@example.com`,
  categoria: categories[index % categories.length],
  talla: sizes[index % sizes.length],
  avatar: `https://i.pravatar.cc/150?img=${index + 1}`,
  status: 'Pendiente', // Agregar estado inicial
}));

export { columns, statusOptions, users2, columns2 };
