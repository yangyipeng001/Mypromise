const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

function resolvePromise(promise2, x, resolve, reject) {
    console.log('promise2: ', promise2)
}

class MyPromise {
    constructor (executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;

        // 存放成功或失败的回调函数
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];


        // 放到里面，是因为每次都需要生成不一样的回调函数
        const resolve = (value) => {
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;

                // 发布
                this.onFulfilledCallbacks.forEach(fn => fn());
            }
        }

        const reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;

                // 发布
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }

        // 解决捕获到异常后，能够走reject
        try {
            executor(resolve, reject)
        }
        catch (e) {
            reject(e);
        }
    }

    // x 普通值 || promise
    // resolvePromise 来处理 x 是不是promise
    // setTimeout 来模拟异步
    then (onFulfilled, onRejected) {
        let promise2 = new MyPromise((resolve, reject) => {
            if (this.status === FULFILLED) {
                try {
                    setTimeout(() => {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    }, 0);
                }
                catch (e) {
                    reject(e)
                }
            }
    
            if (this.status === REJECTED) {
                try {
                    setTimeout(() => {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    }, 0);
                }
                catch (e) {
                    reject(e)
                }
            }
    
            if (this.status === PENDING) {
                    // 订阅
                    this.onFulfilledCallbacks.push(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e)
                        }
                    });
        
                    this.onRejectedCallbacks.push(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e)
                        }
                    });
            }
        });

        return promise2;
    }
}

// 因为node环境是commonJs规范
module.exports = MyPromise;