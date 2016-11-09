db = {};
db.users = new Datastore('db/users.db');
db.robots = new Datastore('db/robots.db');

var addNewUser = function(name,email,phone) {
    db.users.insert({
            name:name,
            email:email,
            phone:phone
        });
};

db.insert(doc, function (err, newDoc) {   // Callback is optional
  // newDoc is the newly inserted document, including its _id
  // newDoc has no key called notToBeSaved since its value was undefined
});
}
