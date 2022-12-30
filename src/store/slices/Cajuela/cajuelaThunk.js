import { cajuelaApi } from "../../../api/fincaAPI";
import {
  setCajuelasSemana,
  setPrecioActual,
} from "./cajuelaSlice";

const addCajuelaSemana = (CAJUELAS_JSON_SEMANA, usuario) => {
  return async (dispatch, getState) => {
    const { data } = await cajuelaApi.post(
      `/addCajuelaSemana.php`,
      {
        CAJUELAS_JSON_SEMANA: JSON.stringify(CAJUELAS_JSON_SEMANA),
        ADMINISTRADOR_ID: usuario.USUARIO_ID,
      },
      {
        headers: {
          Authorization: `Bearer ${usuario.TOKEN}`,
        },
      }
    );
  };
};

const obtenerCajuelaSemana = (TOKEN) => {
  return async (dispatch, getState) => {
    const { data } = await cajuelaApi.post(
      `/obtenerCajuelasSemana.php`,
      {},
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    const isEmpty = Object.keys(data).length === 0;
    if (!isEmpty) {
      dispatch(
        setCajuelasSemana({
          cajuelaSemana: data,
        })
      );
    }
  };
};

const updateCajuelaPrecio = ({ PRECIO_CAJUELA }, TOKEN) => {
  return async (dispatch, getState) => {
    const { data } = await cajuelaApi.post(
      `/updateCajuelaPrecio.php`,
      {
        NUEVO_PRECIO: PRECIO_CAJUELA,
        ADMINISTRADOR_ID: 2,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
  };
};

const obtenerPrecioActualCajuela = () => {
  return async (dispatch, getState) => {
    const { data } = await cajuelaApi.get(`obtenerPrecioActualCajuela.php`);
    dispatch(setPrecioActual(data.PRECIO_ACTUAL));
  };
};

export {
  addCajuelaSemana,
  obtenerCajuelaSemana,
  updateCajuelaPrecio,
  obtenerPrecioActualCajuela,
};
