import React from 'react';
import {FilterValuesType} from '../../App';
import styles from './Button.module.css'

type PropsType = {
    name: string
    callback: () => void
    filter?: FilterValuesType
}


const Buttons = (props: PropsType) => {

    const onAllClickHandler = () => {
        props.callback();
    }
    return (
        <button
            className={props.filter === props.name ? styles.activeFilter : ''}
            onClick={onAllClickHandler}>{props.name}</button>
    );
}

export default Buttons;