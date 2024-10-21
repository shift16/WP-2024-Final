<script setup lang="ts">

</script>

<template>
    <div class="block is-size-5 has-text-centered">
        <h2 class="title mb-3">
            <slot name="card-title"></slot>
        </h2>
        <p>
            <slot name="top-content"></slot>
        </p>
        <div class="horizontal-divider"></div>
        <p>
            <slot name="bottom-content"></slot>
        </p>
    </div>
</template>

<style>

.horizontal-divider {
  border-bottom: 1px solid #ccc;
}

</style>