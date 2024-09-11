import React, { useState } from 'react';
import axios from 'axios';

function Create() {
    const [task, setTask] = useState(''); // Initialize as an empty string

    const handleAdd = () => {
        axios.post('http://localhost:5000/api/add', { task: task }) // Updated URL        
        .then(result => {
          location.reload()
        })
        .catch(err => console.log(err));
        console.log("task recive",task);
    };

    return (
        <div className="home">
            <div className="create_form">
                <input 
                    type="text" 
                    placeholder="Enter task.." 
                    onChange={(e) => setTask(e.target.value)} // Corrected onChange function
                    value={task} // Controlled component
                />
                <button type="button" onClick={handleAdd}>Add</button>
            </div>
        </div>
    );
}

export default Create;
