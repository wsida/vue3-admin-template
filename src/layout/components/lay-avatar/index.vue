<template>
  <el-dropdown ref="dropdownRef" trigger="click">
    <span class="ap-header-avatar navbar-bg-hover select-none">
      <img :src="userAvatar" :style="avatarsStyle" />
      <span v-if="username" class="dark:text-white">{{ username }}</span>
    </span>
    <template #dropdown>
      <el-dropdown-menu class="ap-userinfo-panel">
        <div
          class="flex items-start px-[16px] py-[12px] border-b-[1px] border-b-[var(--el-border-color-extra-light)]"
        >
          <img :src="userAvatar" />
          <div class="flex-1 overflow-hidden">
            <div class="ap-userinfo-item">
              <!-- <IconifyIconOffline
                v-tippy="{
                  content: '昵称',
                  placement: 'left-start',
                  zIndex: 41000
                }"
                :icon="UserLine"
                class="ap-userinfo-item__icon"
              /> -->
              <span
                class="ap-userinfo-item__text text-[var(--el-text-color-primary)] text-[16px] leading-6"
                >{{ username }}</span
              >
            </div>
            <div v-if="mobile" class="ap-userinfo-item">
              <IconifyIconOffline
                v-tippy="{
                  content: '手机',
                  placement: 'left-start',
                  zIndex: 41000
                }"
                :icon="PhoneLine"
                class="ap-userinfo-item__icon"
              />
              <span class="ap-userinfo-item__text">{{ mobile }}</span>
            </div>
            <div v-if="email" class="ap-userinfo-item">
              <IconifyIconOffline
                v-tippy="{
                  content: '邮箱',
                  placement: 'left-start',
                  zIndex: 41000
                }"
                :icon="MailLine"
                class="ap-userinfo-item__icon"
              />
              <span class="ap-userinfo-item__text">{{ email }}</span>
            </div>
            <div class="ap-userinfo-item">
              <IconifyIconOffline
                v-tippy="{
                  content: '最近登录时间',
                  placement: 'left-start',
                  zIndex: 41000
                }"
                :icon="TimeLine"
                class="ap-userinfo-item__icon"
              />
              <span class="ap-userinfo-item__text">{{
                lastLoginTime || "-"
              }}</span>
            </div>
          </div>
        </div>
        <div class="px-[16px] py-[4px]">
          <div>
            <el-button
              class="block w-full my-[8px] mx-0"
              @click="modifyPassword"
            >
              <IconifyIconOffline :icon="LockPasswordLine" class="mr-[6px]" />
              修改密码
            </el-button>
          </div>
          <div>
            <el-button class="block w-full my-[8px] mx-0" @click="logout">
              <IconifyIconOffline :icon="LogoutCircleRLine" class="mr-[6px]" />
              退出系统
            </el-button>
          </div>
        </div>
        <!-- <el-dropdown-item
          ><el-button link class="block w-full" @click="modifyPassword">
            <IconifyIconOffline :icon="LockPasswordLine" class="mr-[6px]" />
            修改密码
          </el-button></el-dropdown-item
        >
        <el-dropdown-item
          ><el-button link class="block w-full" @click="logout">
            <IconifyIconOffline :icon="LogoutCircleRLine" class="mr-[6px]" />
            退出系统
          </el-button></el-dropdown-item
        > -->
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useUserStoreHook } from "@/store/modules/user";
import { useNav } from "@/layout/hooks/useNav";
import LockPasswordLine from "@iconify-icons/ri/lock-password-line";
import LogoutCircleRLine from "@iconify-icons/ri/logout-circle-r-line";
import MailLine from "@iconify-icons/ri/mail-line";
import PhoneLine from "@iconify-icons/ri/smartphone-line";
// import UserLine from "@iconify-icons/ri/user-3-line";
import TimeLine from "@iconify-icons/ri/time-line";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { ElDropdown } from "element-plus";

const router = useRouter();
const route = useRoute();

const dropdownRef = ref<InstanceType<typeof ElDropdown> | null>(null);

const { logout, username, userAvatar, avatarsStyle } = useNav();
const { mobile, email, lastLoginTime } = useUserStoreHook();

function closeDropdown() {
  dropdownRef.value && dropdownRef.value.handleClose?.();
}
function modifyPassword() {
  closeDropdown();
  if (route.name !== "ModifyPassword") router.push({ name: "ModifyPassword" });
}
</script>

<style lang="scss" scoped>
.ap-header-avatar {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 48px;
  padding: 10px;
  color: var(--el-text-color-regular);
  cursor: pointer;

  p {
    font-size: 14px;
  }

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
}

.ap-userinfo-panel {
  width: 256px;

  img {
    width: 48px;
    height: 48px;
    margin-right: 12px;
    border-radius: 50%;
  }

  .ap-userinfo-item {
    @apply flex justify-start items-center text-[var(--el-text-color-regular)] text-[14px] -my-[4px];

    &__text {
      @apply overflow-hidden text-ellipsis whitespace-nowrap py-[4px];
    }

    &__icon {
      @apply mr-[6px] text-[16px];
    }
  }
}

.ap-logout-dropmenu {
  min-width: 120px;

  ::v-deep(.el-dropdown-menu__item) {
    display: inline-flex;
    flex-wrap: wrap;
    min-width: 100%;
  }
}
</style>
