import React, {ChangeEvent, useState} from 'react';


type PropsType = {
    title: string
    callback:(title:string) => void
}
const EditableSpan = (props: PropsType) => {
    const [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.title)

    const onEditMode = () => {
        setEditMode(true)
    }
    const ofEditMode = () => {
        setEditMode(false)
    }

    const onchangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editMode?
            <input value={title}  onChange={onchangeHandler} onBlur={ofEditMode} autoFocus={true}
            />
            :
            <span onDoubleClick={onEditMode} >{title}</span>


    );
};

export default EditableSpan;