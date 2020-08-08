<template>
  <div class="step-one">
    <div class="step-one-entry">
        <div class="step-one-entry-item">
          <label >N° de neuronas en la capa de entrada</label>
          <input type="number" min="1" v-model.number="entrada">
        </div>

        <div class="step-one-entry-item">
            <label >N° de neuronas en la capa oculta</label>
            <input type="number" min="1" v-model.number="escondida">
        </div>

        <div class="step-one-entry-item">
            <label >N° de neuronas en la capa de salida</label>
            <input type="number" min="1" v-model.number="salida">
        </div>

        <div class="step-one-entry-item">
            <label >N° de patrones de entrenamiento</label>
            <input type="number" min="1" v-model.number="patrones">
        </div>

        <button>Continuar</button>
    </div>
      
  </div>
</template>

<script>
export default {
    name: 'StepOne',

    data () {
        return {
            entrada: '',
            escondida: '',
            salida: '',
            patrones: '',
        }
    },

    watch: {
        entrada() {
            this.$emit('entradas',this.entrada)
        },
        escondida() {
            this.$emit('escondidas',this.escondida)
        },
        salida() {
            this.$emit('salidas',this.salida)
        },
        patrones() {
            this.$emit('patrones',this.patrones)
        },
    }
}
</script>

<style lang="scss" scoped>
.step-one {
    display: flex;
    justify-content: center;
    height: 100%;

    // background-color: blueviolet;

    &-entry{
        display: inherit;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        height: inherit;
        // outline: yellow 1px solid;
    
        &-item{
            margin-bottom: 10px;

            &> label, &> input {
                font-family: $roboto;
                font-size: 24px;

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
            // &> label {
                
            // }

            &> input {
                height: 40px;
                width: 120px;
                margin-left: 30px;
                text-align: center;
                padding-left: 15px;

                border: 2px $main-color solid;
                border-radius: 5px;
                background-color: transparent;
            }
        }
        &> button {
            height: 50px;
            width: 120px;
            text-align: center;

            border: 2px $main-color solid;
            border-radius: 5px;
            background-color: $main-color;
            cursor: pointer;
            font-family: $roboto;
            font-size: 24px;
            color: white;

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
    }
}
</style>