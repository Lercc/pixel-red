<template>
  <div class="step-four">
    <div class="step-four-entrada">
      <table class="step-four-entrada-table">
        <thead>
          <tr>
            <th :colspan="neuroData.numNeurEntrada" >Entradas</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="(te,testEntradaIndex) in entrada" :key="`te-${testEntradaIndex}`" class="step-four-entrada-table--entrada">
              <input type="number" v-model.number="entrada[testEntradaIndex]" >
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="step-four-actions">
      <button class="step-four-actions-button" @click="test" >Probar</button>
    </div>

    <div class="step-four-salida">
      <table class="step-four-salida-table">
        <thead>
          <tr>
            <th :colspan="neuroData.numNeurSalida" >Salidas</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="(ts,TestSalidaIndex) in salida" :key="`ts-${TestSalidaIndex}`" class="step-four-salida-table--salida" >
              <input type="number" :value="salida[TestSalidaIndex]" disabled>
            </td>
          </tr>

          <tr>
            <td v-for="(y,yIndex) in Y3" :key="`y-${yIndex}`" class="step-four-salida-table--salida" >
              <input type="text" :value="y | fixed"  @click="sentValue(y)">
            </td>
          </tr>
        </tbody>

      </table>
    </div>

  </div>
</template>

<script>
export default {
  name: 'StepFour', 

  props: {
    neuroData: {
      type: Object,
      default: () => {},
    },
    testData: {
      type: Object,
      default: () => {},
    }
  },

  data () {
    return {
      salida: new Array(),
      entrada: new Array(),
      Y2: new Array(),    
      Y3: new Array(),
      net2: new Array(),  
      net3: new Array(),   
    }
  },

  beforeMount () {

    for(let i=0; i<this.neuroData.numNeurEntrada; i++) {
        this.entrada[i] = 0
    }

    for(let i=0; i<this.neuroData.numNeurSalida; i++) {
        this.salida[i] = ''
        this.Y3[i] = ''
    }
  },

  methods: {
    test () {
      for(let i=0; i<this.neuroData.numNeurEscondidas; i++) {
        var indicePeso = i
        this.net2[i]=0

        for(let j=0; j<this.neuroData.numNeurEntrada; j++) {
            this.net2[i] += this.testData.pesos[indicePeso] * this.entrada[j]
            indicePeso += this.neuroData.numNeurEscondidas
        }

      }
      //CALCULAR LAS SALIDAS(Y2) DE LAS NEURONAS OCULTAS(N.O.)
      for(let i=0; i<this.neuroData.numNeurEscondidas; i++) {
          this.Y2[i] = 1 / (1 + Math.exp(-(this.net2[i])))
      }

      //(3.iii): CALCULAR LAS ENTRADAS NETAS Y SALIDAS DE LAS NEURONAS 
      //            DE LA CAPA DE SALIDA
      for(let i=0; i<this.neuroData.numNeurSalida; i++) {
          
          var indicePesoOculto = i+ (this.neuroData.numNeurEntrada*this.neuroData.numNeurEscondidas)
          this.net3[i]=0

          for(let j=0; j<this.neuroData.numNeurEscondidas; j++) {
              this.net3[i] += this.testData.pesos[indicePesoOculto] * this.Y2[j]
              indicePesoOculto += this.neuroData.numNeurSalida
          }
      }
      for(let i=0; i<this.neuroData.numNeurSalida; i++) {
          // this.Y3[i] = 1 / (1 + Math.exp(-(this.net3[i])))
          let y3 = 1 / (1 + Math.exp(-(this.net3[i])))
          this.$set(this.Y3, i, y3 )
      }
      
      for(let i=0; i<this.neuroData.numNeurSalida; i++) {
          if(this.Y3[i]>=0.89) {
              this.salida[i] = 1
          } else {
              this.salida[i] = 0
          }
      }
    },

    sentValue (value) {
      this.$emit('showOutputValue',value)
    },

  }

}
</script>

<style lang="scss" scoped>
.step-four {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;

  &-entrada {
    width: 100%;
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
        max-width: 50px;
        min-width: 50px;
        height: 30px;
      }

      & th {
        height: 40px;
        font-family: $roboto;
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 1px;
        text-align: center;

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
        border: 1px rgba(black,.25) solid;
      }
      &--entrada>input:hover{
        border: 2px rgba(black,.5) solid;
      }
      &--entrada>input:focus{
        border: 2px black solid;
        outline: none;
      }
    }
  }

  &-actions {
    align-self: center;

    &-button {
      height: 40px;
      width: 100px;
      border-radius: 5px;
      border: 2px $main-color solid;
      color: white;
      text-align: center;
      font-family: $roboto;
      font-size: 24px;
      color: white;
      cursor: pointer;
      box-shadow: $shadow-primary;
      background-color: $main-color;
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

    &-button:hover {
      background-color: $status-color-contrast;
      border: 2px $status-color-contrast solid;
    }
  }

  &-salida {
    width: 100%;
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
        max-width: 70px;
        min-width: 70px;
        height: 30px;
      }

      & th {
        height: 40px;
        font-family: $roboto;
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 1px;
        text-align: center;
        color: $main-color;

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
      //input salida
      &--salida>input {
        font-weight: 700;
        border: 1px rgba($main-color,.25) solid;
        color: $main-color;
      }
      &--salida>input:hover {
        border: 2px rgba($main-color,.5) solid;
        color: $main-color;
      }
      &--salida>input:focus {
        border: 2px $main-color solid;
        outline: none;
        color: $main-color;
      }
      &--salida>input {
        font-weight: 700;
        border: 1px rgba($main-color,.25) solid;
        color: $main-color;
      }     
    }

  }

}
</style>