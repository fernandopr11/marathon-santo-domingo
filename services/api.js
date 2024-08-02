import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/marathon-santo-domingo/us-central1/app/api", // Replace with your Firebase URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const createUser = (userData) => {
  return api.post("/users", userData);
};

export const getUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data.map((user) => convertUserData(user));
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const updateUser = (userId, updatedData) => {
  return api
    .patch(`/admin/users/${userId}`, updatedData)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating user:", error);
      throw error;
    });
};

// Función para convertir los datos de la API al formato en español
const convertUserData = (user) => ({
  id: user.id,
  nombres: user.firstName,
  apellidos: user.lastName,
  cedula: user.identification,
  fechaNacimiento: new Date(user.birthDate).toLocaleDateString(), // Convierte la fecha a un formato legible
  sexo: user.gender,
  telefono: user.phone,
  email: user.email,
  categoria: user.category,
  talla: user.size,
  avatar: `https://i.pravatar.cc/150?img=${user.id}`, // Puedes ajustar esto si tienes una URL diferente para el avatar
  status: user.application_status,
});
