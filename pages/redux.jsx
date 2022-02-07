import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/counter";
import makeStore from "../store";

function Page({ number, increase, decrease, asyncIncrease, asyncDecrease }) {
  return (
    <div>
      <h1>{number}</h1>
      <p>
        <button onClick={asyncDecrease}>异步减</button>
        <button onClick={decrease}>减</button>
        <button onClick={increase}>加</button>
        <button onClick={asyncIncrease}>异步加</button>
      </p>
    </div>
  );
}

// 使用这里的方法，调用仓库中的action 行为
function mapState(state) {
  return {
    number: state.counter,
  };
}

/**
 * 使用这里的方法，内部调用dispatch
 * @param {*} dispatch
 * @returns
 */
function mapDispatch(dispatch) {
  return {
    increase() {
      dispatch(actions.increase());
    },
    decrease() {
      dispatch(actions.decrease());
    },
    asyncIncrease() {
      dispatch(actions.asyncIncrease());
    },
    asyncDecrease() {
      dispatch(actions.asyncDecrease());
    },
  };
}

// 封装一个高阶函数，用于连接仓库和页面中的数据
const Wrapper = connect(mapState, mapDispatch)(Page);

export default Wrapper;

// 在服务器端运行 组件渲染之前，
// 这时候，我们需要向仓库中注入数据的时候
export async function getServerSideProps() {
  const store = makeStore();
  await store.dispatch(actions.asyncIncrease());
//   仓库有数据了
return{
    props:{
        _initialState: store.getState()
    }
}
}
