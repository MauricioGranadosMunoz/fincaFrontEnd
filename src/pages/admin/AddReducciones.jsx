import { Button, Table, Label, Modal, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import {
  agregarRebaja,
  eliminarRebaja,
  obtenerRebajaSemana,
  obtenerTrabajadoresActuales,
} from "../../store/slices/Usuario/usuarioThunk";
import { MainLayout } from "../layout/MainLayout";

export const AddReducciones = () => {
  const dispatch = useDispatch();
  const { usuario, trabajadores, rebajas } = useSelector(
    (state) => state.usuario
  );
  const { TRABAJADOR_ID, MONTO_REBAJA, DESCRIPCION, onInputChange, formState } =
    useForm({
      TRABAJADOR_ID: "",
      MONTO_REBAJA: "",
      DESCRIPCION: "",
    });

  useEffect(() => {
    dispatch(obtenerTrabajadoresActuales(usuario.TOKEN));
    dispatch(obtenerRebajaSemana());
  }, [rebajas]);

  const [showModal, setShowModal] = useState(false);
  const onToggleModal = () => {
    setShowModal(!showModal);
  };
  const handleOnSubmit = () => {
    dispatch(agregarRebaja(formState));
    setShowModal(!showModal);
    dispatch(obtenerRebajaSemana());
  };

  const handleEliminarRebaja = (rebaja_id) => {
    dispatch(eliminarRebaja(rebaja_id));
  };

  return (
    <MainLayout hasHeader>
      <div>
        <Button onClick={onToggleModal} color="success" className="mb-10">
          Agregar Nueva Rebaja
        </Button>

        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell>Numero Trabador</Table.HeadCell>
            <Table.HeadCell>Monto Rebaja</Table.HeadCell>
            <Table.HeadCell>Descripción</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {rebajas.map(
              (
                { REBAJA_ID, TRABAJADOR_ID, MONTO_REBAJA, DESCRIPCION },
                index
              ) => (
                <Table.Row
                  key={index}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {TRABAJADOR_ID}
                  </Table.Cell>
                  <Table.Cell>
                    ₡ {new Intl.NumberFormat().format(MONTO_REBAJA)}
                  </Table.Cell>
                  <Table.Cell>{DESCRIPCION}</Table.Cell>
                  <Table.Cell>
                    <div className="flex flex-row gap-4">
                      <Button
                        id={REBAJA_ID}
                        color="failure"
                        onClick={(e) =>
                          handleEliminarRebaja(
                            e.target === e.currentTarget
                              ? e.target.id
                              : e.target.parentElement.id
                          )
                        }
                      >
                        Eliminar
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              )
            )}
          </Table.Body>
        </Table>

        <>
          <Modal show={showModal} onClose={onToggleModal}>
            <Modal.Header>Agregar una nueva rebaja</Modal.Header>
            <Modal.Body>
              <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Numero de trabajador
                  </label>
                  <select
                    name="TRABAJADOR_ID"
                    value={TRABAJADOR_ID}
                    onChange={onInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option>Seleccione Numero</option>
                    {trabajadores.map((trabajador) => (
                      <option
                        key={trabajador.TRABAJADOR_ID}
                        value={trabajador.TRABAJADOR_ID}
                      >
                        {trabajador.TRABAJADOR_ID}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="number" value="Monto a Rebajar" />
                  </div>
                  <TextInput
                    type="text"
                    name="MONTO_REBAJA"
                    value={MONTO_REBAJA}
                    onChange={onInputChange}
                    placeholder="Escriba un monto"
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="text" value="Descripción del rebajo" />
                  </div>
                  <TextInput
                    type="text"
                    name="DESCRIPCION"
                    value={DESCRIPCION}
                    onChange={onInputChange}
                    placeholder="Escriba una descripción"
                  />
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleOnSubmit}>Guardar</Button>
              <Button color="gray" onClick={onToggleModal}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </div>
    </MainLayout>
  );
};
