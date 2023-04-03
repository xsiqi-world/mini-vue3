import { ReactiveEffect } from './effect';

class ComputedRefImpl {
  private _value: any;
  private _getter: any;
  private _dirty: boolean = true;
  private _effect: any;
  constructor(getter) {
    this._getter = getter;
    this._effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
      }
    });
  }

  get value() {
    // get
    // get value -> dirty -> true
    // 当依赖响应式对象改变的时候
    // effect
    if (this._dirty) {
      this._dirty = false;
      this._value = this._effect.run();
    }
    return this._value;
  }
}

export function computed(getter) {
  return new ComputedRefImpl(getter);
}