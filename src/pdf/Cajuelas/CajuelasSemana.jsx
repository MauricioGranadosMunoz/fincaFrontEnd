import {
  Page,
  Font,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import MonserratRegularFont from "../../assets/fonts/MontserratRegular.ttf";
import MonserratBoldFont from "../../assets/fonts/MontserratSemiBold.ttf";

// Register Font
Font.register({
  family: "mon-regular",
  src: MonserratRegularFont,
});

Font.register({
  family: "mon-bold",
  src: MonserratBoldFont,
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    padding: "30px",
    fontFamily: "mon-regular",
  },
  totalesBox: {
    borderStyle: "solid",
    borderWidth: "1px",
    padding: "5px",
    marginRight: "10px",
    marginBottom: "10px",
  },
  cajuelaDiaText: {
    fontSize: 12,
  },
  RebajasContainer: {
    borderBottom: "1px solid black",
    marginBottom: "5px",
    paddingBottom: "5px",
  },
  RebajasNumero: {
    fontSize: 12,
    fontFamily: "mon-bold",
  },
  numeroTrabajador: {
    fontFamily: "mon-bold",
    alignSelf: "center",
  },
  boldText: {
    fontFamily: "mon-bold",
  },
});

export const CajuelasSemana = ({
  cajuelaSemana,
  trabajadores,
  precioActual,
  rebajas,
}) => {
  const RebajasTotalesCalc = (trabajarID) => {
    const RebajasTotales = [];
    rebajas.map((rebaja) => {
      if (RebajasTotales[rebaja.TRABAJADOR_ID]) {
        RebajasTotales[rebaja.TRABAJADOR_ID] =
          RebajasTotales[rebaja.TRABAJADOR_ID] + Number(rebaja.MONTO_REBAJA);
      } else {
        RebajasTotales[rebaja.TRABAJADOR_ID] = Number(rebaja.MONTO_REBAJA);
      }
    });
    return RebajasTotales[trabajarID] ? RebajasTotales[trabajarID] : 0;
  };

  const obtenerRebajasDescrip = (trabajarID) => {
    return (
      <View style={styles.RebajasContainer}>
        <Text style={styles.RebajasNumero}>Rebajas</Text>
        {rebajas.map(
          (rebaja, index) =>
            rebaja.TRABAJADOR_ID == trabajarID && (
              <Text key={index} style={styles.cajuelaDiaText}>
                - {rebaja.DESCRIPCION} | ₡{rebaja.MONTO_REBAJA}
              </Text>
            )
        )}
      </View>
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {JSON.parse(cajuelaSemana.CAJUELAS_JSON_SEMANA).map(
          ({ total }, index) => (
            <View style={styles.totalesBox} key={index}>
              <Text style={styles.numeroTrabajador}>
                {trabajadores[index].TRABAJADOR_ID}
              </Text>
              {RebajasTotalesCalc(trabajadores[index].TRABAJADOR_ID) > 0 &&
                obtenerRebajasDescrip(trabajadores[index].TRABAJADOR_ID)}
              <Text style={styles.cajuelaDiaText}>
                Total Cajuelas: <Text style={styles.boldText}>{total}</Text>
              </Text>

              {RebajasTotalesCalc(trabajadores[index].TRABAJADOR_ID) > 0 && (
                <Text style={styles.cajuelaDiaText}>
                  Total Reducciones:{" "}
                  <Text style={styles.boldText}>
                    ₡{RebajasTotalesCalc(trabajadores[index].TRABAJADOR_ID)}
                  </Text>
                </Text>
              )}
              <Text style={styles.cajuelaDiaText}>
                Total a pagar:{" "}
                <Text style={styles.boldText}>
                  ₡
                  {new Intl.NumberFormat().format(
                    total * precioActual -
                      Number(
                        RebajasTotalesCalc(trabajadores[index].TRABAJADOR_ID)
                      )
                  )}
                </Text>
              </Text>
            </View>
          )
        )}
      </Page>
    </Document>
  );
};
