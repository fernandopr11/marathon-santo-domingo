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

export const getPayments = async () => {
  try {
    const response = await api.get("/admin/payments");
    return response.data.map((payment) => convertPaymentData(payment));
  } catch (error) {
    console.error("Error fetching payments:", error);
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

export const updatePayment = (paymentId, paymentData) => {
  return api
    .patch(`/admin/payments/${paymentId}/`, paymentData)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating payment:", error);
      throw error;
    });
};

export const uploadPaymentProof = async (userId, file) => {
  try {
    const response = await api.post(
      `/admin/upload-payment-proof?user_id=${userId}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error uploading payment proof:", error);
    throw error;
  }
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
  status: user.application_status,
});

const convertPaymentData = (payment) => ({
  id: payment.id,
  categoria: payment.category,
  email: payment.email,
  cedula: payment.identification,
  nombres: payment.firstName,
  apellidos: payment.lastName,
  status: payment.payment_status,
});
