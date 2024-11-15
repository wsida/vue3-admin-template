/**
 * 使用动态菜单渲染时，如果有个别菜单是全局默认存在，则在这里配置
 */
export default [
  {
    path: "/modify-password",
    name: "ModifyPassword",
    component: () => import("@/views/password/modify.vue"),
    meta: {
      showLink: false,
      hiddenMenus: true,
      hiddenTags: true,
      hiddenTag: true,
      title: "修改密码",
      rank: 301
    }
  }
];
