## promise 规范学习
- [promiseA+ 规范](https://juejin.im/post/6844903649852784647)

- "promise"是具有then方法的对象或函数，其行为符合此规范。
- "thenable"是定义then方法的对象或函数。
- "value"是任意合法的Javascript值，（包括undefined,thenable, promise）
- "exception"是使用throw语句抛出的值
- "reason"是表示promise为什么被rejected的值


## 难点
- 因为promise属于微任务，所以得考虑到浏览器的 event loop。
- onFulfilled和onRejected必须被当做函数调用(i.e. with no this value).
    - i.e. with no this value --> 意思是这两个函数中不能包含this的指向，也就是只能像fn(),这种执行。 
- 在pending的状态下，保存回调函数，其实就是订阅发布模式。