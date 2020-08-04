<template>
    <div class="sidebar">
        <div class="sidebar__menu">
            <a class="sidebar__menu-item">
                <home-icon class="sidebar__menu-item-icon" /> 
            </a>
            <a class="sidebar__menu-item">
                <project-icon class="sidebar__menu-item-icon" /> 
            </a>
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