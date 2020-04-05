// const p = Promise.resolve({id: 1});
// p.then(result => console.log(result));

//Error includes callstack
// const p = Promise.reject(new Error("Reason for rejection..."));
// p.catch(error => console.log(error));

const p1 = new Promise((resolve) =>{
    setTimeout(()=>{
        console.log("Async Op. 1...");
        resolve(1);
    },2000);
});

const p2 = new Promise((resolve) =>{
    setTimeout(()=>{
        console.log("Async Op. 2...");
        resolve(2);
    },2000);
});

Promise.all([p1,p2])
.then(result  => console.log(result))
.catch(err => console.log('Error', err.message));
// Value of first promise fulfilled
Promise.race([p1,p2])
.then(result  => console.log(result))
.catch(err => console.log('Error', err.message));