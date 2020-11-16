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


// const MyPromise = require('./MyPromise')
// // executor
// let promise = new MyPromise((resolve, reject) => {
//     // 非异步
//     // resolve('success');
//     // reject('error');
//     // throw new Error('throw new Erro')

//     // 异步
//     setTimeout(() => {
//         resolve('success');
//     }, 2000)
// });

// promise.then((value) => {
//     console.log('resolve1: ', value);
// }, (reason) => {
//     console.log('reject1: ', reason);
// });

// promise.then((value) => {
//     console.log('resolve2: ', value);
// }, (reason) => {
//     console.log('reject2: ', reason);
// });



// then 链式调用
// const MyPromise = require('./MyPromise1');
// let promise1 = new MyPromise((resolve, reject) => {
//     resolve('promise1');
// });

// let promise2 = promise1.then((value) => {
//     // console.log(value + ' -> then -> promise2');
//     return value + ' -> then -> promise2';

//     // return new Promise((resolve, reject) => {
//     //     resolve(value + ' -> then -> promise2')
//     // })
// })
// .then((value) => {
//     console.log(value);
// })


// then 链式调用 完整版
const MyPromise = require('./MyPromise2');
const promise1 = new MyPromise((resolve, reject) => {
    resolve('resolve');
    // reject('error');
});

let promise2 = promise1.then((value) => {
    // return 1;
    // return promise2;
    // return new Error('Error');
    // return Promise.resolve('Promise')
    // return 'then promise'
    return new MyPromise((resolve, reject) => {
        // resolve('new MyPromise resolve') 
        
        setTimeout(() => {
            // resolve('new MyPromise resolve') 
            resolve(new MyPromise((resolve, reject) => {
                resolve('new MyPromise resolve') 
            }))
        }, 2000);
        
    })
}, (reason) => {
    console.log('---reject')
    return reason;
});

// promise2.then((value) => {
//     console.log('value: ', value);
// }, (reason) => {
//     console.log('reason: ', reason);
// })

// TypeError: onRejected is not a function
// 因为then没有传参数，但是promise规范：then参数是可选的，要是没有参数则继续走下去
promise2.then().then().then().then((value) => {
    // console.log('value: ', value);
    throw Error('Error')
}, (reason) => {
    console.log('reason: ', reason);
})

// catch => then(null, () => {})
.catch((e) => {
    console.log('catch: ', e)
})
