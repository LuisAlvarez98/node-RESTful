// console.log('Before');
//Asynchronous Version [Christmas Tree problem]
// console.log('After');

// function getRepositories(user){
//     getRepositories(user.gitHubUsername,getCommits)
// }

// function getCommits(repos){
//     console.log(repos, displayCommits);
// }

// function displayCommits(commits){
//     console.log(commits);
// }
// Synchronous Version
// console.log('Before');
// const user = getUser(1);
// const repos = getRepositories(user.gitHubUsername);
// const commits = getCommits(repos[0]);
// console.log('After');

//Get result of async operation
//Callbacks
//Promises
//Async/Await

//Using promises
//  getUser(1)
//     .then(user => getRepositories(user.gitHubUsername))
//     .then(repos => getCommits(repos[0]))
//     .then(commits =>console.log('Commits', commits))
//     .catch(err => console.log('Error', err.message));

// Async and await
async function displayCommits(){
    try{
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }catch(err){
        console.log("Err",err.message)
    }
   
}
displayCommits();



function getUser(id){
    return new Promise((resolve,reject) =>{
        //async work
        setTimeout(()=>{
            console.log('Reading a user from a database...');
            resolve( {id: id, gitHubUsername: 'luis'})
        }, 2000);
    });
}
//Callback to promise
function getRepositories(username){
    return new Promise((resolve, reject) =>{
        //async work
        setTimeout(()=>{
            console.log("Getting repos from user: " + username);
            resolve(['r1','r2','r3']);
        },2000);
    });
}
function getCommits(repo, callback) {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['commit']);
          }, 2000);
    });
  }

// Using callbacks
//   console.log('Before');
// getUser(1, (user) => {
//   getRepositories(user.gitHubUsername, (repos) => {
//     getCommits(repos[0], (commits) => {
//       console.log(commits);
//     })
//   })
// });
// console.log('After');

// function getUser(id, callback) {
//   setTimeout(() => {
//     console.log('Reading a user from a database...');
//     callback({ id: id, gitHubUsername: 'mosh' });
//   }, 2000);
// }

// function getRepositories(username, callback) {
//   setTimeout(() => {
//     console.log('Calling GitHub API...');
//     callback(['repo1', 'repo2', 'repo3']);
//   }, 2000);
// }

// function getCommits(repo, callback) {
//   setTimeout(() => {
//     console.log('Calling GitHub API...');
//     callback(['commit']);
//   }, 2000);
// }