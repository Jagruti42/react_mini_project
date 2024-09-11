// const mongoose = require('mongoose');

// // const TodoSchema = new mongoose.Schema({
// //    task: String,
    
// // })

// const todoSchema = new mongoose.Schema({
//    task: {
//      type: String,
//      done: {
//       type: Boolean,
//       default: false
//      }
//    },
//  });

// const TodoModel = mongoose.model("todots", todoSchema)
// module.exports = TodoModel


const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    task: { type: String, required: true },
    done: { type: Boolean, default: false },  // Ensure this field exists
});

const TodoModel = mongoose.model('todots', TodoSchema);
module.exports = TodoModel;
