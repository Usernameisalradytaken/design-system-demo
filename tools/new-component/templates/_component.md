<template>
  <div>
    <h1 :class="containerClass" >{{title}} is go for launch!</h1>
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";

  interface Props {
    title: string;
    titleVariant?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    titleVariant: "rds-dark-3",
  });

  const containerClass = computed(() => {
      return `text-${props.titleVariant}`;
  })
</script>

<style scoped>
</style>
