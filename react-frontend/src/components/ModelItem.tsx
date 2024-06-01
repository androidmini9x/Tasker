import { useState } from "react";
import { Task } from "./Model";

type Props = {
    data : Task;
    removeTask: (id: number) => Promise<void>;
    updateTask: (task: Task) => void
}

function ModelItem({data, removeTask, updateTask} : Props) {

    const [edit, setEdit] = useState(false);
    const [input, setInput] = useState(data);

    const handleSave = async (id: number) => {
        const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: input.title,
                description: input.description,
            })
        });
        const result = await req.json();
        if (req.status === 200) {
            setEdit(false);
            updateTask(input);
        }
        alert(result.message);
    };

    const handleRemove = (id: number) => {
        removeTask(id);
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <div className='model-item'>
            {edit ? <input type="text" name="title" value={input?.title} onChange={handleOnChange}/>
                : <h3>{input?.title}</h3> }
            {edit ? <textarea name="description" id="description" rows={5} onChange={handleOnChange} value={input?.description} />
                : <p>{input?.description}</p>}
            <div className="model-item-footer">
                <ul>
                    {edit ? <li className="btn-save" onClick={() => handleSave(input.id)}>Save</li>
                        : <li className="btn-edit" onClick={() => setEdit(true)}>Edit</li>}
                    <li onClick={() => handleRemove(data.id)}>Delete</li>
                </ul>
            </div>
        </div>
    );
}

export default ModelItem;