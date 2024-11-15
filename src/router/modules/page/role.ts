export default [
  {
    path: "/role2",
    name: "Role2Management",
    redirect: "/role2/list",
    meta: {
      showLink: true,
      title: "角色管理2",
      icon: "ep:lollipop",
      rank: 301
    },
    children: [
      {
        path: "/role2/list",
        name: "Role2List",
        component: () => import("@/views/permission/role/index.vue"),
        meta: {
          showLink: true,
          title: "角色列表",
          rank: 1
        }
      },
      {
        path: "/role2/list2",
        name: "Role2List2",
        component: () => import("@/views/permission/role/index.vue"),
        meta: {
          showLink: true,
          title: "用户列表",
          rank: 1
        }
      }
    ]
  }
];
