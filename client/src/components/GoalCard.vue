<script setup lang="ts">
defineProps({
    currentProgress: Number
})

</script>

<template>
    <div class="box force-width is-size-6">
        <h2 class="has-text-centered subtitle mb-1">
            <slot name="card-title"></slot>
        </h2>
        <div class="horizontal-divider"></div>
        
        <p class="ml-1 mb-2 mt-2">
            <slot name="card-content"></slot>
        </p>

        <slot name="progress-bar">
            <progress :value="currentProgress || undefined" max="100" class="progress very-small"></progress>
        </slot>
        
    </div>
</template>

<style>

.horizontal-divider {
  border-bottom: 1px solid #ccc;
}

.force-width {
    max-width: 15rem;
}

.very-small {
    height: 0.25rem;
}

</style>