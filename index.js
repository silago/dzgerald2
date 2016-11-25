var Datastore = require('../node_modules/nedb/lib/datastore');
var React     = require('../node_modules/react/react.js')
var ReactDOM   = require('../node_modules/react-dom/index.js')

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
            showUser(_id);
    });
    return false;
};

class UserBillList extends React.Component {
    render() {
        var user = this.props.user;
        user.orders = [
                {
                    date:'22 04 2015',
                    total:10,
                    price:10,
                    items:[
                        {
                            name:'toy',
                            count:10,
                            price:10
                        },
                        {
                            name:'toy2',
                            count:10,
                            price:10
                        }
                    ]
                }
        ];
        return (
            React.createElement('ul',{className:'btn'},
                user.orders.map((item)=>{
                    React.createElement('li',{},item.date+' '+item.total+' товаров. '+item.price+'р.')
                }
            ))
        )
    }
}

class UserBillList extends React.Component {
    render() {
        
    }
}

var showUser =  function(_id) {
    document.getElementById('search-result').style.display='none';
    db.users.find({ _id: _id},((err,docs)=>{
            console.log(docs);
            var e  = docs[0];
            var form = document.getElementById('show-user');
            form.getElementsByTagName('h2')[0].innerHTML = e.name;
            form.getElementsByClassName('phone')[0].innerHTML = e.email;
            form.getElementsByClassName('email')[0].innerHTML = e.phone;
            form.getElementsByClassName('add-bill')[0].onclick = (()=>{
                return showBillForm(e.__id);
            });
            form.style.display='block';

            ReactDOM.render(
              React.createElement(UserBillList,{user:e}),
              document.getElementById('show-user-list')
            );
        }));
}

var Order = new Object({
    add:function(form) {
        var iname  =  form.iname.value;
        var icost  =  form.icost.value;
        this.items.push({
          name:iname,
          cost:icost
        })
        let i = this.items.length;
        form.icost.value='';
        form.iname.value='';
        this.showList();
    },
    showList: function() {
        var list =  document.getElementById('order-content');
        list.innerHTML = '';
        for (i in this.items) {
          let el = document.createElement('li');
          el.className = 'list-group-item';
          el.innerHTML = this.items[i].name + ' ' + this.items[i].cost;
          let a =  document.createElement('a');
          a.innerHTML = 'del';
          a.href="#";
          a.onclick   = ((e)=>{
            this.items.splice(i,1);
            this.showList();
          });
          el.appendChild(a);
          list.appendChild(el);
        }
    },
    submit: function() {
      for(i in this.items ) {
        let item = this.items[i];
        db.users.insert({
                user_id:this.user_id,
                name:item.name,
                cost:item.cost
            },function(err,newDoc) {
                var _id = newDoc._id;
                showUser(_id);
        });
      }
      this.init();
    },
    init:function(user_id) {
        if (user_id != undefined ) {
          this.user_id = user_id;
        }
        this.cost = null,
        this.discount=null,
        this.items=[];
    }
  }
);

var showBillForm = function(user_id) {
    Order.init(user_id);
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




var run = function() {
    return;

    ReactDOM.render(
      React.createElement(DeleteUserButton,{foo:'bar'}),
      document.getElementById('holder')
    );
}
