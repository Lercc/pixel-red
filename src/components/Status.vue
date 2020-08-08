<template>
  <div class="status">
      <div class="status__circles">
          <circle-item v-for="(c,index) in circles" :key="index" :data-circle="c" />
      </div>
      <div class="status__bar">
          <bar-item v-for="(b,ind) in bars" :key="`b-${ind}`" :data-bar="b"/>
      </div>
  </div>
</template>

<script>
import CircleItem from '@/components/CircleItem'
import BarItem from '@/components/BarItem'

export default {
    name: 'Status',

    components: {
        CircleItem,
        BarItem,
    },

    props:{
        homeActive: {
            type:Boolean,
            default: () => '',
        },
        
        circleStatus: {
            type: Array,
            default: () => []
        },

        barStatus: {
            type: Array,
            default: () => []
        },

        messageStatus: {
            type: Array,
            default: () => []
        },
    },

    data () {
        return {
            circles: [
                {
                    message: 'Ingresar número de neuronas',
                    statusActive: this.circleStatus[0] || false,
                    statusMessageActive: this.messageStatus[0] || false,
                },
                {
                    message: 'Ingresar patrones de entrenamiento',
                    statusActive: this.circleStatus[1] || false,
                    statusMessageActive: this.messageStatus[1] || false,
                },
                {
                    message: 'Entrenar red neuronal',
                    statusActive: this.circleStatus[2] || false,
                    statusMessageActive: this.messageStatus[2] || false,
                },
                {
                    message: 'Probar red neuronal',
                    statusActive: this.circleStatus[3] || false,
                    statusMessageActive: this.messageStatus[3] || false,
                }
            ],
            bars: [ 
                { 
                    statusActive: this.barStatus[0] || false
                },
                { 
                    statusActive: this.barStatus[1] || false
                },
                { 
                    statusActive: this.barStatus[2] || false
                },
                { 
                    statusActive: this.barStatus[3] || false
                }
            ]
        }
    },

    created () {
        if (this.homeActive) {
            setInterval(this.autoStateChange,2000)
        }
    },
       
    methods:{
        resetStates () {
            for (let i=0; i<this.circles.length; i++) {
                this.circles[i].statusActive = false
                this.circles[i].statusMessageActive = false
                this.bars[i].statusActive = false

            }
        },
        

        autoStateChange() {
            for (let i=0; i<this.circles.length; i++) {

                if (this.circles[i].statusActive === false) {
                    this.circles[i].statusActive = true
                    this.circles[i].statusMessageActive = true

                    for (let i=0; i<this.bars.length; i++) {
                        if (this.bars[i].statusActive === false) {
                            this.bars[i].statusActive = true
                            break
                        }
                    }
                    
                    break
                }
                if(this.circles[3].statusActive) {
                    console.log('cuack')
                    this.resetStates()
                    break
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.status {
    position: relative;
    width: 100%;
    margin: 0px 60px;
    // outline: 1px solid red;

    &__circles {
        position: relative;
        z-index: 20;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    &__bar {
        position: absolute;
        z-index: 10;
        top:50%;
        display: flex;
        
        width: 100%;
        height: 10px;
        transform: translateY(-50%);
        background: #F9F9F9;
        box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.4);
    }
    &__bar :first-child {
        display: none;
        // background-color: red;
    }
}
</style>