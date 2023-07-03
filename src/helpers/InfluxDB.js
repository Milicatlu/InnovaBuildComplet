import axios from "axios";
import { url, portInflux } from "./Config";
// import { ForceTouchGestureHandler } from "react-native-gesture-handler"
// import { Double } from "react-native/Libraries/Types/CodegenTypes"z
const filtrarDataYOptimizar = (data) => {
  if (data) {
    var ratio = 1; //ratio es cada cuantos datos hay 1 que pasa (si es 3, 2 datos se descartan y el tercero se mete en dataFiltrada)
    while (data.length / ratio > 25) {
      //la idea es no mostrar mas de 50 datos (cambiable)
      ratio++;
    }
    //console.log("filtrarData:data \n", data)
    const dataFiltrada = [];
    let contador = ratio; //inicia asi para que siempre el primero se cuente
    data.forEach((e) => {
      if (contador == ratio) {
        contador = 0;
        dataFiltrada.push(e._value);
      }
      contador++;
    });
    //console.log("filtrarData:dataFiltrada \n", dataFiltrada)
    return dataFiltrada;
  } else return null;
  //     {try {
  //         throw new Error(
  //             "filtrarData recivio un array nulo, se retorno un array vacio"
  //         )
  //     } catch (err) {
  //         console.log(err)
  //     }
  //     return null
  // }
};
const filtrarData = (data) => {
  const dataFiltrada = [];
  data.forEach((e) => {
    dataFiltrada.push(e._value);
  });
  return dataFiltrada;
};
export class InfluxDBHelper {
  static async getLastPoint(body) {
    let out = {
      value: 0,
      error: {
        state: true,
        message: "unknown error",
      },
    };
    await axios
      .post(url + portInflux + "api/sensor", body)
      .then(({ data }) => {
        if (data.data) {
          out.value = data.data._value;
          out.error = { state: false, message: "" };
        } else {
          out.error = { state: true, message: "Bad request" };
        }
      })
      .catch((err) => {
        out.error = {
          state: true,
          message: "error al conectarse al servidor de InfluxDB",
        };
        console.log(err);
        console.log(out.error);
      });
    return out;
  }

  static async getPoints(body) {
    let out = {
      values: [],
      error: {
        state: true,
        message: "unknown error",
      },
    };

    await axios
      .post(url + portInflux + "api/sensors", body)
      .then(({ data }) => {
        if (data) {
          out.values = filtrarDataYOptimizar(data.data);
          out.error = { state: false, message: "" };
        } else {
          out.error = { state: true, message: "" };
        }
      })
      .catch((err) => {
        out.error = {
          state: true,
          message: "error al conectarse al servidor de InfluxDB",
        };
        console.log(err);
        console.log(out.error);
      });
    return out;
  }

  static async getPointsValueAndTime(body) {
    const filtrarValorYFecha = (data) => {
      if (data) {
        let out = [];
        data.forEach((e) => {
          out.push({ valor: e._value, fecha: e._time });
        });
        return out;
      } else {
        return [];
      }
    };

    let out = {
      values: [],
      error: {
        state: true,
        message: "unknown error",
      },
    };

    await axios
      .post(url + portInflux + "api/sensors", body)
      .then(({ data }) => {
        if (data) {
          out.values = filtrarValorYFecha(data.data);
          out.error = { state: false, message: "" };
        } else {
          out.error = { state: true, message: "" };
        }
        console.log(data);
      })
      .catch((err) => {
        out.error = {
          state: true,
          message: "error al conectarse al servidor de InfluxDB",
        };
        console.log(err);
        console.log(out.error);
      });
    return out;
  }
}

/*
const url = 'https://us-east-1-1.aws.cloud2.influxdata.com'
const token = 'cdyYwmijKNohDsgfwnA0xNZgFWadTvqrCs4UqgUB2PqO2O7sIvu7IaHU7AnHJQiGMAh-taEEdEic9Xpn9XqhtA=='
const org = 'TryTram'
const bucket = 'Testing'

export const influxDB = new InfluxDB({ url, token })
export const queryApi = new InfluxDB({url, token}).getQueryApi(org)

export const fluxQueryLast = 'from(bucket:"Testing") |> range(start: 0) |> filter(fn: (r) => r._measurement == "Agricultura") |> last()'
export const fluxQuery = 'from(bucket:"Testing") |> range(start: 0) |> filter(fn: (r) => r._measurement == "Agricultura")'

*/
