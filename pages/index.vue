<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2">
        <h2>sidebar</h2>
      </div>
      <div v-if="currentCam" class="col video">
        <h1>{{ currentCam.name }}</h1>
        <img
          :src="`http://${currentCam.ip}:81/stream`"
          alt="Flux vidéo de la caméra"
          class="stream"
        />
      </div>
      <div v-else class="col">
        <h1>aucune camera !</h1>
      </div>
      <div class="col-2">
        <ul>
          <li
            v-for="camera in cameras"
            :key="camera.name"
            @click="switchCam(camera)"
          >
            {{ camera.name }}
          </li>
        </ul>
      </div>
    </div>
    <div class="row controls">
      <div class="col-6">
        <label for="range-1">Rotation X</label>
        <b-form-input id="rotate_x" v-model="pos_x" type="range" min="0" max="180"></b-form-input>
        <button @click="pos_x = +pos_x - 10">-</button>
        <button @click="pos_x = +pos_x + 10">+</button>
        <div class="mt-2">Value X: {{ pos_x }}</div>
      </div>
      <div class="col-6">
        <label for="range-1">Rotation Y</label>
        <b-form-input id="rotate_y" v-model="pos_y" type="range" min="0" max="180"></b-form-input>
        <button @click="pos_y = +pos_y - 10">-</button>
        <button @click="pos_y = +pos_y + 10">+</button>
        <div class="mt-2">Value Y: {{ pos_y }}</div>
      </div>
    </div>
  </div>
</template>

<script>
const _ = require("lodash")

export default {
  data() {
    return {
      cameras: [],
      currentCam: null,
      pos_x: 0,
      pos_y: 0
    }
  },
  watch: {
    pos_x() {
      this.debounceRotateX()
    },
    pos_y() {
      this.debounceRotateY()
    }
  },
  created() {
    this.debounceRotateX = _.debounce(this.rotateX, 500)
    this.debounceRotateY = _.debounce(this.rotateY, 500)
  },
  mounted() {
    this.$mqtt.on("connect", () => {
      console.log("MQTT connected !")
    })
    this.$mqtt.on("error", (err) => {
      console.error("MQTT Failed : ", err)
    })

    this.$mqtt.subscribe("welcome")
    this.$mqtt.on("message", (topic, message) => {
      this.handleMsg(topic, JSON.parse(message.toString()))
    })

    this.$mqtt.publish(
      "welcome",
      JSON.stringify({
        command: "fetchAll"
      })
    )
  },
  methods: {
    handleMsg(topic, datas) {
      switch (topic) {
        case "welcome":
          if (datas.command === "newCam") {
            this.addNewCam(datas.name, datas.ip)
          }
      }
    },
    switchCam(camera) {
      this.currentCam = camera
    },
    addNewCam(name, ip) {
      if (_.findIndex(this.cameras, ["ip", ip]) !== -1) return

      this.cameras.push({
        name,
        ip
      })

      if (!this.currentCam) {
        this.currentCam = this.cameras[0]
      }
    },
    rotateX() {
      console.log('rotate X', this.pos_x)
      this.$axios.$get(`http://${this.currentCam.ip}/control?var=rotate_x&val=${this.pos_x}`)
    },
    rotateY() {
      this.$axios.$get(`http://${this.currentCam.ip}/control?var=rotate_y&val=${this.pos_y}`)
    }
  }
}
</script>
