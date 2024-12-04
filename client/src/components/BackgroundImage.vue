<script setup lang="ts">
    import {ref, type Ref} from 'vue'
    const props = defineProps({
        backgroundImageName: String
    })

    const backgroundImage: Ref<String> = ref('url(/src/assets/' + props.backgroundImageName + ')')

</script>

<template>
    <div class="background-image"></div>
</template>

<style>
.background-image {
    background: v-bind(backgroundImage);
    background-size: contain;
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0px;
    top: 0px;
    filter: opacity(25%);
    z-index: -1;
}
</style>