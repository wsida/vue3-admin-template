import { plugins, components } from "./index";
import { ReAuth } from "./ReAuth";
import type { App, Component } from "vue";

const globalComponents = [...components, ReAuth];

export function setupComponents(app: App) {
  plugins.forEach((plugin: { install: (app: App) => void }) => {
    app.use(plugin);
  });
  globalComponents.forEach((item: Component) => {
    app.component(item.name!, item);
  });
}
