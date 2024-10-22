<script setup lang="ts">

</script>

<template>
    <div class="block has-text-centered">
        <h2 class="is-size-4 mb-3">
            <slot name="card-title"></slot>
        </h2>
        <p class="is-size-5">
            <slot name="top-content"></slot>
        </p>
        <div class="horizontal-divider"></div>
        <p class="is-size-5">
            <slot name="bottom-content"></slot>
        </p>
    </div>
</template>

<style>

.horizontal-divider {
  border-bottom: 1px solid #ccc;
}

</style>