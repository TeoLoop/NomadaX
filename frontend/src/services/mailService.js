import axios from "axios";
const BASE_URL = 'http://localhost:8080/mail';

export const sendMailReservation = async (toMail, subject, body) => {
  try {
    await axios.post(`${BASE_URL}`, {
      to: toMail,
      subject: subject,
      body: body,
    });
  } catch (error) {
    console.error("Error al enviar el correo", error);
  }
};
