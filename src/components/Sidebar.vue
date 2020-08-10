<template>
    <div class="sidebar">
        <div class="sidebar__menu">
            <router-link to="/" class="sidebar__menu-item" >
                <home-icon @click="deleteProj" class="sidebar__menu-item-icon" /> 
            </router-link>

          
            <span class="sidebar__menu-item" v-show="projectone" v-for="r in redSides" :key="r"  @click="numProj(r)">
                <project-icon class="sidebar__menu-item-icon" /> 
            </span>
        </div>
    </div>
</template>

<script>
import ProjectIcon from '@/components/ProjectIcon'
import HomeIcon from '@/components/HomeIcon'

export default {
    name: "Sidebar",

    components: {
        ProjectIcon,
        HomeIcon
    },

    props: {
        redSides: {
            type: Array,
            default: () => [],
        },
        projectone: {
            type: Boolean,
            default: false
        },
    },

    methods: {
        numProj(r) {
            this.$emit('projectid',r)
            this.$router.push({ name: 'project', params:{ id: r} }).catch(err => {})
        },

        deleteProj() {
          this.$emit('deleteProj',false)
        }

    }
}
</script>

<style lang="scss" scoped>
.sidebar {
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: orange;

    &__menu {
        display: inherit;
        flex-direction: column;
        // outline: 1px solid red;
        &-item {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 60px;
            height: 60px;
            margin-bottom: 30px;
            background-color: $main-color;
            border-radius: 6px;
            cursor: pointer;
            box-shadow: $shadow-inset-3;
            transition: all .45s ;

            &-icon {
                width: 28px;
            }
        }
        &-item:hover {
            box-shadow: $shadow-inset-3-contrast;
        }
        &.active {
            background-color: white;
            box-shadow: -1px 2px 4px rgba(0, 0, 0, 0.55);
        }
    }
}



</style>