const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

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

    then (onFulfilled, onRejected) {
        if (this.status === FULFILLED) {
            onFulfilled(this.value);
        }

        if (this.status === REJECTED) {
            onRejected(this.reason);
        }

        if (this.status === PENDING) {
            // 订阅
            this.onFulfilledCallbacks.push(() => {
                onFulfilled(this.value);
            });

            this.onRejectedCallbacks.push(() => {
                onRejected(this.reason);
            });
        }
    }
}

// 因为node环境是commonJs规范
module.exports = MyPromise;