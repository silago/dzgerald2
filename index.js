var Datastore = require('../node_modules/nedb/lib/datastore');

db = {};
db.users =  new Datastore('../db/users.db');
db.robots = new Datastore('../db/robots.db');
db.users.loadDatabase(function (err) {    // Callback is optional
    //console.log(err);
});

var addUser = function(name,email,phone) {
    console.log('...');
    console.log(db.users.insert({
            name:name,
            email:email,
            phone:phone
        },function(err,newDoc) {
            console.log(err);
            console.log(newDoc);
    }));
};


var searchUser = function(str) {
    db.users.find({
        name: (new RegExp(str))
        },function(err,docs) {
            console.log(err);
            console.log(docs);
           document.getElementById('search-result').innerHTML=docs; 
        });
}
