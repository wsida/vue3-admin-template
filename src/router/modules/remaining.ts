const Layout = () => import("@/layout/index.vue");

export const ROUTER_WHITELIST = [
  "/login",
  "/password/forget",
  "/login/redirect/qq",
  "/login/redirect/wechat"
];

export default [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
      showLink: false,
      rank: 101
    }
  },
  {
    path: "/login/redirect/:type(qq|wechat)",
    name: "LoginRedirect",
    component: () => import("@/views/login/redirect.vue"),
    meta: {
      title: "登录跳转",
      showLink: false,
      rank: 101
    }
  },
  {
    path: "/password/forget",
    name: "ForgetPassword",
    component: () => import("@/views/password/forget.vue"),
    meta: {
      title: "忘记密码",
      showLink: false,
      rank: 102
    }
  },
  {
    path: "/redirect",
    component: Layout,
    meta: {
      title: "加载中...",
      showLink: false,
      rank: 103
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        name: "Redirect",
        component: () => import("@/layout/redirect.vue")
      }
    ]
  }
] satisfies Array<RouteConfigsTable>;
