import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    addItem: (title: string) => void
}
const Input = (props: PropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        const validateTitle = title.trim()
        if (validateTitle) {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
       setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTaskHandler();
            setTitle('')
        }
    }

    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTaskHandler}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default Input;