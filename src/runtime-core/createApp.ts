import { render } from "./renderer";
import { createVNode } from "./vnode";

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      // MARK:先转化成虚拟节点 vnode
      // 所有逻辑操作 根据虚拟节点 vnode
      const vnode = createVNode(rootComponent);

      render(vnode, rootContainer);
    }
  }
}