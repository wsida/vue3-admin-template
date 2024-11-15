import { defineComponent, Fragment } from "vue";
import { usePermissionHook } from "@/store/modules/permission";

export default defineComponent({
  name: "ReAuth",
  props: {
    value: {
      type: undefined,
      default: []
    },
    one: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    return () => {
      if (!slots) return null;
      const hasPermit = usePermissionHook(props.value, props.one);
      return hasPermit.value ? <Fragment>{slots.default?.()}</Fragment> : null;
    };
  }
});
