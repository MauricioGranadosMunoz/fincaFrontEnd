import { MainLayout } from "../layout/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import {
  obtenerPrecioActualCajuela,
  updateCajuelaPrecio,
} from "../../store/slices/Cajuela";
import { Button, Label, TextInput } from "flowbite-react";
import { useEffect } from "react";

export const ConfigPanel = () => {
  const dispatch = useDispatch();
  const { precioActual } = useSelector(
    (state) => state.cajuela
  );

  useEffect(() => {
    dispatch(obtenerPrecioActualCajuela());
  }, []);

  const { PRECIO_CAJUELA, onInputChange, formState } = useForm({
    PRECIO_CAJUELA: precioActual,
  });
  const { usuario } = useSelector((state) => state.usuario);

  const updatePrecioCajuela = (e) => {
    e.preventDefault();
    dispatch(updateCajuelaPrecio(formState, usuario.TOKEN));
  };
  return (
    <MainLayout hasHeader>
      <form className="flex flex-col gap-4" onSubmit={updatePrecioCajuela}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Precio Cajuelas" />
          </div>
          <TextInput
            type="text"
            name="PRECIO_CAJUELA"
            value={PRECIO_CAJUELA}
            onChange={onInputChange}
            required={true}
          />
        </div>
        <Button type="submit" onSubmit={updatePrecioCajuela}>
          Submit
        </Button>
      </form>
    </MainLayout>
  );
};
