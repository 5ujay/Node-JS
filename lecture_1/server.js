// var os = require('os');
// var fs = require('fs');

// let user = os.userInfo();
// console.log(user.username);


// fs.appendFile('greeting.txt', 'HI ' + user.username + '\n', () => console.log("File created"))


let client = require('./client');

console.log("this is the server side");

let b = client.a

var add = function (a, b) {
    return a + b
}
console.log(add(10, b))

let _ = require("lodash")
const arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];

console.log(_.uniq(arr))

console.log("Hello World !");
