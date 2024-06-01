import './Model.css'
import ModelItem from './ModelItem';
import loading from '../assets/loading.svg';
import { useEffect, useState } from 'react';

type Props = {
    handleToggle: () => void
}

export type Task = {
    id: number,
    title: string,
    description: string,
    created_at: string,
    updated_at: string,
};

function Model({ handleToggle }: Props) {

    const [tasks, setTasks] = useState<Task[] | null | undefined>(null);
    const [input, setInput] = useState({
        title: "",
        description: "",
    });

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(e => e.json())
            .then(data => setTasks(data));
    }, []);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }

    const addTask = async () => {
        const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        });
        const result = await req.json();
        if (req.status == 200) {
            setTasks(prev => {
                return [...(prev as Task[]), result]
            })
            setInput({
                title: '',
                description: '',
            });
        } else {
            alert(result.message);
        }
    }

    const removeTask = async (id: number) : Promise<void> => {
        const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`, {
            method: 'DELETE'
        });
        const result = await req.json();
        if (req.status == 200) {
            setTasks(tasks?.filter(e => e?.id != id));
        }
        alert(result.message);
    }

    const updateTask = (task: Task): void => {
        setTasks(tasks?.map(e => {
            if (e.id == task.id) {
                return task;
            }
            return e;
        }));
    }

    return (
        <div id='model'>
            <div className='model-box'>
                <button className='model-close' onClick={() => handleToggle()}>X</button>
                <div className='model-header'>
                    <div className='model-field'>
                        <input type="text" name="title" value={input.title} onChange={handleOnChange} />
                        <textarea name="description" id="description" rows={3} onChange={handleOnChange} value={input.description} />
                    </div>
                    <button className='model-btn' onClick={async () => await addTask()}>Add</button>
                </div>
                <hr />
                <div className='model-body'>
                    {tasks ? tasks.map((e: any) => {
                        return <ModelItem
                            key={e.id}
                            data={e}
                            removeTask={removeTask}
                            updateTask={updateTask} />
                    }) : <img src={loading} style={{ width: "60px" }} />}
                </div>
            </div>
        </div>
    );
}

export default Model;