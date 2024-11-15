<script setup lang="ts">

defineProps({
    card: Object
})

</script>

<template>
    <div class="block has-text-centered">
        <h2 class="is-size-4 mb-3">
            {{ card.title }}
        </h2>
        <p class="is-size-5">
            {{ card.top_content }}
        </p>
        <div class="horizontal-divider"></div>
        <p class="is-size-5">
            {{ card.bottom_content }}
        </p>
    </div>
</template>

<style>

.horizontal-divider {
  border-bottom: 1px solid #ccc;
}

</style>