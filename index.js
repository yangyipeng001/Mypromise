// 验证原生的promise
// let promise = new Promise((resolve, reject) => {
//     // resolve('success');
//     // reject('error');
//     throw new Error('throw new Erro')
// });

// promise.then((value) => {
//     console.log('resolve: ', value);
// }, (reason) => {
//     console.log('reject: ', reason);
// });


const MyPromise = require('./MyPromise')
// executor
let promise = new MyPromise((resolve, reject) => {
    // 非异步
    // resolve('success');
    // reject('error');
    // throw new Error('throw new Erro')

    // 异步
    setTimeout(() => {
        resolve('success');
    }, 2000)
});

promise.then((value) => {
    console.log('resolve1: ', value);
}, (reason) => {
    console.log('reject1: ', reason);
});

promise.then((value) => {
    console.log('resolve2: ', value);
}, (reason) => {
    console.log('reject2: ', reason);
});