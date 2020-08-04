<template>
  <div class="circle">
      <p class="circle__message">{{ dataCircle.message }}</p>
      <div class="circle__item"></div>
  </div>
</template>

<script>
export default {
    name: 'CircleItem',

    props:{
        dataCircle: {
            type: Object,
            default: () => {},
        }
    }
}
</script>

<style lang="scss" scoped>
.circle {
    position: relative;
    width: 50px;
    height: 50px;

    &__message{
        position: absolute;
        bottom: 130%;
        left: 50%;
        padding: 5px 10px;
        width: 150px;
        max-height: 60px;
        border-radius: 10px;
        font-family: $roboto;
        font-weight: normal;
        font-size: 14px;
        text-align: center;
        color:white;
        box-shadow: $shadow-secondary;
        transform: translateX(-50%) scale(0);
        transform-origin: center bottom;
        transition: all .45s ease-in-out;
        background-color: $satatus-color-message;
    }
    &__message.active{
        transform: translateX(-50%) scale(1)
    }

    &__item {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: $secondary-color-contrast;
        box-shadow: $shadow-button;
    }
    &__item.active {
        background-color: $status-color;
    }
}
.circle:hover .circle__message{
    transform: translateX(-50%) scale(1);
}
</style>