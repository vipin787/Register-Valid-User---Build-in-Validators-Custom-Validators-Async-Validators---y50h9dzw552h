var mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Write your Schema with Async Validators .
//When a new user try to register you need to makesure there is no User exist with current email adress.

var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function(value) {
        const user = await this.constructor.findOne({ email: value });
        if (user) {
          throw new Error('Email already exists');
        }
      },
      message: props => `${props.value} is already taken`
    }
  },
  password: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model("User", userSchema);
