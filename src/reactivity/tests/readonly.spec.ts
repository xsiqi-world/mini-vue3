import { isReadonly, readonly, isProxy } from "../reactive";

/**
* Module: 
* Description: 只可读的对象
* Author: xsq
* Date: 2023/04/02 12:33:04
* LastEditAuthor: xsq
* LastEditTime: 2023/04/02 12:33:04
*/
describe('readonly', () => {
  it('happy path', () => {
    // readonly只可读
    const original = {
      foo: 1,
      bar: {
        baz: 2
      }
    };
    const wrapped = readonly(original);
    expect(wrapped).not.toBe(original);
    expect(wrapped.foo).toBe(1);
    expect(isReadonly(wrapped)).toBe(true);
    expect(isReadonly(original)).toBe(false);
    expect(isReadonly(wrapped.bar)).toBe(true);
    expect(isReadonly(original.bar)).toBe(false);
    expect(isProxy(wrapped)).toBe(true);
  })

  it('warn then call set', () => {
    // console.warn()
    // mock
    console.warn = jest.fn();
    const user = readonly({
      age: 10
    });

    user.age = 11;
    expect(console.warn).toBeCalled();
  })
})