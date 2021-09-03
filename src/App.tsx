import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import Input from "./components/Input/Input";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todolistID1 = v1()
    const todolistID2 = v1()
    let [todolists, setTodolists] = useState<TodolistsType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'active'},
    ])
    let [tasks, setTasks] = useState<TasksStateType>({
            [todolistID1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: false},
                {id: v1(), title: "JS", isDone: false},
            ],
            [todolistID2]: [
                {id: v1(), title: "ReactJS", isDone: true},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ]
        }
    );
    const addTodoList = (title: string) => {
        const newId = v1()
        setTodolists([{id: newId, title, filter: 'all'}, ...todolists])
        setTasks({...tasks, [newId]: []})
    }

    function removeTask(id: string, todolistID: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== id)})
    }

    function addTask(title: string, todolistID: string) {
        setTasks({
            ...tasks, [todolistID]:
                [{id: v1(), title: title, isDone: false}, ...tasks[todolistID]]
        })
    }

    function changeStatus(taskId: string, isDone: boolean, todolistID: string) {
        tasks[todolistID] = tasks[todolistID].map(t => taskId === t.id ? {...t, isDone: isDone} : t)
        setTasks({...tasks})
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        let newTodolist = todolists.map(td => td.id === todolistID ? {...td, filter: value} : td)
        setTodolists(newTodolist)
    }
const upDateTaskTitle = (title: string, todolistID: string, taskId: string) => {
        tasks[todolistID] = tasks[todolistID].map(t => t.id === taskId ? {...t, title: t.title} : t)
}
     return (
        <div className="App">
            <Input addItem={addTodoList}/>
            {todolists.map(td => {
                let tasksForTodolist = tasks[td.id];
                if (td.filter === "active") {
                    tasksForTodolist = tasks[td.id].filter(t => !t.isDone);
                }
                if (td.filter === "completed") {
                    tasksForTodolist = tasks[td.id].filter(t => t.isDone);
                }
                return (
                    <Todolist
                        key={td.id}
                        todolistID={td.id}
                        title={td.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={td.filter}
                        upDateTaskTitle={upDateTaskTitle}
                    />
                )
            })
            }
        </div>
    );
}

export default App
