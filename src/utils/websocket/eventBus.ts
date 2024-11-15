import { isNull, isUndefined, isEmpty } from "lodash-es";

export interface EVENT_SUBSCRIBER_ITEM {
  subscriberId: string | number;
  maxCallbackTimes: number;
  callTimes: number;
  callback: Function;
}

const EventBus = {
  listeners: {},

  occupy: function (eventName, subscriberId, callback) {
    this._listen(eventName, subscriberId, 999999, true, callback);
  },

  occupyOnce: function (eventName, subscriberId, callback) {
    this._listen(eventName, subscriberId, 1, true, callback);
  },

  listenOnce: function (eventName, subscriberId, callback) {
    this._listen(eventName, subscriberId, 1, false, callback);
  },

  listen: function (eventName, subscriberId, callback) {
    this._listen(eventName, subscriberId, 999999, false, callback);
  },
  /**
   * @param eventName 订阅事件
   * @param subscriberId 订阅者ID
   * @param maxCallbackTimes 订阅次数
   * @param occupy 是否独占
   * @param callback 回调方法
   */
  _listen: function (
    eventName,
    subscriberId,
    maxCallbackTimes = 1,
    occupy = false,
    callback
  ) {
    if (
      isNull(subscriberId) ||
      isUndefined(subscriberId) ||
      isEmpty(subscriberId)
    ) {
      subscriberId = `s${Math.random()}`;
    }
    if (
      isNull(this.listeners[eventName]) ||
      isUndefined(this.listeners[eventName]) ||
      isEmpty(this.listeners[eventName])
    ) {
      this.listeners[eventName] = [];
    }
    if (occupy) {
      // 删除其他的订阅
      console.warn(`${subscriberId}霸占事件${eventName}，其他的订阅者被清理`);
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(
      this.buildListener(subscriberId, maxCallbackTimes, callback)
    );
  },

  trigger: function (eventName, args = {}) {
    if (
      this.listeners[this.listeners[eventName]] ||
      isEmpty(this.listeners[eventName])
    ) {
      console.warn(`无人订阅${eventName}`);
      return;
    }
    const list = this.listeners[eventName] as Array<EVENT_SUBSCRIBER_ITEM>;
    const recycle: any = [];
    for (let i = 0; i < list.length; i++) {
      const bean = list[i];
      if (bean == null) {
        continue;
      }
      // console.warn(`针对${bean.subscriberId}回调${eventName}，参数：${JSON.stringify(args)}`);
      bean.callback(args);
      bean.callTimes = bean.callTimes + 1;
      if (bean.callTimes >= bean.maxCallbackTimes) {
        console.warn(
          `${bean.subscriberId}针对事件${eventName}的回调已经达到${bean.maxCallbackTimes}次，从总线卸载`
        );
        continue;
      }
      recycle.push(bean);
    }
    this.listeners[eventName] = recycle;
  },

  deleteBySubscriberId: function (subscriberId: string) {
    for (const key in this.listeners) {
      this.listeners[key] = this.listeners[key].filter(
        item => !!item && item.subscriberId !== subscriberId
      );
    }
  },

  buildListener: function (
    subscriberId: EVENT_SUBSCRIBER_ITEM["subscriberId"],
    maxCallbackTimes: EVENT_SUBSCRIBER_ITEM["callTimes"],
    callback: EVENT_SUBSCRIBER_ITEM["callback"]
  ): EVENT_SUBSCRIBER_ITEM {
    return {
      subscriberId: subscriberId,
      maxCallbackTimes: maxCallbackTimes,
      callTimes: 0,
      callback: callback
    };
  }
};

export { EventBus };
