import ReText from "./ReText";
import ReTabs from "./ReTabs";
import ReCollapsedBtn from "./ReCollapsedBtn";
import ReExpandedBtn from "./ReExpandedBtn";
import {
  RePage,
  ReColPage,
  RePageCard,
  ReGridPage,
  ReGridPageItem
} from "./RePage";
import ReTagList from "./ReTagList";
import { IconifyIconOffline, IconifyIconOnline, FontIcon } from "./ReIcon";
import ReEllipsis from "./ReEllipsis";
import ReForm from "./ReForm";
import ReList from "./ReList";
import ReTable from "./ReTable";
import ReTableSelect from "./ReTableSelect";
import type { App, Component } from "vue";

export const components = [
  ReTagList,
  ReTabs,
  ReCollapsedBtn,
  ReExpandedBtn,
  RePage,
  RePageCard,
  ReColPage,
  ReGridPage,
  ReGridPageItem,
  ReText,
  ReEllipsis,
  IconifyIconOffline,
  IconifyIconOnline,
  FontIcon
];

export const plugins = [ReForm, ReList, ReTable, ReTableSelect];

// 全局组件
export default function setup(app: App) {
  plugins.forEach((plugin: { install: (app: App) => void }) => {
    app.use(plugin);
  });
  components.forEach((item: Component) => {
    app.component(item.name!, item);
  });
}
