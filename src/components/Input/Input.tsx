import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Buttons from "../Button/Buttons";

type PropsType = {
    todolistID: string
    title: string
    setTitle: (title: string) => void
    addTask: () => void
    setError: (error:string|null) => void
    error: string|null
}
const Input = (props: PropsType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        props.setError(null);
        if (e.charCode === 13) {
            props.addTask();
            props.setTitle('')
        }
    }

    return (
        <div>
            <input value={props.title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={props.error ? "error" : ""}
            />

            {props.error && <div className="error-message">{props.error}</div>}
        </div>
    );
};

export default Input;