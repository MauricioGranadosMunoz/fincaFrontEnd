import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CajuelasSemana } from "../../pdf/Cajuelas/CajuelasSemana";
import {
  addCajuelaSemana,
  obtenerCajuelaSemana,
} from "../../store/slices/Cajuela";
import { PDFDownloadLink } from "@react-pdf/renderer";
import {
  obtenerRebajaSemana,
  obtenerTrabajadoresActuales,
} from "../../store/slices/Usuario/usuarioThunk";
import { CheckingAuth } from "../auth/CheckingAuth";
import { useEffect } from "react";
import { Button, Label, TextInput, Tooltip } from "flowbite-react";

export const DinamicCajuelasForm = ({ cajuelaSemana, precioActual }) => {
  const dispatch = useDispatch();

  const { usuario, trabajadores, trabajadoresLoading, rebajas, rebajasLoading } = useSelector(
    (state) => state.usuario
  );

  const [formFields, setFormFields] = useState(
    JSON.parse(cajuelaSemana.CAJUELAS_JSON_SEMANA)
  );

  const [totales, setTotales] = useState({});
  
  const getRebajas = () => {
    const RebajasTotales = [];
    rebajas.map((rebaja) => {
      if (RebajasTotales[rebaja.TRABAJADOR_ID]) {
        RebajasTotales[rebaja.TRABAJADOR_ID] = RebajasTotales[rebaja.TRABAJADOR_ID] + Number(rebaja.MONTO_REBAJA);
      } else {
        RebajasTotales[rebaja.TRABAJADOR_ID] = Number(rebaja.MONTO_REBAJA);
      }
    });
  return RebajasTotales.reduce((a, b) => a + b, 0);
  }

  const handleTotales = () => {
    let tol = {
      sabado: 0,
      lunes: 0,
      martes: 0,
      miercoles: 0,
      jueves: 0,
      viernes: 0,
      totalCajuelas: 0,
      pagoCajuelas: 0,
      totalRebajas: 0,
      totalPagar: 0,
    };
      formFields.map(
        ({ sabado, lunes, martes, miercoles, jueves, viernes, total }) => {
          tol = {
            ...tol,
            ["sabado"]: Number(Number(tol["sabado"]) + Number(sabado)),
            ["lunes"]: Number(Number(tol["lunes"]) + Number(lunes)),
            ["martes"]: Number(Number(tol["martes"]) + Number(martes)),
            ["miercoles"]: Number(Number(tol["miercoles"]) + Number(miercoles)),
            ["jueves"]: Number(Number(tol["jueves"]) + Number(jueves)),
            ["viernes"]: Number(Number(tol["viernes"]) + Number(viernes)),
            ["totalCajuelas"]: Number(Number(tol["totalCajuelas"]) + Number(total)),
            ["totalRebajas"]: rebajas.length > 0 && Number(getRebajas())
          };
        }
      );
    setTotales(tol);
  };

  useEffect(() => {
    dispatch(obtenerTrabajadoresActuales(usuario.TOKEN));
    dispatch(obtenerRebajaSemana());
    handleTotales();
  }, [rebajasLoading]);

  const handleFormChange = (e, index) => {
    const data = [...formFields];
    const result = e.target.value.replace(/[^0-9\.]/g, "");
    data[index][e.target.name] = result;

    const arr = Object.values(data[index]);
    arr.pop();
    const sumWithInitial = arr.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue),
      0
    );

    data[index]["total"] = sumWithInitial;

    setFormFields(data);
    dispatch(addCajuelaSemana(formFields, usuario));
    dispatch(obtenerCajuelaSemana(usuario.TOKEN));
    handleTotales();
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(addCajuelaSemana(formFields, usuario));
    dispatch(obtenerCajuelaSemana(usuario.TOKEN));
  };

  if (trabajadoresLoading) {
    dispatch(obtenerTrabajadoresActuales(usuario.TOKEN));
    dispatch(obtenerRebajaSemana());
    return <CheckingAuth />;
  }

  const addFields = () => {
      let newfield =
      {
        "lunes": 0,
        "martes": 0,
        "miercoles": 0,
        "jueves": 0,
        "viernes": 0,
        "sabado": 0,
        "total": 0
      }
  
      setFormFields([...formFields, newfield])
      dispatch(addCajuelaSemana([...formFields, newfield], usuario));
  }

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
    dispatch(addCajuelaSemana(data, usuario));
  }

  const RebajasTotalesCalc = (trabajarID) => {
    const RebajasTotales = [];
    rebajas.map((rebaja) => {
      if (RebajasTotales[rebaja.TRABAJADOR_ID]) {
        RebajasTotales[rebaja.TRABAJADOR_ID] = RebajasTotales[rebaja.TRABAJADOR_ID] + Number(rebaja.MONTO_REBAJA);
      } else {
        RebajasTotales[rebaja.TRABAJADOR_ID] = Number(rebaja.MONTO_REBAJA);
      }
    });
    return RebajasTotales[trabajarID] ? RebajasTotales[trabajarID] : 0;
  };

  const obtenerRebajasDescrip = (trabajarID) => {
    let string = "";
    rebajas.map((rebaja, index) => {
      if (rebaja.TRABAJADOR_ID == trabajarID) {
        string = `${string} [ ${rebaja.DESCRIPCION} | ${rebaja.MONTO_REBAJA}]`;
      }
    });
    return (
      <div>
        <Tooltip content={string} trigger="hover">
          <Button className="hover-info-rebajas">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </Button>
        </Tooltip>
      </div>
    );
  };

  return (
    <form onSubmit={submit} autoComplete="off">
      <div className="flex flex-col gap-4">
        <Button.Group className="mb-5">
          <Button onClick={submit} color="success">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
              />
            </svg>
            Guardar Semana
          </Button>
          <Button color="purple">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            <PDFDownloadLink
              document={
                <CajuelasSemana
                  cajuelaSemana={cajuelaSemana}
                  trabajadores={trabajadores}
                  precioActual={precioActual}
                  rebajas={rebajas}
                />
              }
              fileName="somename.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? " Cargando PDF..." : " Imprimir Semana"
              }
            </PDFDownloadLink>
          </Button>
        </Button.Group>
        <h2 className="text-4xl font-extrabold text-blue-600 dark:text-blue-500">
          TOTALES
        </h2>
        <div className="flex flex-row gap-6 dimanic-item-content totales-container">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="small" value="Sabado" />
            </div>
            <TextInput
              name="sabado"
              placeholder="sabado"
              sizing="sm"
              disabled
              value={totales["sabado"]}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="small" value="Lunes" />
            </div>
            <TextInput
              name="lunes"
              placeholder="lunes"
              sizing="sm"
              disabled
              value={totales["lunes"]}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="small" value="Martes" />
            </div>
            <TextInput
              name="martes"
              placeholder="martes"
              sizing="sm"
              disabled
              value={totales["martes"]}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="small" value="Miercoles" />
            </div>
            <TextInput
              name="miercoles"
              placeholder="miercoles"
              sizing="sm"
              disabled
              value={totales["miercoles"]}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="small" value="Jueves" />
            </div>
            <TextInput
              name="jueves"
              placeholder="jueves"
              sizing="sm"
              disabled
              value={totales["jueves"]}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="small" value="Viernes" />
            </div>
            <TextInput
              name="viernes"
              placeholder="viernes"
              sizing="sm"
              disabled
              value={totales["viernes"]}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="small" value="Total Cajuelas" />
            </div>
            <TextInput sizing="sm" disabled value={totales["totalCajuelas"]} />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="small" value="Pago Cajuelas" />
            </div>
            <TextInput
              sizing="sm"
              disabled
              value={`₡ ${new Intl.NumberFormat().format(
                totales["totalCajuelas"] * precioActual
              )}`}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="small" value="Rebajas Totales" />
            </div>
            <TextInput sizing="sm" disabled value={`₡ ${new Intl.NumberFormat().format(totales["totalRebajas"])}`}/>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="small" value="Total Pagar" />
            </div>
            <TextInput
              sizing="sm"
              disabled
              value={`₡ ${new Intl.NumberFormat().format((totales["totalCajuelas"] * precioActual) - totales["totalRebajas"])}`}
            />
          </div>
        </div>

        {formFields.map((form, index) => {
          return (
            <div
              key={index}
              className="flex flex-row gap-6 dimanic-item-content"
            >
              <h2 className="text-4xl font-extrabold text-blue-600 dark:text-blue-500">
                {trabajadores[index].TRABAJADOR_ID}
              </h2>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Sabado" />
                </div>
                <TextInput
                type="number"
                  name="sabado"
                  placeholder="sabado"
                  sizing="sm"
                  onChange={(event) => handleFormChange(event, index)}
                  value={form.sabado}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Lunes" />
                </div>
                <TextInput
                type="number"
                  name="lunes"
                  placeholder="lunes"
                  sizing="sm"
                  onChange={(event) => handleFormChange(event, index)}
                  value={form.lunes}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Martes" />
                </div>
                <TextInput
                type="number"
                  name="martes"
                  placeholder="martes"
                  sizing="sm"
                  onChange={(event) => handleFormChange(event, index)}
                  value={form.martes}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Miercoles" />
                </div>
                <TextInput
                type="number"
                  name="miercoles"
                  placeholder="miercoles"
                  sizing="sm"
                  onChange={(event) => handleFormChange(event, index)}
                  value={form.miercoles}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Jueves" />
                </div>
                <TextInput
                type="number"
                  name="jueves"
                  placeholder="jueves"
                  sizing="sm"
                  onChange={(event) => handleFormChange(event, index)}
                  value={form.jueves}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Viernes" />
                </div>
                <TextInput
                  type="number"
                  name="viernes"
                  placeholder="viernes"
                  sizing="sm"
                  onChange={(event) => handleFormChange(event, index)}
                  value={form.viernes}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Total Cajuelas" />
                </div>
                <TextInput
                  name="total"
                  placeholder="total"
                  sizing="sm"
                  value={form.total}
                  disabled
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Pago Cajuelas" />
                </div>
                <TextInput
                  name="total-pagar"
                  placeholder="total-pagar"
                  sizing="sm"
                  value={`₡ ${new Intl.NumberFormat().format(
                    form.total * precioActual
                  )}`}
                  disabled
                />
              </div>

              <div className="rebajas-total-container">
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Total Rebajas" />
                </div>
                <TextInput
                  name="total-rebajas"
                  placeholder="total-rebajas"
                  sizing="sm"
                  value={`₡ ${new Intl.NumberFormat().format(
                    RebajasTotalesCalc(trabajadores[index].TRABAJADOR_ID)
                  )}`}
                  disabled
                />

                {RebajasTotalesCalc(trabajadores[index].TRABAJADOR_ID) > 0 &&
                  obtenerRebajasDescrip(trabajadores[index].TRABAJADOR_ID)}
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Total Pagar" />
                </div>
                <TextInput
                  name="total-pagar"
                  placeholder="total-pagar"
                  sizing="sm"
                  value={`₡ ${new Intl.NumberFormat().format(
                    Number(form.total * precioActual) -
                      Number(
                        RebajasTotalesCalc(trabajadores[index].TRABAJADOR_ID)
                      )
                  )}`}
                  disabled
                />
              </div>
            </div>
          );
        })}
      </div>
      <Button.Group className="mt-5">
        {/* <Button onClick={addFields} color="success">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              Agregar Nuevo Trabajador
            </Button> */}

            <Button onClick={removeFields} color="failure">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              Remover Trabajador
            </Button>
          </Button.Group>
    </form>
  );
};

{
  /* <PDFViewer width={'100%'} height="600">
<CajuelasSemana cajuelaSemana={ cajuelaSemana } trabajadores={ trabajadores } precioActual={ precioActual }/>
</PDFViewer> */
}
