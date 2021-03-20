require("dotenv").config();
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection
db.on('error', (error) => console.log(error));
db.on('open', ()=> console.log("Connected to databse"))

const { Schema } = mongoose;
const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  admin: {type: Boolean}
});

const cardSchema = new Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
  });

const quizSchema = new Schema({
    name: { type: String, required: true },
    cards: [cardSchema]
  });
  
  const createAndSaveUser = (user, done) => {
    const person = new Person({ name: 'Hakim', age: 30, favoriteFoods: ["Batata, Fraise"] });
    person.save((err, data) => {
    if (err){
      done(err);
    }
    done(null , data);
  });
  };