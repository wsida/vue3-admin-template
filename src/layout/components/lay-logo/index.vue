<template>
  <div v-if="showLogo" class="ap-layout-logo" @click="backTopMenu">
    <img :src="getLogo()" alt="logo" />
    <span>{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
import { useNav } from "@/layout/hooks/useNav";
const { showLogo, title, getLogo, backTopMenu } = useNav();
</script>

<style lang="scss" scoped>
.ap-layout-logo {
  display: inline-flex;
  align-items: center;
  float: left;
  width: auto;
  min-width: 200px;
  height: 100%;
  padding-left: 10px;
  cursor: pointer;
  transition: all var(--pure-transition-duration) ease;

  img {
    display: inline-block;
    height: 32px;
  }

  span {
    display: inline-block;
    height: 32px;
    margin: 2px 0 0 12px;
    overflow: hidden;
    font-size: 18px;
    font-weight: 600;
    line-height: 32px;
    color: $subMenuActiveText;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
