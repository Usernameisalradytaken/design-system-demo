<template>
  <button
    class="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
    @click="handleClick"
  >
    {{ label }}
  </button>
</template>
<script setup lang="ts">
defineProps<{
  label: string;
}>();
const handleClick = (event: Event) => {
  emits("click", event);
};
const emits = defineEmits<{
  (e: "click", event: Event): void;
}>();
</script>
<script lang="css" scoped></script>
