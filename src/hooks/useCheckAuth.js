import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkValidUser } from "../store/slices/Usuario";

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.usuario);
  const dispatch = useDispatch();
  const usuario = JSON.parse(localStorage.getItem("fincaUserData"));
  useEffect(() => {
    usuario !== null && dispatch(checkValidUser(usuario));
  }, []);

  return status;
};
