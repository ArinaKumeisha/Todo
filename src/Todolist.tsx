import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import Buttons from "./components/Button/Buttons";
import Input from "./components/Input/Input";
import EditableSpan from "./components/EditableSpan/EditableSpan";


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
    upDateTaskTitle: (title: string, todolistID: string, taskId: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    const universalFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(props.todolistID, value)
    }
    const addTaskHandler = () => {
        props.addTask(props.title, props.todolistID)
    }

    return <div>
        <h3>{props.title}</h3>
        <Input addItem={addTaskHandler}/>
        <div className={'both'}>
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

                        <EditableSpan title={t.title}
                                      callback={(title: string) => props.upDateTaskTitle(title, props.todolistID, t.id)}/>

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
