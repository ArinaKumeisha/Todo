import React from 'react';
import {FilterValuesType} from '../../App';
import styles from './Button.module.css'

type PropsType = {
    todolistID: string
    name: FilterValuesType
    callback: (todolistID: string, value: FilterValuesType) => void
    filter: FilterValuesType
}


const Buttons = (props: PropsType) => {
    const onAllClickHandler = () => {
        props.callback(props.todolistID, props.name);
    }
    return (
        <button
            className={props.filter === props.name ? styles.activeFilter : ''}
            onClick={onAllClickHandler}>{props.name}</button>
    );
}

export default Buttons;