import { isObject } from './../shared/index';
import { hasChanged } from "../shared";
import { isTracking, trackEffects, triggerEffects } from "./effect";
import { reactive } from './reactive';

class RefImpl {
  private _value;
  public dep;
  private _rawValue: any;
  public __v_isRef = true;
  constructor(value) {
    // this._value = value;
    // 看是否是对象
    // value -> reactive
    this._rawValue = value;
    this._value = convert(value);
    this.dep = new Set();
  }

  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newValue) {
    if (hasChanged(newValue, this._rawValue)) {
      // 要先修改 value，再触发依赖
      // this._value = newValue;
      this._rawValue = newValue;
      this._value = convert(newValue);
      triggerEffects(this.dep);
    }
  }
}

function convert(value) {
  return isObject(value) ? reactive(value) : value;
}

function trackRefValue(ref) {
  if (isTracking()) {
    trackEffects(ref.dep);
  }
}

export function ref(value) {
  return new RefImpl(value);
}

export function isRef(ref) {
  return !!ref.__v_isRef;
}

export function unRef(ref) {
  return isRef(ref) ? ref.value : ref;
}