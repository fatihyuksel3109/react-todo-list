import './styles.css'
import React, { useState} from 'react';
import Footer from './footer/Footer.js';

const Initial_State =[   //The "Initial_State" is the initial value of the toDoList state.
  { id: 1, title: "Learn HTML,CSS, JavaScript", completed: true },
  { id: 2, title: "Learn React", completed: false},
  { id: 3, title: "Learn a new language", completed: false },
  { id: 4, title: "Run twice a week", completed: true},
  { id: 5, title: "Drink 2 litres of water", completed: false },
  { id: 6, title: "Move to a new country", completed: false}
]

export default function TodoList() {
  const [todo, setTodo] = useState('');
  //"todo": a string that represents the user's input for a new todo item.
  const [toDoList, setToDoList] = useState(Initial_State);
  //"toDoList": an array of objects representing the list of todo items, where each object has an "id", a "title" string, and a "completed" boolean.
  //"filterStatus": a boolean value that is used to filter the todo list based on whether items are completed or not.
  const [filterStatus, setFilterStatus] = useState(null);
  //
  const [idToEdit, setIdToEdit] = useState(0);
  const [nameToEdit, setNameToEdit] = useState('');
  //"idToEdit" and "nameToEdit": variables that are used to edit the title of an existing todo item.


  //The "handleChange" function is used to update the todo state when the user types in the input field.
  const handleChange = (event) => { 
    setTodo(event.target.value);
  };

  //The "handleSubmit" function is used to add a new item to the todo list when the form is submitted or the Enter key is pressed. It prevents the page from being refreshed using" event.preventDefault()", checks if the input is empty, creates a new object with a unique "id", sets the completed property to "false", and adds the new object to the "toDoList" array using the "setToDoList" function.
  //"setTodo('')" is used to update the todo variable with an empty value, clearing the input field.
  const handleSubmit = (event) => {

    event.preventDefault();

    if (todo ===''){
      return;
    }
    let count = toDoList.length;
    setToDoList([...toDoList, {id:count+1, title:todo, completed:false}]);
    setTodo('');
  };


  //The "handleCompleted" function is used to update the "completed" property of a todo item when the checkbox is checked or unchecked. It uses the "map" method to create a new array of todo items with the updated completed property and updates the "toDoList" state using "setToDoList".
  function handleCompleted(event, id) {
    const updateToDoList = toDoList.map(item => {
      if(item.id === id){
        return {
          ...item,
          completed: event.target.checked
        }
      }
      else{
        return item;
      }
    });

    setToDoList(updateToDoList);
  };

  //The "removeItem" function is used to remove a specific item from the "toDolist". It uses the "filter" method to create a new array without the item and updates the "toDoList" state using "setToDoList".
  function removeItem(id){
    setToDoList(toDoList.filter(x=>x.id !== id));
  }

  //The "clearCompleted" function is used to remove all completed items from the todo list. It uses the "filter" method to create a new array without the completed items and updates the "toDoList" state using "setToDoList".
  function clearCompleted(){
    setToDoList(toDoList.filter(x=>x.completed === false));
  }

  //The "toggleAll" function is used to toggle the "filterStatus" state between "null" and "999", which are used to show all items or only completed items respectively.
  function toggleAll(event)
  {
    setFilterStatus(event.target.checked ? null : 999);
  }

  //The "updateIdToEdit" function is used to set the "idToEdit" and "nameToEdit" states when an item is clicked for editing. It finds the title of the item with the given id and updates the "nameToEdit" state with it.
  function updateIdToEdit(id)
  {
    setIdToEdit(id);
    setNameToEdit(toDoList.find(x=>x.id === id).title);
  }

  //The "handleEdit" function is used to update the title property of an existing item when the user types in the edit input field. It uses the "map" method to create a new array of todo items with the updated title property and updates the "toDoList" state using "setToDoList".
  function handleEdit (event,id) {
    setNameToEdit(event.target.value);

    const listToUpdate = toDoList.map(item=> {
        if(item.id === id) {
          return {
            ...item,
            title: event.target.value
          }
        }
        else
        {
          return item;
        }
      });

    setToDoList(listToUpdate);
  };

  function handleBlur() {
    setIdToEdit(0);
  }


  return (
    <section className='todoapp'>
      <div>
        <form className='header' onSubmit={handleSubmit}>
          <h1>todos</h1>
          <input className='new-todo' placeholder='What needs to be done?' value={todo} onChange={handleChange} />
        </form>
        <section className='main'>
         <div>
         <input defaultChecked={true} type="checkbox"  onChange={(event) => toggleAll(event)} id="toggle-all" className="toggle-all" />
         <label htmlFor="toggle-all" ></label>
         <ul className='todo-list'>
           {toDoList.filter(x => filterStatus === null || x.completed === filterStatus).map((item) => (
            <li key={item.id} className={((item.completed && item.id === idToEdit) ? "completed editing" : ((!item.completed && item.id === idToEdit) ? "editing": (item.completed && item.id !== idToEdit ? "completed" : "")))}>
              <div className="view" >
                <input className="toggle" type="checkbox" onChange={(event) => handleCompleted(event,item.id)} defaultChecked={item.completed}/>
                  <label onClick={() => updateIdToEdit(item.id)}>{item.title}</label>
                  <button className="destroy" onClick={() => removeItem(item.id)}>
                  </button>
              </div>
              <input onBlur={handleBlur} className="edit" value={nameToEdit} onChange={(event) => handleEdit(event,item.id)}/>
            </li>
           ))}
          </ul>
         </div>
        </section>
        <footer className='footer'>
          <Footer filterStatus={filterStatus} setFilterStatus={setFilterStatus} count={toDoList.filter(x => x.completed === false).length}/>
          <button className="clear-completed" onClick={() => clearCompleted()}>
		      	Clear completed
		      </button>
        </footer>
      </div>
    </section>
  );
}
