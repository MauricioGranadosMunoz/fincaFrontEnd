import axios from "axios";

export const usuarioApi = axios.create({
  baseURL: "http://www.mgm.social/api/v1/usuarios",
});
export const cajuelaApi = axios.create({
  baseURL: "http://www.mgm.social/api/v1/cajuelas",
});
