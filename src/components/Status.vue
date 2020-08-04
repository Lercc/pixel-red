<template>
  <div class="status">
      <div class="status__circles">
          <circle-item v-for="(c,index) in circles" :key="index" :data-circle="c" />
      </div>
      <div class="status__bar">
          <div class="status__bar-item"></div>
      </div>
  </div>
</template>

<script>
import CircleItem from '@/components/CircleItem'

export default {
    name: 'Status',

    components: {
        CircleItem,
    },

    data () {
        return {
            circles: [
                {
                    message: 'Ingresar número de neuronas',
                    statusActive: true,
                },
                {
                    message: 'Ingresar patrones de entrenamiento',
                    statusActive: false,
                },
                {
                    message: 'Entrenar red neuronal',
                    statusActive: false,
                },
                {
                    message: 'Probar red neuronal',
                    statusActive: false,
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.status {
    width: 100%;
    margin: 0px 60px;
    // outline: 1px solid red;

    &__circles {
        display: flex;
        justify-content: space-between;
    }
}
</style>