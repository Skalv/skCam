<template>
  <div class="col-2">
    <h2>Mes caméras</h2>
    <div>
      <b-button v-b-modal.addNewCam>Ajouter une camera</b-button>

      <b-modal id="addNewCam" title="Ajouter une nouvelle camera">
        <div
          v-if="errors"
          class="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {{ errors }}
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div ref="newCamForm" class="form" @submit="addNewCam">
          <div class="form-group">
            <label for="name">Nom de la camera</label>
            <input
              id="name"
              v-model="newCamData.name"
              class="form-control"
              type="text"
              name="name"
              required
            />
          </div>
          <div class="form-group">
            <label for="ip">Ip de la camera</label>
            <input
              id="ip"
              v-model="newCamData.ip"
              class="form-control"
              type="text"
              name="ip"
              required
            />
          </div>
        </div>

        <template #modal-footer="{ cancel }">
          <b-button size="sm" variant="danger" @click="cancel()">
            Annuler
          </b-button>
          <b-button
            size="sm"
            variant="success"
            type="submit"
            @click="addNewCam"
          >
            Ajouter
          </b-button>
        </template>
      </b-modal>
    </div>
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
</template>

<script>
export default {
  data() {
    return {
      errors: null,
      newCamData: {
        name: null,
        ip: null
      }
    }
  },
  methods: {
    addNewCam() {
      this.errors = null

      if (!this.newCamData.name || !this.newCamData.ip) {
        this.errors = "Merci d'indiquer un nom et une adresse IP."
      }

      this.$store.commit("cameras/add", {
        name: this.newCamData.name,
        ip: this.newCamData.ip
      })

      this.$bvModal.hide("addNewCam")
    }
  }
}
</script>
