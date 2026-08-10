<template>
  <header class="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
    <h1 class="text-xl font-semibold text-gray-900">
      {{ title ?? "Design System" }}
    </h1>

    <nav class="flex items-center gap-4">
      <a href="#" class="text-sm text-gray-600 hover:text-gray-900"> Home </a>

      <a href="#" class="text-sm text-gray-600 hover:text-gray-900"> Components </a>

      <Button label="Sign in" />
    </nav>
  </header>
</template>
<script setup lang="ts">
import { Button } from "@design-system/button";

defineProps<{
  title?: string;
}>();
</script>
