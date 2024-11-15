<script setup lang="ts">
import { getConfig } from "@/config";
import { isAllEmpty } from "@pureadmin/utils";
import { useNav } from "@/layout/hooks/useNav";
import LayLogo from "../lay-logo/index.vue";
import LaySearch from "../lay-search/index.vue";
import LayNotice from "../lay-notice/index.vue";
import LayAvatar from "../lay-avatar/index.vue";
import { ref, toRaw, watch, onMounted, nextTick } from "vue";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { getParentPaths, findRouteByPath } from "@/router/utils";
import { usePermissionStoreHook } from "@/store/modules/permission";
import LaySidebarExtraIcon from "../lay-sidebar/components/SidebarExtraIcon.vue";
import LaySidebarFullScreen from "../lay-sidebar/components/SidebarFullScreen.vue";
import Setting from "@iconify-icons/ri/settings-3-line";

const showFullscreen = getConfig("ShowFullscreen");
const showSearch = getConfig("ShowSearch");
const showSetting = getConfig("ShowSetting");
const showNotice = getConfig("ShowNotice");

const menuRef = ref();
const defaultActive = ref(null);

const { route, device, onPanel, resolvePath, getDivStyle } = useNav();

function getDefaultActive(routePath) {
  const wholeMenus = usePermissionStoreHook().wholeMenus;
  /** 当前路由的父级路径 */
  const parentRoutes = getParentPaths(routePath, wholeMenus)[0];
  defaultActive.value = !isAllEmpty(route.meta?.activePath)
    ? route.meta.activePath
    : findRouteByPath(parentRoutes, wholeMenus)?.children[0]?.path;
}

onMounted(() => {
  getDefaultActive(route.path);
});

nextTick(() => {
  menuRef.value?.handleResize();
});

watch(
  () => [route.path, usePermissionStoreHook().wholeMenus],
  () => {
    getDefaultActive(route.path);
  }
);
</script>

<template>
  <div
    v-if="device !== 'mobile'"
    v-loading="usePermissionStoreHook().wholeMenus.length === 0"
    class="horizontal-header"
  >
    <LayLogo v-if="!!route.meta.hiddenMenus" class="horizontal-header-left" />

    <el-menu
      v-if="!route.meta.hiddenMenus"
      ref="menuRef"
      router
      mode="horizontal"
      popper-class="pure-scrollbar"
      class="horizontal-header-menu"
      :default-active="defaultActive"
    >
      <el-menu-item
        v-for="route in usePermissionStoreHook().wholeMenus"
        :key="route.path"
        :index="resolvePath(route) || route.redirect"
      >
        <template #title>
          <div
            v-if="toRaw(route.meta.icon)"
            :class="['sub-menu-icon', route.meta.icon]"
          >
            <component
              :is="useRenderIcon(route.meta && toRaw(route.meta.icon))"
            />
          </div>
          <div :style="getDivStyle">
            <span class="select-none">
              {{ route.meta.title }}
            </span>
            <LaySidebarExtraIcon :extraIcon="route.meta.extraIcon" />
          </div>
        </template>
      </el-menu-item>
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
