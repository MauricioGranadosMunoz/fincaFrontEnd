import { usuarioApi } from "../../../api/fincaAPI";
import {
  setLoadedToken,
  setRebajas,
  setTrabajadores,
  setUsuarioLogged,
} from "./usuarioSlice";

const loginUsuario = ({ US_CORREO, US_CONTRASENA }) => {
  return async (dispatch) => {
    const { data } = await usuarioApi.post(`/userLogin.php`, {
      EMAIL: US_CORREO,
      CONTRASENA: US_CONTRASENA,
    });

    const { success, usuario } = data;

    if (success) {
      localStorage.setItem("fincaUserData", JSON.stringify(usuario));
      success &&
        dispatch(
          setUsuarioLogged({
            usuario: usuario,
          })
        );
    }
  };
};

const checkValidUser = (usuario) => {
  return async (dispatch) => {
    const { data } = await usuarioApi.post(
      "/isTokenValid.php",
      {},
      {
        headers: {
          Authorization: `Bearer ${usuario.TOKEN}`,
        },
      }
    );

    if (!data.status) return false;
    dispatch(
      setLoadedToken({
        usuario,
      })
    );
  };
};

const obtenerRebajaSemana = () => {
  return async (dispatch) => {
    const { data } = await usuarioApi.post("/obtenerRebajaSemana.php", {
      SEMANA_REBAJA: 1,
    });

    dispatch(
      setRebajas({
        rebajas: data.REBAJAS,
      })
    );
  };
};

const obtenerTrabajadoresActuales = (token) => {
  return async (dispatch) => {
    const { data } = await usuarioApi.post(
      "/obtenerTrabajadoresActuales.php",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(
      setTrabajadores({
        trabajadores: data.TRABAJADORES,
      })
    );
  };
};

const agregarRebaja = ({ TRABAJADOR_ID, MONTO_REBAJA, DESCRIPCION }) => {
  return async () => {
    const { data } = await usuarioApi.post(`/agregarRebaja.php`, {
      TRABAJADOR_ID: TRABAJADOR_ID,
      MONTO_REBAJA: MONTO_REBAJA,
      DESCRIPCION: DESCRIPCION,
    });
  };
};

const eliminarRebaja = (REBAJA_ID) => {
  return async (dispatch, getState) => {
    const { data } = await usuarioApi.post(`/eliminarRebaja.php`, {
      REBAJA_ID: REBAJA_ID,
    });
    data.status && dispatch(obtenerRebajaSemana());
  };
};

export {
  loginUsuario,
  checkValidUser,
  obtenerTrabajadoresActuales,
  agregarRebaja,
  obtenerRebajaSemana,
  eliminarRebaja,
};
