(global => {
  const { Stream } = global;

  class WritableStream extends Stream {
    constructor() {
      super(next => {
        this._next = next;
      });
    }

    write(x) {
      this._next(x);
    }
  }

  const redux = {
    createStore: reducer => {
      const inputs = new WritableStream();
      const state = inputs.scan(reducer);

      return {
        subscribe: fn => {
          state.subscribe(fn);
        },
        dispatch: action => {
          inputs.write(action);
        },
        getState: () => {
          return state.getLast();
        }
      };
    }
  };

  global.redux = redux;
})(window);
