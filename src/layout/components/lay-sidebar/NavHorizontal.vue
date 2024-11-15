<script setup lang="ts">
import { getConfig } from "@/config";
import { isAllEmpty } from "@pureadmin/utils";
import { ref, nextTick, computed } from "vue";
import { useNav } from "@/layout/hooks/useNav";
import LayLogo from "../lay-logo/index.vue";
import LaySearch from "../lay-search/index.vue";
import LayNotice from "../lay-notice/index.vue";
import LayAvatar from "../lay-avatar/index.vue";
import { usePermissionStoreHook } from "@/store/modules/permission";
import LaySidebarItem from "../lay-sidebar/components/SidebarItem.vue";
import LaySidebarFullScreen from "../lay-sidebar/components/SidebarFullScreen.vue";
import Setting from "@iconify-icons/ri/settings-3-line";

const showFullscreen = getConfig("ShowFullscreen");
const showSearch = getConfig("ShowSearch");
const showSetting = getConfig("ShowSetting");
const showNotice = getConfig("ShowNotice");

const menuRef = ref();

const { route, onPanel } = useNav();

const defaultActive = computed(() =>
  !isAllEmpty(route.meta?.activePath) ? route.meta.activePath : route.path
);

nextTick(() => {
  menuRef.value?.handleResize();
});
</script>

<template>
  <div
    v-loading="usePermissionStoreHook().wholeMenus.length === 0"
    class="horizontal-header"
  >
    <LayLogo class="horizontal-header-left" />

    <el-menu
      v-if="!route.meta.hiddenMenus"
      ref="menuRef"
      mode="horizontal"
      popper-class="pure-scrollbar"
      class="horizontal-header-menu"
      :default-active="defaultActive"
    >
      <LaySidebarItem
        v-for="route in usePermissionStoreHook().wholeMenus"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
    <div v-if="!!route.meta.hiddenMenus" class="flex-1" />
    <div class="horizontal-header-right">
      <!-- 菜单搜索 -->
      <LaySearch v-if="showSearch" id="header-search" />
      <!-- 全屏 -->
      <LaySidebarFullScreen v-if="showFullscreen" id="full-screen" />
      <!-- 消息通知 -->
      <LayNotice v-if="showNotice" id="header-notice" />
      <!-- 头像 -->
      <LayAvatar id="header-avatar" />
      <span
        v-if="showSetting"
        class="set-icon navbar-bg-hover"
        title="打开系统配置"
        @click="onPanel"
      >
        <IconifyIconOffline :icon="Setting" />
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-loading-mask) {
  opacity: 0.45;
}
</style>
