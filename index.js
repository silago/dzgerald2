var Datastore = require('../node_modules/nedb/lib/datastore');

db = {};
db.users =  new Datastore('db/users.db');
db.robots = new Datastore('db/robots.db');
db.users.loadDatabase(function (err) {    // Callback is optional
    //console.log(err);
});

var createUser = function(form) {
    var name  = form.uname.value,
        email = form.uemail.value,
        phone = form.uphone.value;

    db.users.insert({
            name:name,
            email:email,
            phone:phone
        },function(err,newDoc) {
            console.log(newDoc);
            var _id = newDoc._id;
            showUser(newDoc);
    });
    return false;
};

var showUser =  function(_id) {
    document.getElementById('search-result').style.display='none';
    db.users.find({ _id: _id},((err,docs)=>{
            var e  = docs[0];
            var form = document.getElementById('show-user');
            form.getElementsByTagName('h2')[0].innerHTML = e.name;
            form.getElementsByClassName('phone')[0].innerHTML = e.email;
            form.getElementsByClassName('email')[0].innerHTML = e.phone;
            form.getElementsByClassName('add-bill')[0].onclick = (()=>{
                return showBillForm(e.__id);
            });
            form.style.display='block';
        }));
}

var Order = new Object(
    init:function() {
        this.user:null,
        this;cost:null,
        this;discount:null,
        this;items:[];
    };
);

var showBillForm = function(user_id) {
    document.getElementById('new-order-form').style.display='block';
}

var searchUser = function(form) {
    var q = form.search.value;
    db.users.find({
        name: (new RegExp(q))
    },((err,docs)=>{
        var holder = document.getElementById('search-result');
        holder.innerHTML = '';
        for (i in docs) {
            let el = document.createElement('li');
            let a =  document.createElement('a');
            el.className = 'list-group-item';
            a.innerHTML=docs[i].name;
            a.href="#"
            a.onclick=(()=>{showUser(docs[i]._id)});
            el.appendChild(a);
            holder.appendChild(el);
        }
    }))
    return false;
}

var hideCreateUserForm = function() {
        document.getElementById('create-user-form').style.display='block';
}
var showCreateUserForm = function() {
        document.getElementById('create-user-form').style.display='block';
}
