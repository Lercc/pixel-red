<template>
  <div class="step-two">
    <table>

      <thead>
        <tr>
          <th :colspan="neuroData.numNeuEntrada" >Entradas</th>
          <th :colspan="neuroData.numNeuSalida" >Salidas</th>
        </tr>
      </thead>

      <tbody>
        <!-- <tr v-for="patron in neuroData.numPatronesEntrenamiento" :key="`patron${patron}`" >
          <td v-for="entrada in neuroData.numNeuEntrada" :key="`entrada${entrada}`" >
            <input type="numher" v-model.number="" >
          </td>
        </tr> -->
      </tbody>

    </table>
  </div>
</template>


<script>
export default {
    name: 'StepTwo',

    props: {
      neuroData: {
        type: Object,
        default: () => {}
      }
    },

    data () {
      return {
        x: new Array(),
        d: new Array(),
      }
    },

    beforeMount () {
      this.x = []
      this.d = []

      
    }

}
</script>

<style lang="scss" scoped>
.step-two {
    height: 100%;
    background-color: green;
}
</style>