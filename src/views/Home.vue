<template>
  <div class="home">

    <div class="space1">
      <div class="space1__container">
        <home-icon class="space1__container-icon" :color="homeIconColor"/>
        <p class="space1__container-title">Home</p>
      </div>
    </div>

    <div class="space2">
      <div class="space2__container">

        <div class="space2__container-banner" :style="this.showBanner ? 'height:100%' : 'height:40%' " @click="toggleBanner">
          <h1 class="space2__container-banner-title">
            RED BACKPROPAGATION
            <span class="space2__container-banner-title-btn">
              <toggle-icon class="space2__container-banner-title-btn-svg" :color="toggleIconColor" 
              :style="this.showBanner ? `transform: rotate(180deg)` :`transform: rotate(0deg)`"/>
            </span>
          </h1>
          <video class="space2__container-banner-video" src="../assets/img/ia.mp4" autoplay muted loop></video>
          <img class="space2__container-banner-image" src="../assets/img/screen.webp">
        </div>

        <div class="space2__container-paragraph" :style="this.showBanner ? `height:0%; opacity;0` : `height:60%;opacity:0.8`">
          <p>El proceso de aprendizaje en la red backpropagation se realiza mediante el aprendizaje supervisado, lo cual quiere decir que la red neuronal necesita de un conjunto patrones de entrenamiento que definen la entrada y salida deseada. Con cada patron de entrenamiento se realiza el cálculo respectivo en cada una de las capas de la red neuronal con el objetivo de encontrar el valor del error de las salidas, para luego propagar el error hacia atrás(de la capa de salida hacia la capa oculta) con el fin de recalcular el valor de los pesos de conexion de las neuronas para que en la siguiente iteración de aprendizaje el valor del error disminuya y así el valor de las salidas sean mas cercanas al valor de la salida deseada del patron.
          </p>
        </div>

      </div>
    </div>

    <div class="space3">
      <div class="space3__container">
        <p class="space3__container-title">
          PIXEL-RED
        </p>

        <p class="space3__container-paragraph">
          “Aplicacion que permite realizar aprendizaje artificial de redes neuronales con cualquier número de neuronas en la capa de entrada , capa intermedia(oculta) y capa de salida mediante la <em>red backpropagation.</em>"
        </p>
      </div>
    </div>

    <div class="space4">
      <button class="space4__button" @mouseover="changeStateButton" @mouseout="changeStateButtonDos">
        <project-icon class="space4__button-icon" v-if="showButton" :color="projectIconColor"/>
        <project-icon class="space4__button-icon" v-else :color="'#ffffff'"/>
        <p class="space4__button-text" :color="projectIconColor">NUEVO PROYECTO</p>
      </button>
    </div>
    
    <div class="space5">
      <status :home-active="true"/>
    </div>
  </div>
</template>

<script>
import HomeIcon from '@/components/HomeIcon'
import ToggleIcon from '@/components/ToggleIcon'
import ProjectIcon from '@/components/ProjectIcon'
import Status from '@/components/Status'

export default {
  name: 'Home',

  components: {
    HomeIcon,
    ToggleIcon,
    ProjectIcon,
    Status,
  },

  data() {
    return {
      homeIconColor: '#615389',
      projectIconColor: '#615389',
      showBanner: false,
      showButton: true,
    }
  },

  methods: {
    toggleBanner () {
      this.showBanner = !this.showBanner
    },

    changeStateButton() {
      this.showButton = false
    },

    changeStateButtonDos() {
      this.showButton = true
    }
  },

  computed: {
    toggleIconColor() {
      if (this.showBanner) {
        return '#ffffff'
      }
      return '#F197DD'
    }
  }
  
}
</script>

<style lang="scss" scoped>
.home {
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
  padding: 20px 30px ;

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
    width: 100%;
    height: 100%;
    // outline: 1px brown solid;
  
    &-banner {
      position: relative;
      width: 100%;
      overflow: hidden;
      border-radius: 25px;
      transition: all .45s ease-in-out;
      box-shadow: $shadow-primary;
      cursor: pointer;
      // outline: 1px blue solid;

      &-title {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 20;
        bottom: 15%;
        width: 100%;
        padding: 20px 0px;
        font-family: $roboto;
        font-size: 30px;
        letter-spacing: 2px;
        color: white;
        background-color: rgba($main-color,.5);

        &-btn {
          position: absolute;
          right: 0;
          height: 30px; 
          margin-right: 30px ;
          transform-origin: center center;
          transition: all .45s ease-in-out;
          animation: click 4s infinite; 
         
          @keyframes click {
            0% {
              opacity: 1;
            }
            25% {
              opacity: 0.2;
            }
            50%{
              opacity: 1;
            }
          }
          
          &-svg {
            transform-origin: center center;
            transition: all .45s ease-in-out;
          }
        }
      }
      &-video {
        position: absolute;
        z-index: 10;
        width: 100%;
        height: 100%;
        object-fit: cover;
        // opacity:0.5;
      }
      &-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &-banner:hover &-banner-title-btn {
      transform: scale(1.3);
    }

    &-paragraph {
      display: flex;
      align-items: center;
      text-align: justify;
      overflow: auto;
      font-family: $roboto;
      font-size: 24px;
      line-height: 160%;
      opacity: .80;
      transition: all .45s ease-in-out;

      // outline: 1px orange solid;
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
.space3 {
  grid-row: 2/6;
  grid-column: 1/2;
  margin: 10px 10px 10px 0px;
  padding: 30px 30px ;
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 10px 0px 0px;

  // outline: 1px orange solid;

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 60px;
    border: 2px $main-color solid;
    border-radius: 6px;
    background-color: transparent;
    transition: background-color .45s;

    &-icon{
      width: 30px;
      margin-right: 20px;
    }

    &-text{
      font-family: $roboto;
      font-weight: 700;
      font-size: 20px;
      color: $main-color;
      transition: color .45s;

    }
  }
  &__button:hover {
    background-color: $main-color;
  }
  &__button:hover &__button-text{
    color: white;
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

</style>