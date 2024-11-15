<template>
  <RePage h-full>
    <RePageCard h-full>
      <div class="flex items-center justify-center h-full">
        <el-result
          icon="warning"
          title="访问限制"
          sub-title="请联系管理员审核后，点击“刷新”按钮"
        >
          <template #extra>
            <el-button type="primary" @click="onRefresh">刷新试试</el-button>
          </template>
        </el-result>
      </div>
    </RePageCard>
  </RePage>
</template>

<script setup lang="ts">
/**
 * 需要管理员审核等待页
 */
import { useRouter } from "vue-router";
import { useUserStoreHook } from "@/store/modules/user";
import { message } from "@/utils/message";
import { initRouter, getTopMenu } from "@/router/utils";

const router = useRouter();
function onRefresh() {
  useUserStoreHook()
    .getUserInfo()
    .then(res => {
      if (res.data.status !== 0) {
        // 获取后端路由
        return initRouter().then(() => {
          const toPath = decodeURIComponent(getTopMenu(true).path as string);
          router.push(toPath).then(() => {
            message("审核通过，即将进入系统", { type: "success" });
          });
        });
      }
    })
    .catch(() => {})
    .finally(() => {});
}
</script>
