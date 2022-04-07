import { reactive } from '../../reactive';
import { effect, stop } from '../../effect';

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

  it('return runner when call effect', () => {
    let foo = 10;
    const runner = effect(() => {
      foo++;
      return 'foo';
    })

    expect(foo).toBe(11);

    const r = runner();
    expect(foo).toBe(12);
    expect(r).toBe('foo');
  })

  it("scheduler", () => {
    // 1.通过effect第二个参数制定的scheduler的fn
    // 2.effect第一次执行的时候还会执行fn
    // 3.当响应式对象set update不会执行fn而是执行scheduler
    // 4.如果当执行runner的时候，会再次的执行fn
    let dummy;
    let run: any;
    const scheduler = jest.fn(() => {
      run = runner;
    });

    const obj = reactive({
      foo: 1
    });
    const runner = effect(() => {
      dummy = obj.foo;
    }, { scheduler })
    expect(scheduler).not.toHaveBeenCalled();
    // effect执行了
    expect(dummy).toBe(1);

    obj.foo++;
    expect(scheduler).toHaveBeenCalledTimes(1);
    expect(dummy).toBe(1);
    run();
    expect(dummy).toBe(2);
  })

  it("stop", () => {
    let dummy;
    const obj = reactive({
      prop: 1
    });
    const runner = effect(() => {
      dummy = obj.prop;
    });
    obj.prop = 2;
    expect(dummy).toBe(2);
    stop(runner);
    obj.prop = 3;
    expect(dummy).toBe(2);
  })
})