const mongoose= require('mongoose');
let mongoUrl = "mongodb+srv://admin:Admin123@cluster0.ckjla.mongodb.net/mydb?retryWrites=true&w=majority";
// let mongoUrl = 'mongodb://root:example@mongo';
let mongoClientOptions = { useNewUrlParser:true, useUnifiedTopology: true };
const TodoItem = require('./models/todo.js');


// mongoose.connect(mongoUrl, mongoClientOptions)
//   .then((result) => console.log('Connected to db'))
//   .catch((err) => console.log(err));

// TodoItem.find({},{ "_id": 0, "id": 1, "name": 1 , "completed": 1})
//   .then((result) => console.log(result));

// let mongoUrl = process.env.MONGO_URI;

async function init() {
  console.log("mongo url: "+mongoUrl);
  mongoose.connect(mongoUrl, mongoClientOptions)
  .then((result) => console.log('Connected to db'))
  .catch((err) => console.log(err));
}

async function teardown() {
  mongoose.disconnect()
  .then((result) => console.log('Disconnected'))
  .catch((err) => console.log(err));
}



async function getItems() {

  return new Promise((acc, rej) => {

    results = TodoItem.find({},{ "_id": 0, "id": 1, "name": 1 , "completed": 1})
      .then((results) => {
        console.log(results);
        acc(results);
      })
  });
}

async function getItem(name) {
  console.log("getItem: " + name);

  return new Promise((acc, rej) => {
    TodoItem.findOne({'name':name},{ "_id": 0, "id": 1, "name": 1 , "completed": 1})
      .then((results) => {
        console.log("getItem result:" + results);
        acc(results);
      })
    }
  );
}

async function storeItem(item) {
  const todo = new TodoItem({
    'id': item.id,
    'name': item.name,
    'completed': item.completed
  });

  todo.save()
    .then((result) => {
      console.log(result);
      return new Promise((acc, rej) => {
        acc();
      });
    });
}

async function updateItem(id2, item) {
  console.log("updating item:" + id2 + " item: " + item.name +" " + item.completed);

  TodoItem.findOne({name: item.name}, { "_id": 1, "id": 1, "name": 1 , "completed": 1})
  .then((result)=>{
    result.completed = item.completed;
    result.save().then((result2) => {
      return new Promise((acc, rej) => {
        console.log("saved: " + result2);
        acc(result2);
      });
    }).catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));

}

async function removeItem(id) {
  TodoItem.deleteOne({'id':id})
    .then((result) => {
      console.log(result);
      return new Promise((acc, rej) => {
        acc();
      });
    });
}

module.exports = {
  init,
  teardown,
  getItems,
  getItem,
  storeItem,
  updateItem,
  removeItem,
};
