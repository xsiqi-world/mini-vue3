export const App = {
  // .vue
  // <template></template>
  // render
  render() {
    return h('div', 'hi,' + this.msg);
  },
  setup() {
    // composition api
    return {
      msg: 'world'
    }
  }
}