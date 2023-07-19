export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type
  };

  return component;
}


export function setupComponent(instance) {
  // TODO:
  // initProps()
  // initSlots()

  setupStatefulComponent(instance);
}

export function setupStatefulComponent(instance: any) {
  const Component = instance.vnode.type;

  const { setup } = Component;

  if (setup) {
    const setupResult = setup();

    handleSetupResult(instance, setupResult);
  }
}

export function handleSetupResult(instance, setupResult: any) {
  // function object
  // TODO:function

  if (typeof setupResult == 'object') {
    instance.setupResult = setupResult;
  }

  finishComponentSetup(instance);
}

export function finishComponentSetup(instance: any) {
  const Component = instance.type;

  if (Component.render) {
    instance.render = Component.render;

  }
}