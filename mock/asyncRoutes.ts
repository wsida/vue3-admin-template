// 模拟后端动态生成路由
import { defineFakeRoute } from "vite-plugin-fake-server/client";

/**
 * roles：页面级别权限，这里模拟二种 "admin"、"common"
 * admin：管理员角色
 * common：普通角色
 */
const permissionMenus = [
  {
    path: "/permission",
    name: "Permission",
    meta: {
      title: "权限管理",
      icon: "ep:lollipop",
      rank: 100
    },
    children: [
      {
        path: "/permission/role",
        name: "Role",
        meta: {
          title: "角色管理",
          rank: 2
        }
      },
      {
        path: "/permission/button",
        name: "Button",
        meta: {
          title: "按钮权限管理",
          rank: 2
        }
      },
      {
        path: "/permission/authorize",
        name: "Authorize",
        meta: {
          title: "权限码管理",
          rank: 2
        }
      }
    ]
  },
  {
    path: "/role",
    name: "Role2",
    meta: {
      title: "角色管理",
      icon: "ep:user",
      rank: 2
    }
  },
  {
    path: "/user",
    name: "User",
    meta: {
      title: "用户管理",
      icon: "ep:user",
      rank: 12
    }
  },
  {
    path: "/auth",
    name: "Auth",
    meta: {
      title: "权限管理",
      icon: "ep:key",
      rank: 13
    }
  }
];

const permissionCodes = [
  "user-manage:view",
  "user-manage:edit",
  "role-manage:view",
  "role-manage:edit",
  "permit-manage:view",
  "permit-manage:edit"
];

export default defineFakeRoute([
  {
    url: "/get-async-menus",
    method: "get",
    response: () => {
      return {
        code: 0,
        message: "success",
        data: {
          menus: permissionMenus,
          auths: permissionCodes
        }
      };
    }
  },
  {
    url: "/get-permissions",
    method: "get",
    response: () => {
      return {
        code: 0,
        message: "success",
        data: permissionCodes
      };
    }
  }
]);
