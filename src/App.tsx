import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

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
            ],
            [todolistID2]: [
                {id: v1(), title: "ReactJS", isDone: true},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ]
        }
    );

    function removeTask(id: string, todolistID: string) {
        tasks[todolistID] = tasks[todolistID].filter(t => t.id !== id);
        setTasks({...tasks});
    }

    function addTask(title: string, todolistID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        };
        const copyTasks = {...tasks}
        copyTasks[todolistID] = [newTask, ...tasks[todolistID]]
        setTasks(copyTasks);
    }

    function changeStatus(taskId: string, isDone: boolean, todolistID: string) {
        let task = tasks[todolistID].find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTodolists([...todolists])
        setTasks({...tasks});
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        let newTodolist = todolists.map(td => td.id === todolistID ? {...td, filter: value} : td)
        setTodolists(newTodolist)
    }

    return (
        <div className="App">
            {todolists.map(td => {
                let tasksForTodolist = tasks[td.id];
                if (td.filter === "active") {
                    tasksForTodolist = tasks[td.id].filter(t => t.isDone === false);
                }
                if (td.filter === "completed") {
                    tasksForTodolist = tasks[td.id].filter(t => t.isDone === true);
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
                    />
                )
            })}

        </div>
    );
}

export default App;
