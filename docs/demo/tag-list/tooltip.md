```vue
<template>
  <RePage>
    <RePageCard :shadow="false" :border="false">
      <div>
        <re-tag-list size="default" showOverflowTooltip :tags="tagList" />
      </div>
    </RePageCard>
  </RePage>
</template>

<script setup lang="ts">
import { ref } from "vue";

const fillArray = (char: string): string => {
  return new Array(Math.ceil(Math.random() * 300 + 10)).fill(char).join("");
};

const tagList = ref([
  fillArray("a"),
  fillArray("b"),
  fillArray("c"),
  fillArray("d"),
  fillArray("e")
]);
</script>
```
