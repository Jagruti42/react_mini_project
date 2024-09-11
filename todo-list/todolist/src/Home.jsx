// // import React, { useEffect, useState } from 'react'
// // import Create from './Create'
// // import axios from 'axios'

// // function Home() {
// //     const [todos, setTodos]=useState([])
// //     useEffect (()=>{
// //       axios.get('http://localhost:5000/get')
// //       .then(result => setTodos(result.data))
// //       .catch(err => console.log(err))
// //     },[])
// //   return (
// //     <div className="home">
// //       <h2>Todo List</h2>
// //       <Create />
// //       {
// //         todos.length === 0 
// //         ?
// //         <div><h2>No Record</h2></div>
// //         :  
// //         todos.map(todo => (
// //             <div>
// //                 {todo.task}
// //             </div>
// //         ))
// //       }

// //     </div>
// //   )
// // }

// // export default Home

// import React, { useEffect, useState } from 'react';
// import Create from './Create';
// import axios from 'axios';

// function Home() {
//     const [todos, setTodos] = useState([]);

//     useEffect(() => {
//         // Fetch data from the backend
//         axios.get('http://localhost:5000/api/get')
//             .then(result => setTodos(result.data))
//             .catch(err => console.error('Error fetching todos:', err)); // More descriptive error logging
//     }, []);

//     const handleEdit = (id) => {
//       axios.get('http://localhost:5000/update'+id)
//       .then(result => {
//         location.reload()
//       })
//       .catch(err => console.error( err)); // More descriptive error logging
//     }

//     const handleDelete = (id) => {
//       axios.get('http://localhost:5000/delete/'+id)
//       .then(result => {
//         location.reload()
//       })
//       .catch(err => console.error( err)); // More descriptive error logging
//     }

//     return (
//         <div className="home">
//             <h2>Todo List</h2>
//             <Create />
//             {todos.length === 0 ? (
//                 <div><h2>No Record</h2></div>
//             ) : (
//                 // Display the todo list
//                 todos.map(todo => (
//                     <div className='task'>  {/* css property */}
//                       <div className='checkbox' onClick={() =>handleEdit(todo._id)}>
//                        {todo.done ? 
//                        <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
//                       :<BsCircleFill className='icon'/>
//                       }
//                         <p className={todo.done ? "line-through" : ""}>{todo.task}</p>
//                       </div>
//                       <div>
//                          <span><BsFillTrashFill className='icon' 
//                          onClick={() => handleDelete(todo._id)}/></span>
//                       </div>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// }

// export default Home;


// import React, { useEffect, useState } from 'react';
// import Create from './Create';
// import axios from 'axios';
// import { BsFillCheckCircleFill, BsCircleFill, BsFillTrashFill } from 'react-icons/bs';  // Import icons

// function Home() {
//     const [todos, setTodos] = useState([]);

//     useEffect(() => {
//         // Fetch data from the backend
//         axios.get('http://localhost:5000/api/get')
//             .then(result => setTodos(result.data))
//             .catch(err => console.error('Error fetching todos:', err));
//     }, []);

  
//   const handleEdit = (id, doneStatus) => {
//     console.log("Toggling task status for ID:", id, "Current Status:", doneStatus);
    
//     axios.put(`http://localhost:5000/update/${id}`, { done: !doneStatus })  // Toggle the status
//         .then(() => location.reload())
//         .catch(err => console.error('Error updating task:', err));
// };

//     const handleDelete = (id) => {
//       console.log("Toggling task status for ID:", id, "Current Status:", doneStatus);
    
//       axios.put(`http://localhost:5000/delete/${id}`, { done: !doneStatus })  // Toggle the status
//           .then(() => location.reload())
  
//     };

//     return (
//         <div className="home">
//             <h2>Todo List</h2>
//             <Create />
//             {todos.length === 0 ? (
//                 <div><h2>No Record</h2></div>
//             ) : (
//                 todos.map(todo => (
//                     <div className='task' key={todo._id}>  {/* Added key */}
//                         {/* <div className='checkbox' onClick={() => handleEdit(todo._id)}>
//                             {todo.done ? 
//                                 <BsFillCheckCircleFill className='icon' /> :
//                                 <BsCircleFill className='icon' />
//                             }
//                             <p className={todo.done ? "line-through" : ""}>{todo.task}</p>
//                         </div> */}
//                         <div className='checkbox' onClick={() => handleEdit(todo._id, todo.done)}>
//                             {todo.done ? 
//                                 <BsFillCheckCircleFill className='icon' /> :
//                                 <BsCircleFill className='icon' />
//                             }
//                             <p className={todo.done ? "line-through" : ""}>{todo.task}</p>
//                         </div>

//                         <div>
//                             <span><BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)} /></span>
//                         </div>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// }

// export default Home;


import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsFillCheckCircleFill, BsCircleFill, BsFillTrashFill } from 'react-icons/bs';  // Import icons

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        // Fetch data from the backend
        axios.get('http://localhost:5000/api/get')
            .then(result => setTodos(result.data))
            .catch(err => console.error('Error fetching todos:', err));
    }, []);

    // Handle editing the task (toggle 'done' status)
    // const handleEdit = (id, doneStatus) => {
    //     console.log("Toggling task status for ID:", id, "Current Status:", doneStatus);
        
    //     axios.put(`http://localhost:5000/update/${id}`, { done: !doneStatus })  // Toggle the status
    //         .then(() => location.reload())  // Reload the page to fetch updated data
    //         .catch(err => console.error('Error updating task:', err));
    // };
    const handleEdit = (id, doneStatus) => {
      console.log("Toggling task status for ID:", id, "Current Status:", doneStatus);
      
      // Toggle the 'done' status of the task
      axios.put(`http://localhost:5000/update/${id}`, { done: !doneStatus })
          .then(() => {
              // Update the state to reflect the change without reloading the page
              setTodos(todos.map(todo => 
                  todo._id === id ? { ...todo, done: !doneStatus } : todo
              ));
          })
          .catch(err => console.error('Error updating task:', err));
  };
  

    // Handle deleting a task
    const handleDelete = (id) => {
        console.log("Deleting task with ID:", id);
        
        axios.delete(`http://localhost:5000/delete/${id}`)  // Use DELETE method
            .then(() => location.reload())  // Reload the page to fetch updated data
            .catch(err => console.error('Error deleting task:', err));
    };

    return (
        <div className="home">
            <h2>Todo List</h2>
            <Create />
            {todos.length === 0 ? (
                <div><h2>No Record</h2></div>
            ) : (
                todos.map(todo => (
                  <div className='task' key={todo._id}>
                  <div className='checkbox' onClick={() => handleEdit(todo._id, todo.done)}>
                      {todo.done ? 
                          <BsFillCheckCircleFill className='icon' /> :
                          <BsCircleFill className='icon' />
                      }
                      <p className={todo.done ? "line-through" : ""}>{todo.task}</p> {/* Apply line-through when done */}
                  </div>
                        <div>
                            <span><BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)} /></span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Home;
