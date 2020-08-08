<template>
  <div class="bar-item" :class="this.dataBar.statusActive ? 'active': ''" ></div>
</template>

<script>
export default {
    name: 'BarItem',

    props: {
         dataBar: {
            type: Object,
            default: () => {},
        }
    }
}
</script>

<style lang="scss" scoped>
.bar-item {
    height: 100%;
    width: 33.3%;
    background-color: $status-color-contrast;
    transform: scaleX(0);
    opacity: .5;
    transform-origin: center left;
    transition: all .58s ease-in;
}
.bar-item.active {
    transform: scaleX(1);
    opacity: 1;
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.4);
}
</style>