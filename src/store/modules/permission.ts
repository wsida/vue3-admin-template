import { defineStore } from "pinia";
import {
  type cacheType,
  store,
  debounce,
  ascending,
  getKeyList,
  filterTree,
  constantMenus,
  defaultMenus,
  filterNoPermissionTree,
  formatFlatteningRoutes,
  hasAuth
} from "../utils";
import { useMultiTagsStoreHook } from "./multiTags";
import { computed, type MaybeRef, unref } from "vue";

export const usePermissionStore = defineStore({
  id: "pure-permission",
  state: () => ({
    // 静态路由生成的菜单
    constantMenus,
    // 静态路由生成的全局菜单
    defaultMenus,
    // 整体路由生成的菜单（静态、动态）
    wholeMenus: [],
    // 动态路由生成的菜单
    asyncMenus: [],
    // 整体路由（一维数组格式）
    flatteningRoutes: [],
    // 缓存页面keepAlive
    cachePageList: [],
    // 权限集合
    permissions: []
  }),
  actions: {
    setPermissions(permits = []) {
      this.permissions = permits;
    },

    /** 动态路由生成的菜单 */
    handleWholeMenus(dynamic = false, routes?: any) {
      if (dynamic) {
        this.asyncMenus = [].concat(routes);
        this.wholeMenus = filterTree(
          ascending(this.defaultMenus.concat(routes))
        );
        this.flatteningRoutes = formatFlatteningRoutes(
          this.constantMenus.concat(routes)
        );
      } else {
        this.asyncMenus = [];
        this.wholeMenus = filterNoPermissionTree(
          filterTree(ascending(this.constantMenus))
        );
        this.flatteningRoutes = formatFlatteningRoutes(this.constantMenus);
      }
    },

    cacheOperate({ mode, name }: cacheType) {
      const delIndex = this.cachePageList.findIndex(v => v === name);
      switch (mode) {
        case "refresh":
          this.cachePageList = this.cachePageList.filter(v => v !== name);
          break;
        case "add":
          this.cachePageList.push(name);
          break;
        case "delete":
          delIndex !== -1 && this.cachePageList.splice(delIndex, 1);
          break;
      }
      /** 监听缓存页面是否存在于标签页，不存在则删除 */
      debounce(() => {
        let cacheLength = this.cachePageList.length;
        const nameList = getKeyList(useMultiTagsStoreHook().multiTags, "name");
        while (cacheLength > 0) {
          nameList.findIndex(v => v === this.cachePageList[cacheLength - 1]) ===
            -1 &&
            this.cachePageList.splice(
              this.cachePageList.indexOf(this.cachePageList[cacheLength - 1]),
              1
            );
          cacheLength--;
        }
      })();
    },

    /** 清空缓存页面 */
    clearAllCachePage() {
      this.wholeMenus = [];
      this.cachePageList = [];
      this.permissions = [];
      this.asyncMenus = [];
    }
  }
});

export function usePermissionStoreHook() {
  return usePermissionStore(store);
}

export function usePermissionHook(
  value: MaybeRef<string | string[]>,
  or = false
) {
  return computed(() => {
    return hasAuth(unref(value), or);
  });
}
