import { useParams } from 'react-router-dom';
import { useCallback } from 'react';

export default function AddTaskPage({state, setState, navigate}){
    const { groupId } = useParams();
    const handlerSubmit = useCallback(e => {
        const groups = Object.assign([], state.groups);
        groups[groupId].tasks.push({id: state.groups[groupId].tasks.length,
            name: e.target[0].value,
            date: e.target[1].value,
            priority: e.target[2].value,
            description: e.target[3].value});
        setState({...state, groups: groups});
        e.preventDefault();
        navigate("/" + groupId);
    }, [state]);
    return (
        <div>
            <hr/>
            <form onSubmit={handlerSubmit} className="add-task" method="POST">
                <div className="item">
                    <label>Название: </label>
                    <input type="text" required/>
                </div>
                <div className="item">
                    <label>Дата: </label>
                    <input type="datetime-local" required/>
                </div>
                <div className="item">
                    <label>Приоритет: </label>
                    <input type="number" min={1} max={10} required/>
                </div>
                <div>
                    <label>Описание: </label>
                    <br/>
                    <textarea/>
                </div>
                <div className="btn">
                    <button>Добавить</button>
                </div>
            </form>
        </div>
    );
}