import { createComponentInstance, setupComponent } from "./component";

export function render(vnode, container) {
  patch(vnode, container);
}

function patch(vnode, container) {
  // 处理组件

  processComponent(vnode, container);
}

function processComponent(vnode: any, container: any) {
  mountComponent(vnode);
}

export function mountComponent(vnode) {
  const instance = createComponentInstance(vnode);
  setupComponent(instance);
}

export function setupRenderEffect(instance: any) {
  // vnode树
  const subTree = instance.render();
}