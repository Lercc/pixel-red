<template>
  <div class="project">

    <div class="space1">
      <div class="space1__container">
        <project-icon class="space1__container-icon" :color="projectIconColor"/>
        <p class="space1__container-title">{{ red ? red.name : '' }}</p>
      </div>
    </div>

    <div class="space2">
      <div class="space2__container">
        <!-- <div class="space2__container-menu" :style="this.showBanner ? 'height:100%' : 'height:40%'"> -->
        <ul class="space2__container-menu">
          <li @click="changeCurrentComponen('one')"  >Paso 1</li>
          <li @click="changeCurrentComponen('two')" >Paso 2</li>
          <li @click="changeCurrentComponen('three')" >Paso 3</li>
          <li @click="changeCurrentComponen('four')" >Paso 4</li>
        </ul>

        <div class="space2__container-content">
          <transition name="fade" mode="in-out">
            <keep-alive>
              <component :is="showComponent" 
              @entradas="(e) => this.numNeurEntrada= e"
              @escondidas="(e) => this.numNeurEscondidas= e"
              @salidas="(e) => this.numNeurSalida= e"
              @patrones="(e) => this.numPatronesEntrenamiento= e"
              @changeComponent="changeCurrentComponen"
              
              :neuro-data="dataToStepTwo"
              />
            </keep-alive>
          </transition>
        </div>

      </div>
    </div>

    <div class="space3">
      <div class="space3__container">
        <p class="space3__container-title">
          {{  this.w.length == 0 ? 'PIXEL-RED' : 'PESOS' }}
        </p>

        <div class="space3__container-paragraph">
          <p v-if="this.w.length == 0 ? true : false"> “Aplicacion que permite realizar aprendizaje artificial de redes neuronales con cualquier número de neuronas en la capa de entrada , capa intermedia(oculta) y capa de salida mediante la <em>red backpropagation.</em>"
          </p>

          <ul >
            <li v-for="(p, index) in calcularPesos" :key="`peso-${index}`">{{ `w${index+1} : ${p.toFixed(3)}` }}</li>
          </ul>

        </div>
      </div>
    </div>

    <div class="space4">
       <div class="space4__container">
        <project-icon class="space4__container-icon" :color="projectIconColor"/>
        <p class="space4__container-title">{{ red ? red.name : '' }}</p>
      </div>
    </div>
    
    <div class="space5">
      <status :home-active="false" 
      :circle-status="circleStatus" 
      :bar-status="barStatus" 
      :message-status="messageStatus" ref="status"

      />
    </div>
  </div>
</template>

<script>
import ToggleIcon from '@/components/ToggleIcon'
import ProjectIcon from '@/components/ProjectIcon'
import Status from '@/components/Status'

import StepOne from '@/components/solution/StepOne'
import StepTwo from '@/components/solution/StepTwo'
import StepThree from '@/components/solution/StepThree'
import StepFour from '@/components/solution/StepFour'

export default {
  name: 'Project',

  components: {
      ProjectIcon,
      Status,
      StepOne,
      StepTwo,
      StepThree,
      StepFour,
  },

  props:{
      red: {
      type: Object,
      default: () => {},
      }
  },

  data() {
      return {
          //
          circleStatus: [true,false,false,false],
          barStatus: [true,false,false,false],
          messageStatus: [true,false,false,false],
          //
          projectIconColor: '#615389',
          currentComponent: 'one',
          //
          numNeurEntrada: '',
          numNeurEscondidas: '',
          numNeurSalida: '',
          numPatronesEntrenamiento: '',
          numPesosTotales: '',
          //
          w: new Array(),
      }
  },

  beforeCreate( ) {
    let id = this.$route.params.id
    this.$emit('preCreated',id) 
  },

  computed: {
      showComponent() {
        return `step-${this.currentComponent}`
      },

      calcularPesos () {
          this.numPesosTotales = this.numNeurEscondidas * (this.numNeurEntrada + this.numNeurSalida)
          this.w = []

          const min = -1/3
          const max = 1/3

          for (var i=0; i<this.numPesosTotales; i++) {
              this.w[i] = Math.random() * (max - min) + min
          }
          return this.w
      },

      dataToStepTwo () {
        let data = {
          numNeurEntrada : this.numNeurEntrada,
          numNeurEscondidas : this.numNeurEscondidas,
          numNeurSalida : this.numNeurSalida,
          numPatronesEntrenamiento : this.numPatronesEntrenamiento,
          w : this.w,
        }

        if (this.currentComponent === 'two') {
          return data
        }
      }


  },

  methods: {
      changeCurrentComponen (toComponent, pcircle, pbar) {

        this.currentComponent = toComponent

        if( pcircle !== undefined && pbar !== undefined) {
          //
          this.$set(this.circleStatus,pcircle,true)
          this.$set(this.barStatus,pbar,true)

          //
          this.$refs.status.circles[pcircle].statusActive = true
          this.$refs.status.circles[pcircle].statusMessageActive = true
          this.$refs.status.circles[pcircle-1].statusMessageActive = false

          this.$refs.status.bars[pbar].statusActive = true

        }
      }

      
  },

  
}
</script>

<style lang="scss" scoped>
.project {
  display: grid;
  grid-template-rows: repeat(6,16.6%);
  grid-template-columns: repeat(4,25%);
  margin: auto;
  padding: 20px;
  width:100%;
  height:100%;
  border-radius: inherit;
  border: 1px brown solid; 
  // border: 1px white solid; 
}
.space1 {
  grid-row: 1/2;
  grid-column: 1/2;
  margin: 0px 10px 10px 0px;
  padding: 20px 25px ;

  border-radius: 30px 3px 3px 3px;
  box-shadow: $shadow-inset-1;

  background-color: $secondary-color-contrast;

  &__container {
    display: flex;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 100%;
    // outline: 1px brown solid; 

    &-icon {
      height: 30px;
      margin-right: 20px ;
    }

    &-title {
      font-family: $roboto;
      font-size: 30px;
      font-weight: 700;
      color: $main-color;
    }
  }

}
.space2 {
  grid-row: 1/6;
  grid-column: 2/5;
  margin: 0px 0px 10px 10px;
  padding: 30px 60px;
  border-radius: 3px 30px 3px 3px;
  box-shadow: $shadow-inset-2;
  background-color: $secondary-color-contrast;

  &__container {
    display: grid;
    grid-template-rows: 10% 90%;
    grid-template-columns: 100%;
    width: 100%;
    height: 100%;
    // outline: 1px brown solid;

    &-menu {
      display: flex;
      justify-content: space-between;
      // outline: 1px blue solid;

      &>li {
        cursor: pointer;
        color: gray;
      }
    }
    
    &-content {
      overflow: hidden;
      // outline: 1px orange solid;
    }
  }
}
.space3 {
  grid-row: 2/6;
  grid-column: 1/2;
  margin: 10px 10px 10px 0px;
  padding: 25px 25px ;
  border-radius: 3px 3px 3px 3px;
  box-shadow: $shadow-inset-1;
  background-color: $secondary-color-contrast;

  &__container {
    width: 100%;
    height: 100%;
  // outline: 1px brown solid;

    &-title {
      padding: 15px 0px 20px;
      font-family: $roboto;
      font-size: 30px;
      font-weight: 700;
      letter-spacing: 1px;
      color: $main-color;

      @include desktop($bp-lg-1) {
        font-size: 26px;
        padding: 0px 0px 5px;
      }
      @include range($bp-lg-1,$bp-lg-2) {
        font-size: 28px;
        padding: 5px 0px 15px;
      }
      @include range($bp-lg-1,1800px) {
        font-size: 28px;
        padding: 0px 0px 15px;
      }
    }
    &-paragraph {
      display: block;
      height: 90%;
      overflow: auto;
      font-family: $roboto;
      font-size: 24px;
      font-style: italic;
      text-align: justify;
      line-height: 160%;
      //  outline: 1px solid pink;

      &> ul {
        column-count: 2;

       @include desktop($bp-lg-1){
        font-size: 16px;
        line-height: 120%;
      }
      @include range($bp-lg-1,$bp-lg-2) {
        font-size: 18px;
        line-height: 130%;
      }
      @include range($bp-lg-2,1800px) {
        font-size: 20px;
        line-height: 140%;
      }

      }
      
      @include desktop($bp-lg-1){
        font-size: 18px;
        line-height: 140%;
      }
      @include range($bp-lg-1,$bp-lg-2) {
        font-size: 20px;
        line-height: 140%;
      }
      @include range($bp-lg-2,1800px) {
        font-size: 22px;
        line-height: 140%;
      }
    }
  }
}
.space4 {
  grid-row: 6/7;
  grid-column: 1/2;
  margin: 10px 10px 0px 0px;

  padding: 20px 30px ;

  border-radius: 3px 3px 3px 30px;
  box-shadow: $shadow-inset-1;

  background-color: $secondary-color-contrast;

  // outline: 1px orange solid;

  &__container {
    display: flex;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 100%;
    // outline: 1px brown solid; 

    &-icon {
      height: 30px;
      margin-right: 20px ;
    }

    &-title {
      font-family: $roboto;
      font-size: 30px;
      font-weight: 700;
      color: $main-color;
    }
  }
}
.space5 {
  grid-row: 6/7;
  grid-column: 2/5;
  margin: 10px 0px 0px 10px;
  display :flex;
  justify-content: center;
  align-items: center;
  // outline: 1px blue solid;
}

//  .component-fade-leave-active {
//   transition: all .45s ease;
//   transform: translateX(100%);
// }
// .component-fade-enter
// /* .component-fade-leave-active below version 2.1.8 */ {
//   opacity: 0;
//   transform: translateX(-100%);

// }
.fade-enter-active, .fade-leave-active{
  transition: all 0.45s;
}
  
.fade-enter, .fade-leave-to{
  opacity: 0;
  transform: translate(-1rem, 0);

}
.fade-enter{
  transform :translate(1rem, 0);

}


</style>