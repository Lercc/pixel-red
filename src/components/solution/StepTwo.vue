<template>
  <div class="step-two">
    <div class="step-two-container">
      <table class="step-two-container-table">

        <thead>
          <tr>
            <th :colspan="neuroData.numNeurEntrada" >Entradas</th>
            <th></th>
            <th :colspan="neuroData.numNeurSalida" >Salidas</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(patron,patronIndex) in neuroData.numPatronesEntrenamiento" :key="`patron${patronIndex}`" >
            <td v-for="(entrada,entradaIndex) in x[patronIndex]" :key="`entrada${entradaIndex}`" 
            class="step-two-container-table--entrada">
              <input type="number" v-model.number="x[patronIndex][entradaIndex]" >
            </td>
            <td></td>
            <td v-for="(salida,salidaIndex) in d[patronIndex]" :key="`salida${salidaIndex}`" class="step-two-container-table--salida" >
              <input type="number" v-model.number="d[patronIndex][salidaIndex]" >
            </td>
          </tr>
        </tbody>

      </table>
    </div>

    <div class="step-two-actions">
      <input class="step-two-actions-iteration" placeholder="N° de  iteraciones" type="number"
        :disabled="btonTrain" v-model.number="iteraciones"
        :style="btonTrain ? `border-color: grey;background-color: lightgrey; color: gray` : ''">

      <button class="step-two-actions-button" @click="toTrain" :disabled="btonTrain" 
        v-show="this.iteraciones ? true : false"
        :style="btonTrain ? `border-color: grey;background-color: lightgrey; color: gray` : ''"
        >Entrenar</button>
    </div>

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
      btonTrain: false,
      aaa: [0],
      //
      x: new Array(),
      d: new Array(),
      iteraciones:'',
    }
  },

  beforeMount () {
    this.x = []
    this.d = []

    for (let i=0; i<this.neuroData.numPatronesEntrenamiento; i++) {
      
      this.x[i] = new Array()
      for(let j=0; j<this.neuroData.numNeurEntrada; j++) {
          this.x[i][j] = 0
      }

      this.d[i] = new Array()
      for(let j=0; j<this.neuroData.numNeurSalida; j++) {
          this.d[i][j] = 0
      }
    }
  },

  methods: {
    toTrain () {
      this.btonTrain = true 
      this.$emit('changeComponent','three',2, 2)
      this.$emit('dataToStepThree',this.x,this.d, this.iteraciones)
      
    }
  },
}
</script>

<style lang="scss" scoped>
.step-two {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;

  &-container {
    width: 100%;
    max-height: 75%;
    overflow: auto;

    &-table {
      width: auto;
      margin: 0 auto;
      border-collapse: collapse;

      & tr {
        background-color: rgba(gray,0);
      }

      & tr:hover {
        background-color: rgba(gray,0.1);
      }
      
      & th, & td {
        max-width: 40px;
        min-width: 40px;
        height: 30px;
      }

      & th {
        font-family: $roboto;
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 1px;
        text-align: center;

        &:last-child {
          color: $main-color;
        }
        @include desktop($bp-lg-1) {
          font-size: 16px;
        }
        @include range($bp-lg-1,$bp-lg-2) {
          font-size: 18px;
        }
        @include range($bp-lg-1,1800px) {
          font-size: 20px;
        }
      }

      & input {
        width: 100%;
        height: 100%;
        border-radius: 3px;
        background-color: transparent;
        font-family: $roboto;
        text-align: center;
        border: none;
      }
      //input entrada
      &--entrada>input {
        border: 0px black solid;
      }
      &--entrada>input:hover{
        border: 2px rgba(black,.35) solid;
      }
      &--entrada>input:focus{
        border: 2px black solid;
        outline: none;
      }

      //input salida
      &--salida>input {
        font-weight: 700;
        border: 0px $main-color solid;
        color: $main-color;
      }
      &--salida>input:hover {
        border: 2px rgba($main-color,.35) solid;
        color: $main-color;
      }
      &--salida>input:focus {
        border: 2px $main-color solid;
        outline: none;
        color: $main-color;
      }
    }

  }

  &-actions {
    align-self: center;


    &-iteration, &-button {
      height: 50px;
      text-align: center;
      border: 2px $main-color solid;
      border-radius: 5px;

      font-family: $roboto;
      font-size: 24px;
      color: white;
      box-shadow: $shadow-primary;
      transition: all .25s ease-in-out;
  
      @include desktop($bp-lg-1){
          font-size: 18px;
          line-height: 140%;
      }
      @include range($bp-lg-1,$bp-lg-2) {
          font-size: 18px;
          line-height: 140%;
      }
      @include range($bp-lg-2,1800px) {
          font-size: 22px;
          line-height: 140%;
      }
    }

    &-iteration {
      width: 180px;
      color: $main-color;
      background-color: transparent;
    }
    &-iteration::placeholder {
      color: $main-color;
    }

    &-button {
      width: 120px;
      margin-left: 20px;
      color: white;
      background-color: $main-color;
      cursor: pointer;
     
    }
    &-button:hover {
      background-color: $status-color-contrast;
      border: 2px $status-color-contrast solid;
    }
  }
}
</style>