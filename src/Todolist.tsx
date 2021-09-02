import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from './App';
import Buttons from "./components/Button/Buttons";
import Input from "./components/Input/Input";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistID: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistID: string) => void
    filter: FilterValuesType
}

export const Todolist = React.memo((props: PropsType) => {
    const universalFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(props.todolistID, value)
    }

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim(), props.todolistID);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    return <div>
        <h3>{props.title}</h3>
        <div className={'both'}>
            <Input
                title={title}
                todolistID={props.todolistID}
                setTitle={setTitle}
                addTask={addTask}
                setError={setError}
                error={error}/>
            <Buttons
                callback={addTask}
                name={'+'}/>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const removeHandler = () => props.removeTask(t.id, props.todolistID)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistID);
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input
                            type="checkbox"
                            onChange={onChangeHandler}
                            checked={t.isDone}/>
                        <span>{t.title}</span>

                        <Buttons callback={removeHandler} name={'X'}/>
                    </li>
                })
            }
        </ul>

        <div>
            <Buttons
                name={'all'}
                callback={() => universalFilterHandler('all')}
                filter={props.filter}/>
            <Buttons
                name={'completed'}
                callback={() => universalFilterHandler('completed')}
                filter={props.filter}/>
            <Buttons
                name={'active'}
                callback={() => universalFilterHandler('active')}
                filter={props.filter}/>

        </div>
    </div>
})
