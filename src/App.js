import { useEffect, useState } from "react"
import "../src/App.css";
import Dialogbox from "./Dialogbox";
const App = () => {
  const [todo, setTodo] = useState([])
  const [editingFlage, setEditing] = useState(-1)
  function addTodo() {
    console.log("-----Addtodo---")
    let tempTodo = document.getElementById("todoInput").value
    console.log("tempTodo: " + tempTodo)
    if (tempTodo === "") {
      alert("Please add your Todos :")
    }
    else {
      console.log("addTodos in array")
      fetch("/addtodo?title=" + tempTodo)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "Success") {
            setTodo(data.todoList)
            document.getElementById("todoInput").value = ""
          }
          else {
            alert(data.message)
          }
        })
    }
    // if (todo.length>0)
    // {
    //   addToArray(todo[todo.length-1].id+1,tempTodo,false)
    // }
    // else
    // {
    //   addToArray(0,tempTodo,false)
    // }
  }
  useEffect(() => {
    console.log("testing")
    fetch("/getAllTodos")
      .then((res) => res.json())
      .then((data) => setTodo(data.todoList))
  }, [])

  function addToArray(id, text, completed) {
    // let tempTodoObject = {
    //   id: id,
    //   text: text,
    //   completed: completed
    // }
    // todo.push(tempTodoObject)
    // console.log("After push")
    // console.log(todo)
    // setTodo([...todo])
  }
  function deleteTodo(id) {
    todo.map(element => {
      if (element.id === id) {
        fetch('/deleteTodo?id=' + id)
          .then((res) => res.json())
          .then((data) => {
            console.log("befor if condition part", data.status)
            if (data.status === 'Success') {
              console.log("if condition part", data.status)
              setTodo(data.todoList)
            }
            else {
              console.log("else condition part")
              alert(data.message)
            }
          })
        return element.id === id
      }
    })
    // console.log(tempTodo)
    // setTodo([...tempTodo])
  }
  function checkListener(id) {
    console.log("----Checklistener--")
    todo.map(element => {
      if (element.id === id) {
        // element.completed = !element.completed
        fetch('/compeleteTodo?id=' + element.id + "&status=" + !element.status)
          .then((res) => res.json())
          .then((data) => {
            // console.log("data", data)
            if (data.status === "Success") {
              setTodo([...data.todoList])
            }
            else {
              alert(data.message)
            }
          })
      }
      return element
    })
    // console.log(todo)
  }
  function editTodo(id) {
    console.log("-----------editTodo-----")
    console.log("id: " + id)
    setEditing(id)
    console.log(todo)
    setTodo([...todo])
  }
  function updateTodo() {
    console.log("-------Update todo-----")
    console.log("editingFlage: " + editingFlage)
    let tempTodo = todo.map(element => {
      if (element.id === editingFlage) {
        // element.text = document.getElementById("editTodo").value
        fetch('/editTodo?id=' + element.id + "&title=" + document.getElementById("editTodo").value)
          .then((res) => res.json())
          .then((data) => {
            // console.log("data",data)
            if (data.status === "Success") {
              setEditing(-1)
              setTodo([...data.todoList])
            }
            else {
              alert(data.message)
            }
          })
      }
      return element
    })
  }
  return (
    <div className="main-body">
      <h1 className="todoHeading">To-Do Application</h1>
      <h4 className="ownerHeading">"by Shruti Gupta"</h4>
      <Dialogbox addFunction={() => addTodo()} />
      <div  style={{ margin: "50px" }}>
        {
          todo.map(element => {
            return <div>
              {
                element.status ?
                  <div className="compelete-todo">
                    <div className="compelet-todo-text"><s>{element.title + " "}</s></div>
                    <div><input type="checkbox" onChange={() => checkListener(element.id)} true className="compelete-check" /></div>
                  </div> :
                  (element.id === editingFlage ?
                    <div className="todoList">
                      <div className="after-edit"><input type="text" defaultValue={element.title} id="editTodo" /></div>
                      <div>
                        <span className="check-icon">
                          <svg onClick={() => updateTodo()} xmlns="http://www.w3.org/2000/svg" color="blue" width="25" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16" >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                          </svg>
                        </span>
                        <span className="check-icon"><svg onClick={() => deleteTodo(element.id)} xmlns="http://www.w3.org/2000/svg" color="red" width="25" height="25" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                        </svg></span>
                      </div>
                    </div>
                    :
                    <div className="todoList">
                      <div className="text-todo"> {element.title + " "}</div>
                      <div>
                        <span className="check-icon">
                          <svg onClick={() => checkListener(element.id)} xmlns="http://www.w3.org/2000/svg" color="green" width="30" height="30" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                          </svg>
                        </span>
                        <span className="check-icon"> <svg onClick={() => editTodo(element.id)} xmlns="http://www.w3.org/2000/svg" color="blue" width="25" height="25" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                        </svg></span>
                        <span className="check-icon"><svg onClick={() => deleteTodo(element.id)} xmlns="http://www.w3.org/2000/svg" color="red" width="25" height="25" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                        </svg></span>
                      </div>
                    </div>
                  )
              }
            </div>
          })
        }
      </div>
    </div>
  )
}
export default App;