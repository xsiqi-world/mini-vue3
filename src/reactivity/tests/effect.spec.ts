import { reactive } from '../reactive';
import { effect, stop } from '../effect';

describe('effect', () => {
  it('happy path', () => {
    const user = reactive({
      age: 10
    });

    let nextAge;
    effect(() => {
      nextAge = user.age + 1;
    });

    // 调用第一次effect
    expect(nextAge).toBe(11);

    // nextAge++;
    // expect(nextAge).toBe(12);

    // 数据更新再次调用effect
    user.age = 12;
    expect(nextAge).toBe(13);
  })

  it('should return runner when call effect', () => {
    // 1. effect(fn) -> function (runner) -> fn -> return
    let foo = 10;
    const runner = effect(() => {
      foo++
      return 'foo'; 
    });

    expect(foo).toBe(11);
    const r = runner();
    expect(foo).toBe(12);
    expect(r).toBe('foo');
  })

  it('scheduler', () => {
    // 1. 通过 effect 的第二个参数给定的一个 scheduler 的 fn
    // 2. effect 会在第一次执行的时候执行 fn
    // 3. 当响应式对象 set update 的时候不会执行 fn 而是执行 scheduler
    // 4. 如果说执行 runner 的时候,会再次执行 fn
    let dummy;
    let run: any;
    const scheduler = jest.fn(() => {
      run = runner;
    });

    const obj = reactive({ foo: 1 });
    const runner = effect(
    () => {
      dummy = obj.foo;
    },
    { 
      scheduler
    });

    // 首次不会执行
    expect(scheduler).not.toHaveBeenCalled();
    expect(dummy).toBe(1);

    obj.foo++;
    expect(scheduler).toHaveBeenCalledTimes(1);
    expect(dummy).toBe(1);

    run();
    expect(dummy).toBe(2);
  })

  // 中止effect
  it('stop', () => {
    let dummy;
    const obj = reactive({
      prop: 1
    })

    const runner = effect(() => {
      dummy = obj.prop;
    })

    obj.prop = 2;
    expect(dummy).toBe(2);
    stop(runner);
    // obj.prop = 3;
    obj.prop++;
    expect(dummy).toBe(2);

    runner();
    expect(dummy).toBe(3);

    // obj.prop = 4;
    // expect(dummy).toBe(4);
  })

  test('onStop', () => {
    const obj = reactive({
      foo: 1
    });
    const onStop = jest.fn();
    let dummy;
    const runner = effect(
    () => {
      dummy = obj.foo;
    },
    { 
      onStop
    });

    stop(runner);

    expect(onStop).toBeCalledTimes(1);
  })
})