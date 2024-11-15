import { isEmpty } from "lodash-es";

const currentMillsecond = () => new Date().getTime();

class Timer {
  protected _callback: Function | null = null;
  protected lastTriggerTime = 0;
  private _beatInterval = 1000;
  protected _checkInterval = 100;
  protected _skipFirstTime = true;
  protected ii;

  constructor(
    beatInterval: number,
    checkInterval: number,
    skipFirstTime: boolean,
    callback: any
  ) {
    this._callback = callback;
    this._beatInterval = beatInterval;
    this._checkInterval = checkInterval;
    this._skipFirstTime = skipFirstTime;
    if (this._skipFirstTime) {
      this.lastTriggerTime = currentMillsecond();
    }
  }

  start() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const me = this;
    this.ii = setInterval(function () {
      const time = currentMillsecond();
      const offset = time - me.lastTriggerTime;
      if (offset > me._beatInterval) {
        me._callback && me._callback();
        me.lastTriggerTime = time;
      }
    }, this._checkInterval);
  }

  refreshLastTriggerTime() {
    this.lastTriggerTime = currentMillsecond();
  }

  stop() {
    if (isEmpty(this.ii)) {
      return;
    }
    clearInterval(this.ii);
  }

  setNextDelay(t) {
    this.lastTriggerTime = currentMillsecond() - this._beatInterval + t * 1;
  }

  get beatInterval(): number {
    return this._beatInterval;
  }

  set beatInterval(value: number) {
    this._beatInterval = value;
  }
}

export { Timer };
