import generateRandomString from "@/utils/randomString";
import { isEmpty, isNull, isUndefined } from "lodash-es";
import { storage } from "@/utils/storage";
import { AP_UID } from "@/config/storageNames";
import { ref } from "vue";

export default function useUid() {
  let uid = ref(storage.getStorage(AP_UID));

  const setUid = () => {
    const expire = 7 * 24 * 60 * 60 * 1000;
    const id = generateRandomString(32);
    storage.setStorage(AP_UID, id, expire);
    uid.value = id;
  };

  const removeUid = () => {
    uid.value = null;
    storage.removeStorage(AP_UID);
  };

  if (isNull(uid.value) || isUndefined(uid.value) || isEmpty(uid.value)) {
    setUid();
  }

  return {
    uid,
    setUid,
    removeUid
  };
}
