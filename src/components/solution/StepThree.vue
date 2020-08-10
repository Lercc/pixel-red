<template>
  <div class="step-three">
    <h2 @click="entrenar">Entrenando ...</h2>
  </div>
</template>

<script>
export default {
  name: 'StepThree',

  props: {
    paternData: {
      type:Object,
      default: () => {}
    },
    neuroData: {
      type:Object,
      default: () => {}
    }
  },

  data() {
    return {
      w: new Array(),
      //
      Y2: new Array(),    // array para las salidas de las neuronas ocultas
      Y3: new Array(),    // array para las salidas de las neuronas de salida
      //
      net2: new Array(),   // array para las entradas netas de las neuronas ocultas
      net3: new Array(),   // array para las entradas netas de las neuronas de salida
      //
      delta2: new Array(), // array para los errores de las neuronas ocultas
      delta3: new Array(), // array para los errores de las neuronas de salida
      //
      alfa: 0.2,              //valor de alfa
    }
  },

  beforeMount() {
    this.w = this.neuroData.w.map(r => r)
    console.log('terminado')
    setTimeout(this.entrenar,1000)
  },

  methods: {
    entrenar() {
      // for para entrenamiento de "i" iteraciones
      for(let i=0; i<this.paternData.numIteraciones; i++){
        /**
         * 
         * Paso 2 : Presentar patron de entrada y salida deseada 
         * 
         * */
        // define el patrone "n-esimo" : (entrada-n-esima + salida-n-esima) 
        for(let n=0; n<this.neuroData.numPatronesEntrenamiento; n++) {
            
          let X = Array()     //array de patron de entrada por iteracion
          let D = Array()     //array de patron de salida deseada por iteracion
        
          //define de manera general el patron 
          //define los "valores de entrada" del patron n-esimo
          for(let i=0; i<this.neuroData.numNeurEntrada; i++) {
              X[i] = this.paternData.x[n][i]
          }
          
          //define los valores de salidad deseada del patron n-esimo
          for(let i=0; i<this.neuroData.numNeurSalida; i++){
              D[i] = this.paternData.d[n][i]
          }
          
          //De modo que en cada iteracion quedaria: AND
          /**  primera iteracion  X[0]=1   X[1]=1 */  /**  D[0]=1 */
          /**  segunda iteracion  X[0]=0   X[1]=1 */  /**  D[0]=0 */
          /**  tercera iteracion  X[0]=1   X[1]=0 */  /**  D[0]=0 */
          /**  cuarta iteracion   X[0]=0   X[1]=0 */  /**  D[0]=0 */
          

          /** 
           * 
           * Paso 3 : CALCULAR LAS ENTRADAS NETAS Y SALIDAS DE LAS NEURONAS 
           * 
           * */

          //(3.i): CALCULAR LAS ENTRADAS NETAS DE LAS NEURONAS OCULTAS(N.O.)
              //La cantidad de entradas netas es la misma cantidad de N.O.
          for(let i=0; i<this.neuroData.numNeurEscondidas; i++) {
              
              var indicePeso = i
              this.net2[i]=0

              for(let j=0; j<this.neuroData.numNeurEntrada; j++) {
                  this.net2[i] += this.w[indicePeso] * X[j]
                  indicePeso += this.neuroData.numNeurEscondidas
              }
          }
              /**
                  * recordando que los valores netos son calculados
                  * a partir de la sumatoria de los pesos(w) por su respectiva entrada(X)
                  * net(H) = Σ(w * x) 
                  * 
                  * ejemplo  de 3 entradas y 2 ocultas
                  * 
                  *  net2[1] =  w[1] * x[1]
                  *              |    |
                  *      +indicePeso  +j
                  *              |    |
                  *  net2[1] += w[3] * x[2]
                  *              |    |
                  *      +indicePeso  +j
                  *              |    |
                  *  net2[1] += w[5]} * x[3]
                  * 
                  * ///////////////////////////
                  * 
                  * net2[2] =  w[2] * x[1]
                  *              |    |
                  *      +indicePeso  +j
                  *              |    |
                  *  net2[2] += w[4] * x[2]
                  *              |    |
                  *      +indicePeso  +j
                  *              |    |
                  *  net2[2] += w[6]} * x[3]
                  * 
                */

          //(3.ii): CALCULAR LAS SALIDAS(Y2) DE LAS NEURONAS OCULTAS(N.O.)
              //La cantidad de salidas es la misma cantidad de N.O.
              // y=1/1+e-x
              //
          for(let i=0; i<this.neuroData.numNeurEscondidas; i++) {
              this.Y2[i] = 1 / (1 + Math.exp(-(this.net2[i])))
          }

          //(3.iii): CALCULAR LAS ENTRADAS NETAS Y SALIDAS DE LAS NEURONAS 
          //            DE LA CAPA DE SALIDA
          for(let i=0; i<this.neuroData.numNeurSalida; i++) {
              
              var indicePesoOculto = i+ (this.neuroData.numNeurEntrada*this.neuroData.numNeurEscondidas)
              this.net3[i]=0

              for(let j=0; j<this.neuroData.numNeurEscondidas; j++) {
                  this.net3[i] += this.w[indicePesoOculto] * this.Y2[j]
                  indicePesoOculto += this.neuroData.numNeurSalida
              }
          }
          for(let i=0; i<this.neuroData.numNeurSalida; i++) {
              this.Y3[i] = 1 / (1 + Math.exp(-(this.net3[i])))
          }

          /**
           * 
           * Paso 4 : CALCULAR LOS TÉRMINOS DE ERROR PARA  TODAS LAS NEURONAS
           * 
           */
          
          //(4.i): términos de error para las neuronas de salida 
          for(let i=0; i<this.neuroData.numNeurSalida; i++) {
              this.delta3[i] = (D[i] - this.Y3[i]) * this.Y3[i] * (1 - this.Y3[i])
          }

          //(4.ii): términos de error para las neuronas ocultas
          //delta2[n]: Y2n* (1-Y2n)*(d31*w1 + d32*w2 +.... + d3n*wn)
          
          var indicePesoOcultoDos = 0 + (this.neuroData.numNeurEntrada*this.neuroData.numNeurEscondidas)
          for(let i=0; i<this.neuroData.numNeurEscondidas; i++) {
              
              var sumatoriaDeltaXpeso = 0

              for(let j=0; j<this.neuroData.numNeurSalida; j++) {
                  sumatoriaDeltaXpeso += this.delta3[j] * this.w[indicePesoOcultoDos]
                  indicePesoOcultoDos++
              }

              this.delta2[i] = this.Y2[i] * (1 - this.Y2[i]) * (sumatoriaDeltaXpeso)
          }

            /**
           * 
           * Paso 5 : ACTUALIZAR LOS PESOS
           * 
           */

          //(5.i): actualizar los pesos que van de la capa de entrada(i) a la capa oculta (j)
          // W[] = w[] + (alfa * delta3[n] * Y2[n]
          var indexP = 0;
          for(let i=0; i<this.neuroData.numNeurEntrada; i++) {

            for(let j=0; j<this.neuroData.numNeurEscondidas; j++) {
                this.w[indexP] += this.alfa * this.delta2[j] * X[i]
                this.$set(this.w,indexP,this.w[indexP])
                indexP++
            }
          }

          //(5.ii): actualizar los pesos que van de la capa oculta(j) a la capa de salida (k)
          for(let i=0; i<this.neuroData.numNeurEscondidas; i++) {

            for(let j=0; j<this.neuroData.numNeurSalida; j++) {
                this.w[indexP] += this.alfa * this.delta3[j] * this.Y2[i]
                this.$set(this.w,indexP,this.w[indexP])
                indexP++
            }
          }
        }
      } //fin

      console.log('temindao2')
      this.$emit('dataToStepFour',this.w)
      setTimeout(this.changeStep,3000)
    },

    changeStep(){
        this.$emit('changeComponent','four',3, 3)
    }
  }
}
</script>

<style lang="scss" scoped>
.step-three {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: orange;

    &>h2 {
      font-size: 40px;
      color: $main-color;
    }
}
</style>