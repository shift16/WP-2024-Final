<script setup lang="ts">
defineProps({
    modalId: String
})
</script>

<template>
    <div id="" class="modal">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box field">
                
                <div class="control">
                    <input name="text-input" type="text" class="input" placeholder="Type here"/>
                </div>
            </div>
        </div>
    </div>
</template>