// 原生 promise 链式调用
let promise = new Promise((resolve, reject) => {
    resolve('first resolve');
});

// 通过return传递结果
// promise.then((res) => {
//     // 普通值
//     return res;
// })
// .then((res) => {
//     console.log(res); // first resolve
// });

// 通过return新的promise resolve结果
// promise.then((res) => {
//     // 普通值
//     return res;
// })
// .then((res) => {
//     return new Promise((resolve, reject) => {
//         // 同步
//         // resolve(res);

//         // 异步
//         setTimeout(() => {
//             resolve(res);
//         }, 2000);
//     });
// })
// .then((res) => {
//     console.log(res); // first resolve
// });

// // 通过新的promise reject原因
// promise.then((value) => {
//     // 普通值
//     return value;
// })
// .then((value) => {
//     return new Promise((resolve, reject) => {
//         // 同步
//         // resolve(res);

//         // 异步
//         setTimeout(() => {
//             reject('ERROR');
//         }, 2000);
//     });
// })
// .then((value) => {
//     console.log(value); // first resolve
// }, (reason) => {
//     console.log('rejected: ', reason); // rejected:  ERROR
// });

// then走了失败的回调函数后，再走then
// promise.then((value) => {
//     // 普通值
//     return value;
// })
// .then((value) => {
//     return new Promise((resolve, reject) => {
//         // 同步
//         // resolve(res);

//         // 异步
//         setTimeout(() => {
//             reject('ERROR');
//         }, 2000);
//     });
// })
// .then((value) => {
//     console.log(value); // first resolve
// }, (reason) => {
//     console.log('rejected: ', reason); // rejected:  ERROR
//     // 默认return undefined
// })
// .then((value) => {
//     console.log('onFulfilled: ', value); // onFulfilled:  undefined
// }, (reason) => {
//     console.log('onRejected: ', reason)
// })

// then中使用throw new Error
// promise.then((value) => {
//     // 普通值
//     return value;
// })
// .then((value) => {
//     return new Promise((resolve, reject) => {
//         // 同步
//         // resolve(res);

//         // 异步
//         setTimeout(() => {
//             reject('ERROR');
//         }, 2000);
//     });
// })
// .then((value) => {
//     console.log(value); // first resolve
// }, (reason) => {
//     console.log('rejected: ', reason); // rejected:  ERROR
//     // 默认return undefined
// })
// .then((value) => {
//    throw new Error('throw error');
// })
// .then((value) => {
//     console.log(value)
// }, (reason) => {
//     console.log('Exeption: ', reason); // Exeption: throw error
// })

// 用catch捕获异常
// promise.then((value) => {
//     // 普通值
//     return value;
// })
// .then((value) => {
//     return new Promise((resolve, reject) => {
//         // 同步
//         // resolve(res);

//         // 异步
//         setTimeout(() => {
//             reject('ERROR');
//         }, 2000);
//     });
// })
// .then((value) => {
//     console.log(value); // first resolve
// }, (reason) => {
//     console.log('rejected: ', reason); // rejected:  ERROR
//     // 默认return undefined
// })
// .then((value) => {
//     // 会找最近的失败的回调
//    throw new Error('throw error');
// })
// .then((value) => {
//     console.log(value)
// }, 
// // 如果这有失败的回调，则不会走下边的catch
// // (reason) => {
// //     console.log('reason: ', reason);
// // }
// )
// .catch((err) => {
//     console.log('catch: ', err)
//     return 'Catch Error';
// })
// .then((value) => {
//     console.log('Then: ', value);
// })


// catch在promise的源码层面上就是一个then，catch也是遵循then的运行原则的

// 成功的条件
// then return 普通的javascript value
// then return 新的promise成功态的结果 value

// 失败的条件
// then return 新的promise失败态的原因 reason
// then 抛出了异常 throw new Error

// promise 链式调用
// javascript jQuery 链式原理： return this
// then 不具备this
// promise 链式调用原理：return new Promise


// 下面两种写法是有区别的
let promise2 = promise.then((value) => {
    // return 第一次返回的新的Promise
}).then((value) => {
    // return 第二次返回新的Promise
})


let promise2 = promise.then(() => {
    // return 第一次返回新的Promise
})

//  第一次then返回新的Promise
promise2.then(() => {

})