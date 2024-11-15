<script setup lang="ts">
import { getConfig } from "@/config";
import { useNav } from "@/layout/hooks/useNav";
import LayLogo from "../lay-logo/index.vue";
import LaySearch from "../lay-search/index.vue";
import LayNotice from "../lay-notice/index.vue";
import LayAvatar from "../lay-avatar/index.vue";
import LayNavMix from "../lay-sidebar/NavMix.vue";
import LaySidebarFullScreen from "../lay-sidebar/components/SidebarFullScreen.vue";
import LaySidebarBreadCrumb from "../lay-sidebar/components/SidebarBreadCrumb.vue";
import LaySidebarTopCollapse from "../lay-sidebar/components/SidebarTopCollapse.vue";
import Setting from "@iconify-icons/ri/settings-3-line";

const showFullscreen = getConfig("ShowFullscreen");
const showSearch = getConfig("ShowSearch");
const showSetting = getConfig("ShowSetting");
const showNotice = getConfig("ShowNotice");

const { layout, device, route, onPanel, pureApp, toggleSideBar } = useNav();
</script>

<template>
  <div class="navbar bg-[#fff] shadow-sm shadow-[rgba(0,21,41,0.08)]">
    <LayLogo v-if="!!route.meta.hiddenMenus" class="vertical-header-left" />

    <LaySidebarTopCollapse
      v-if="!route.meta.hiddenMenus && device === 'mobile'"
      class="hamburger-container"
      :is-active="pureApp.sidebar.opened"
      @toggleClick="toggleSideBar"
    />

    <LaySidebarBreadCrumb
      v-if="!route.meta.hiddenMenus && layout !== 'mix' && device !== 'mobile'"
      class="breadcrumb-container"
    />

    <LayNavMix v-if="layout === 'mix'" />

    <div v-if="layout === 'vertical'" class="vertical-header-right">
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
.navbar {
  width: 100%;
  height: 48px;
  overflow: hidden;

  .hamburger-container {
    float: left;
    height: 100%;
    line-height: 48px;
    cursor: pointer;
  }

  .vertical-header-left {
    display: inline-flex;
  }

  .vertical-header-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-width: 280px;
    height: 48px;
    color: var(--el-text-color-regular);
  }

  .breadcrumb-container {
    float: left;
    margin-left: 16px;
  }
}
</style>
