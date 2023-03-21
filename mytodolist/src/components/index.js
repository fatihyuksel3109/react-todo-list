import './styles.css'
import React, { useState} from 'react';
import Footer from './footer/Footer.js';

const Initial_State =[
  { id: 1, title: "Learn HTML,CSS, JavaScript", completed: true },
  { id: 2, title: "Learn React", completed: false},
  { id: 3, title: "Learn a new language", completed: false },
  { id: 4, title: "Run twice a week", completed: true},
  { id: 5, title: "Drink 2 litres of water", completed: false },
  { id: 6, title: "Move to a new country", completed: false}
]

function TodoList() {
  const [todo, setTodo] = useState('');
  //The "Initial_State" is the initial value of the toDoList state.
  const [toDoList, setToDoList] = useState(Initial_State);
  //"filterStatus" variable can be used to filter the to-do items based on a certain status chosen by the user.
  const [filterStatus, setFilterStatus] = useState(null);
  //
  const [idToEdit, setIdToEdit] = useState(0);
  const [nameToEdit, setNameToEdit] = useState('');


  const handleChange = event => {
    setTodo(event.target.value);
  };

  //The function, named handleSubmit, takes an event parameter. Firstly, it calls the event.preventDefault() method to prevent the page from being refreshed.
  //This code snippet can be used to add a new item to a todo list when a form is submitted or the Enter key is pressed.
  //setTodo('') is used to update the todo variable with an empty value, clearing the input field.
  const handleSubmit = (event) => {

    event.preventDefault();

    if (todo ===''){
      return;
    }
    let count = toDoList.length;
    setToDoList([...toDoList, {id:count+1, title:todo, completed:false}]);
    setTodo('');
  };

  //Firstly, a .map() method is called on the elements in the toDoList array.
  //This method creates a new array called updateToDoList and performs an operation for each item.
  //This code snippet can be used to determine whether an item in a todo list has been completed or not, and to update the state of the toDoList array when an item's completion status changes.
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

  //This code snippet can be used to remove a specific item from a todo list and update the state of the toDoList array.
  function removeItem(id){
    setToDoList(toDoList.filter(x=>x.id !== id));
  }

  //This code snippet can be used to remove completed items from a todo list and update the state of the toDoList array.
  function clearCompleted(){
    setToDoList(toDoList.filter(x=>x.completed === false));
  }

  function toggleAll(event)
  {
    setFilterStatus(event.target.checked ? null : 999);
  }

  function updateIdToEdit(id)
  {
    setIdToEdit(id);
    setNameToEdit(toDoList.find(x=>x.id === id).title);
  }

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

export default TodoList;
