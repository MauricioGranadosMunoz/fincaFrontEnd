import axios from "axios";

export const usuarioApi = axios.create({
  baseURL: "http://192.168.100.9/FincaBackEnd/v1/usuarios",
});
export const cajuelaApi = axios.create({
  baseURL: "http://192.168.100.9/FincaBackEnd/v1/cajuelas",
});
