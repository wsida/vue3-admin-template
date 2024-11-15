import Editor from "@tinymce/tinymce-vue";
import ReTinyEditor from "./src/main.vue";
import type { App } from "vue";

export default {
  install(app: App) {
    app.component("tiny-editor", Editor);
    app.component(ReTinyEditor.name, ReTinyEditor);
  }
};
