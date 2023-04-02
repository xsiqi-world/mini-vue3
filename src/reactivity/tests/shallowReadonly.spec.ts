import { isReadonly, shallowReadonly } from "../reactive";

/**
* Module: 
* Description: 表层是响应式对象,内部是非响应式对象
* Author: xsq
* Date: 2023/04/02 12:32:33
* LastEditAuthor: xsq
* LastEditTime: 2023/04/02 12:32:33
*/

describe('shallowReadonly', () => {
  it('should not make non-reactive properties reactive', () => {
    const props = shallowReadonly({ n: { foo: 1 } });
    expect(isReadonly(props)).toBe(true);
    expect(isReadonly(props.n)).toBe(false);
  })

  it('should call console.warn when set', () => {
    console.warn = jest.fn();
    const user = shallowReadonly({
      age: 10
    });

    user.age = 11;
    expect(console.warn).toHaveBeenCalled();
  })
})