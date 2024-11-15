import { defineStore } from "pinia";
import { store } from "../utils";
import * as Enums from "@/config/enums";
import { computed } from "vue";
import type { Ref } from "vue";
import { getEnums } from "@/api/common";

export const useEnumsStore = defineStore({
  id: "pure-enums",
  state: () => ({
    // 静态字典值
    ...Enums
    // 动态字典值
  }),
  actions: {
    setEnum(key: string, value: any) {
      this[key] = value;
    },

    async getEnum(code: string, defaultValue?: any) {
      const res = await getEnums(code);
      this.setEnum(code, res.data || defaultValue);
    }
  }
});

export function useEnumsStoreHook() {
  return useEnumsStore(store);
}

export function useEnumHook(key: string) {
  return useEnumsStoreHook()[key];
}

export function useEnumMapHook(key: string, valueKey: string) {
  const enums = useEnumHook(key);
  if (!Array.isArray(enums)) return enums;
  const map = new Map();
  for (let item of enums) {
    if (item && item[valueKey]) {
      map.set(item[valueKey], item);
    } else {
      map.set(item, item);
    }
  }
  return map;
}

export function useEnumItemHook(
  key: string,
  valueKey: string,
  keyValue: string
) {
  const enumMap = useEnumMapHook(key, valueKey);
  return enumMap.get(keyValue);
}

export function useEnumRefHook(key: string): Ref<any> {
  return computed(() => useEnumsStoreHook()[key]);
}

export function useEnumMapRefHook(key: string, valueKey: string) {
  return computed(() => {
    const enums = useEnumRefHook(key);
    if (!Array.isArray(enums.value)) return enums.value;
    const map = new Map();
    for (let item of enums.value) {
      if (item && item[valueKey]) {
        map.set(item[valueKey], item);
      } else {
        map.set(item, item);
      }
    }
    return map;
  });
}

export function useEnumPatternItemHook(
  keyValue: string,
  key = "PATTERNS",
  valueKey = "key"
) {
  return useEnumItemHook(key, valueKey, keyValue);
}
