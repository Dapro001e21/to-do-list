import { useParams } from 'react-router-dom';
import { useCallback, useState } from 'react';

export default function EditTaskPage({state, setState, navigate}){
    const { groupId, taskId } = useParams();
    const [data, setData] = useState({
        id: state.groups[groupId].tasks[taskId].id,
        name: state.groups[groupId].tasks[taskId].name,
        date: state.groups[groupId].tasks[taskId].date,
        priority: state.groups[groupId].tasks[taskId].priority,
        description: state.groups[groupId].tasks[taskId].description
    });
    const handlerSubmit = useCallback(e => {
        setState({...state, groups: state.groups.map(group => {
            if(group.id == groupId){
                group.tasks[taskId] = data;
            }
            return group;
        })});
        e.preventDefault();
        navigate("/" + groupId);
    });
    return (
        <div>
            <hr/>
            <form onSubmit={handlerSubmit} className="add-task" method="POST">
                <div className="item">
                    <label>Название: </label>
                    <input type="text" value={data.name} onChange={e => setData({...data, name: e.target.value})} required/>
                </div>
                <div className="item">
                    <label>Дата: </label>
                    <input type="datetime-local" value={data.date} onChange={e => setData({...data, date: e.target.value})} required/>
                </div>
                <div className="item">
                    <label>Приоритет: </label>
                    <input type="number" min={1} max={10} value={data.priority} onChange={e => setData({...data, priority: e.target.value})} required/>
                </div>
                <div>
                    <label>Описание: </label>
                    <br/>
                    <textarea value={data.description} onChange={e => setData({...data, description: e.target.value})}/>
                </div>
                <div className="btn">
                    <button>Сохранить</button>
                </div>
            </form>
        </div>
    );
}