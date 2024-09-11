const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo'); // Ensure the correct path to the model

const app = express();
app.use(cors({
  origin: 'http://localhost:5174',
}));
app.use(express.json());

// MongoDB Connection with proper options and error handling
mongoose.connect('mongodb://localhost:27017/myNewDatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Successfully connected to MongoDB');
})
.catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

app.get('/api/get',(req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})
// Add a todo task
app.post('/api/add', (req, res) => {
    const task = req.body.task;

    if (!task) {
        return res.status(400).send('Task is required');
    }

    TodoModel.create({ task: task })
    .then(result => {
        console.log('Task added:', result); // Log the result to verify insertion
        res.status(201).json(result); // Send a response with the created task
    })
    .catch(err => {
        console.error('Error inserting task:', err); // Log any errors
        res.status(500).json({ message: 'Error adding task' });
    });
});

// app.put('/update/:id', (req, res)=> {
//     const {id} =  req.params;
//     console.log("id:",id);
//     TodoModel.findByIdAndUpdate({_id:id},{done: true})
//     .then(result => res.json(result))
//     .catch(err => res.json(err))
    
// })

// Add this route to handle updating a todo item by ID
// app.put('/update/:id', (req, res) => {
//     const id = req.params.id;
//     const { done } = req.body;  // Assuming you want to toggle the 'done' status

//     TodoModel.findByIdAndUpdate(id, { done: done }, { new: true })  // Update the 'done' status of the todo item
//         .then(result => res.status(200).json(result))
//         .catch(err => res.status(500).json({ message: 'Error updating task', error: err }));
// });

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { done } = req.body;

    // Find the task by ID and update its 'done' status
    TodoModel.findByIdAndUpdate(id, { done: done }, { new: true })
        .then(updatedTask => {
            if (!updatedTask) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(200).json(updatedTask);
        })
        .catch(err => res.status(500).json({ message: 'Error updating task', error: err }));
});



app.delete('/delete/:id',(req,res)=>{
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
