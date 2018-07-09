[{
    id: 'xxx',
    name: 'tomik',
    room: 'x'
}]

//adduser(id,name,room)
//removeuser(id)
//getUser(id)
//getUserList(room)

//es6 syntax pro tridy
"use strict";

class Users {
    constructor(){
        this.users = [];
    }
    addUser(id,name,room){
        var user = {id,name,room};
        this.users.push(user);
        return user;
    }
    removeUser(id){
        var user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user)=>user.id !==id);
        }
        return user;
    }
    getUser(id){
       return  this.users.filter((user)=>user.id === id)[0];
             
    }

    getUserN(name){
        return  this.users.filter((user)=>user.name === name)[0];
              
     }
    getUserList(room){
        var users = this.users.filter((user)=>user.room === room);
        var namesArray = users.map((user)=> user.name);

        return namesArray;             
        }
 }


//Sync Vs. Async

// x = new Users(1);
// console.log(x.addUser(1,'xx','xx'));

// var fetch = (val,c)=>{
    
//     c(x.getUser(val));
// }

// fetch(1, (ret)=>{
//     console.log(ret);
// })

module.exports = Users









// class Person {
//     constructor (name, age){
//        this.name = name;
//        this.age = age;
//     }
//     getUserDesc(){
//         return `${this.name} je jeden rok old`;
//     }
// }

// var me = new Person('Tom',29);
// console.log(me.getUserDesc());