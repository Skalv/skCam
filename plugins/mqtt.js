import Vue from "vue"
import VueMqtt from "vue-mqtt"

Vue.use(VueMqtt, "mqtt://192.168.8.108:1884", {
  clientId: "WebClient-" + parseInt(Math.random() * 100000)
})
// client.on("connect", function () {
//   console.log("Client MQTT connected !")
//   client.subscribe("welcome")
// })

// const myMQTT = {
//   createPlugin: (store) => {
//     return (store) => {
//       client.on("message", (topic, message) => {
//         const datas = JSON.parse(message.toString())
//         if (topic === "welcome") {
//           if (datas.command === "newCam") {
//             store.dispatch("cameras/save", {
//               name: datas.name,
//               ip: datas.ip
//             })
//           }
//         }
//         // store.commit("receiveData", data)
//       })
//       // store.subscribe((mutation) => {
//       //   if (mutation.type === "UPDATE_DATA") {
//       //     client.emit("update", mutation.payload)
//       //   }
//       // })
//     }
//   }
// }

// export default myMQTT
// return (store) => {
//   client.on("message", (topic, message) => {
//     console.log(message.toString())
//     // store.commit("receiveData", data)
//   })
//   console.log(store)
//   // store.subscribe((mutation) => {
//   //   if (mutation.type === "UPDATE_DATA") {
//   //     client.emit("update", mutation.payload)
//   //   }
//   // })
// }
