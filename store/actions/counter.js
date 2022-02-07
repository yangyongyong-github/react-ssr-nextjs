export const actionTypes = {
  increase: "counter/increase",
  decrease: "counter/decrease",
  asyncIncrease: "counter/asyncIncrease",
  asyncDecrease: "counter/asyncDecrease"
};

// 模拟网路通信的时延
function delay(duration) {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

export function increase() {
  return { type: actionTypes.increase };
}

export function decrease() {
  return { type: actionTypes.decrease };
}

export function asyncIncrease() {
  return async function(dispatch) {
    await delay(1000);
    dispatch(increase());
  };
}
export function asyncDecrease() {
  return async function(dispatch) {
    await delay(1000);
    dispatch(decrease());
  };
}
