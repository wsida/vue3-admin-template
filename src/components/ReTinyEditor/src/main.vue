<template>
  <div class="ap-tinymce-wrapper">
    <tiny-editor
      ref="editorRef"
      v-bind="$attrs"
      v-model="textContent"
      :api-key="TINYMCE_API_KEY"
      :init="tinyOption"
      :initial-value="textContent"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { TINYMCE_API_KEY } from "../defaults";
import { ReTinyEditorProps } from "../types";
import { getConfig } from "@/config";
import TinyEditor from "@tinymce/tinymce-vue";
import { ref } from "vue";
import { merge } from "lodash-es";

defineOptions({
  name: "ReTinyEditor",
  inheritAttrs: false
});

const ID = "ap-tiny-editor-control";
const theme = ref(getConfig().Theme ?? "light");

const editorRef = ref<InstanceType<typeof TinyEditor> | null>(null);

const props = withDefaults(defineProps<ReTinyEditorProps>(), {
  disabled: false,
  placeholder: "请输入...",
  width: "100%",
  height: 400,
  minHeight: 100,
  autoFocus: false,
  resize: true
});

const textContent = defineModel();

const defaultOption = computed(() => ({
  tinycomments_mode: "embedded",
  tinycomments_author: "eiker",
  language: "zh_CN",
  language_url: "/tinymce/langs/zh_CN.js",
  selector: `textarea#${ID}`, // change this value according to your HTML
  skin: theme.value === "dark" ? "oxide-dark" : "oxide",
  content_css: [
    theme.value === "dark" ? "dark" : "default",
    "/tinymce/style/custom.css"
  ],
  placeholder: props.placeholder,
  readonly: props.disabled,
  width: props.width,
  height: props.height,
  resize: props.resize,
  min_height: props.minHeight,
  max_height: props.maxHeight,
  min_width: props.minWidth,
  max_width: props.maxWidth,
  auto_focus: props.autoFocus ? ID : "",
  mobile: {
    menubar: false
    // plugins: 'autosave lists autolink',
    // toolbar: 'undo bold italic styles'
  },
  menubar: "file edit view format table insert tools help",
  plugins: "lists table link image media fullscreen wordcount help",
  toolbar:
    "undo redo | copy cut paste | fontsize styles forecolor backcolor | bold italic blockquote | alignnone alignleft aligncenter alignright alignjustify | link image media",
  toolbar_mode: "floating"
}));

const tinyOption = computed(() =>
  merge({}, defaultOption.value, props.tinyOption)
);

// TODO: 文件上传处理

defineExpose({
  editorRef
});
</script>

<style lang="scss">
.ap-tinymce-wrapper {
  @apply relative;

  .tox-statusbar__branding {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
  }

  .tox .tox-tbtn,
  .tox .tox-tbtn__select-label,
  .tox .tox-mbtn__select-label {
    @apply cursor-pointer;
  }
}

.tox .tox-collection__item {
  @apply cursor-pointer;
}
</style>
