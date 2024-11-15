import { EventBus } from "@/utils/websocket/eventBus";

class WebSocketClient {
  protected socket: WebSocket | null = null;
  private _host = "ws://127.0.0.1:3199/index.do";
  private _userId = "temp";
  private _tag = "*";

  init(callback: Function | null, callbackFailed?: Function | null) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const me = this;
    try {
      me.socket = new WebSocket(this._host);
      const status = me.socket.readyState;
      console.log("WebSocket - status " + status);
      // @ts-ignore
      me.socket.onopen = function () {
        // me.findMe();
        console.log("WebSocket Welcome - status " + this.readyState);
        me.addCloseListener();
        setTimeout(function () {
          callback && callback();
        }, 500);
      };
      me.socket.onmessage = function (msg) {
        try {
          const object = JSON.parse(msg.data);
          console.log("WebSocket 收到消息 " + JSON.stringify(object, null, 4));
          EventBus.trigger("ws-" + object.action, object);
        } catch (e) {
          // console.warn("收到无法识别的消息：" + msg.data);
          console.warn(e);
        }
      };
      me.socket.onclose = function (e) {
        console.error(
          " WebSocket onclose - code=" +
            e.code +
            ",reason=" +
            e.reason +
            ",wasClean=" +
            e.wasClean
        );
        setTimeout(function () {
          callbackFailed && callbackFailed();
        }, 1000);
      };
    } catch (ex) {
      console.error(ex);
    }
  }

  addCloseListener() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const me = this;
    window.addEventListener("unload", function () {
      me.disconnect();
    });
  }

  sendMsg(msg) {
    if (!msg) {
      console.error("msg 不能为空");
      return;
    }
    try {
      // @ts-ignore
      this.socket && this.socket.send(msg);
    } catch (ex) {
      console.error(ex);
    }
  }

  registerMe(appId, userId, tag) {
    this._userId = userId;
    this._tag = tag;
    const msg = { action: "register", appId: appId, userId: userId, tag: tag };
    this.sendMsg(JSON.stringify(msg));
  }

  getTime() {
    const msg = { action: "getTime" };
    this.sendMsg(JSON.stringify(msg));
  }

  findMe() {
    const msg = { action: "me" };
    this.sendMsg(JSON.stringify(msg));
  }

  findAllUser() {
    const msg = { action: "users" };
    this.sendMsg(JSON.stringify(msg));
  }

  disconnect() {
    if (this.socket != null) {
      this.socket.close();
      this.socket = null;
    }
  }

  reconnect() {
    this.disconnect();
    this.init(null, null);
  }

  get host(): string {
    return this._host;
  }

  set host(value: string) {
    this._host = value;
  }

  get userId(): string {
    return this._userId;
  }

  set userId(value: string) {
    this._userId = value;
  }

  get tag(): string {
    return this._tag;
  }

  set tag(value: string) {
    this._tag = value;
  }
}

export { WebSocketClient };
