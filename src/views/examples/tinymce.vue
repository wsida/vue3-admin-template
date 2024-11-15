<template>
  <RePage>
    <RePageCard>
      <ReTinyEditor v-model="text" />
    </RePageCard>
  </RePage>
</template>

<script setup lang="ts">
import { ref } from "vue";

const text = ref("");
</script>
