/**
 * 使用动态菜单渲染时，如果有个别菜单是全局默认存在，则在这里配置
 */
export default [
  {
    path: "/waiting",
    name: "Waiting",
    component: () => import("@/views/waiting/index.vue"),
    meta: {
      showLink: false,
      hiddenMenus: true,
      hiddenTags: true,
      hiddenTag: true,
      title: "等待审核",
      rank: 301
    }
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/views/settings/index.vue"),
    meta: {
      icon: "ep:setting",
      title: "个人设置",
      rank: 300
    }
  },
  {
    path: "/examples",
    name: "Examples",
    component: () => import("@/views/examples/table.vue"),
    meta: {
      icon: "ep:grid",
      title: "表格组件示例",
      rank: 300
    }
  },
  {
    path: "/form-example",
    name: "FormExample",
    component: () => import("@/views/examples/form.vue"),
    meta: {
      icon: "ep:menu",
      title: "表单组件示例",
      rank: 300
    }
  },
  {
    path: "/search-form-example",
    name: "SearchFormExample",
    component: () => import("@/views/examples/search.vue"),
    meta: {
      icon: "ep:menu",
      title: "搜索组件示例",
      rank: 300
    }
  },
  {
    path: "/list-example",
    name: "ListExample",
    component: () => import("@/views/examples/list.vue"),
    meta: {
      icon: "ep:menu",
      title: "列表组件示例",
      rank: 300
    }
  },
  {
    path: "/table-select-example",
    name: "TableSelectExample",
    component: () => import("@/views/examples/table-select.vue"),
    meta: {
      icon: "ep:menu",
      title: "下拉表格选择组件示例",
      rank: 300
    }
  },
  {
    path: "/echart-example",
    name: "EchartExample",
    component: () => import("@/views/examples/echart.vue"),
    meta: {
      icon: "ep:menu",
      title: "报表组件示例",
      rank: 300
    }
  },
  {
    path: "/tinymce-example",
    name: "TinymceExample",
    component: () => import("@/views/examples/tinymce.vue"),
    meta: {
      icon: "ep:menu",
      title: "富文本组件示例",
      rank: 300
    }
  }
] satisfies Array<RouteConfigsTable>;
