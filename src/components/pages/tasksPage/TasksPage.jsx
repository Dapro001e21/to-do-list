import { Link, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import Task from '../../task/Task';

export default function TasksPage({state, setState}){
    const[search, setSearch] = useState({searchTasks: null, searchBlock: {type: "text", block: "имя", sid: "0"}});
    const { groupId } = useParams();
    useEffect(() => {
        setState({...state, selectGroupId: groupId});
    }, []);
    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    };
    const delTask = useCallback(id => {
        setState({...state, groups: state.groups.map(group => {
            if(group.id == groupId){
                group.tasks = group.tasks.filter(task => task.id != id);
            }
            return group;
        })});
    });
    const searchTask = useCallback(e => {
        let searchTasks = null;
        switch(search.searchBlock.sid){
            case "0":
                searchTasks = state.groups[groupId].tasks.filter(task => task.name.includes(e.target[0].value));
                break;
            case "1":
                searchTasks = state.groups[groupId].tasks.filter(task => task.date.split("T")[0] == e.target[0].value);
                break;
            case "2":
                searchTasks = state.groups[groupId].tasks.filter(task => task.date.split("T")[1] == e.target[0].value);
                break;
            case "3":
                searchTasks = state.groups[groupId].tasks.filter(task => task.priority == e.target[0].value);
                break;
            case "4":
                searchTasks = state.groups[groupId].tasks.filter(task => task.description.includes(e.target[0].value));
                break;
        }
        setSearch({...search, searchTasks: searchTasks});
        e.preventDefault();
    })
    const selectType = useCallback(e => {
        let type = "";
        let block = "";
        switch(e.target.value){
            case "0":
                type = "text";
                block = "имя";
                break;
            case "1":
                type = "date";
                break;
            case "2":
                type = "time";
                break;
            case "3":
                type = "number";
                block = "приоритет";
                break;
            case "4":
                type = "text";
                block = "описание";
                break;
                
        }
        setSearch({...search, searchBlock: {type: type, block: block, sid: e.target.value}});
    });
    return (
        <div>
            <hr/>
            <Link to="add">
                <button>Добавить</button>
            </Link>
            <form onSubmit={searchTask} className="task-search">
                <input type={search.searchBlock.type} max={10} min={1} placeholder={"Введите " + search.searchBlock.block}/>
                <label> Поиск по: </label>
                <select onChange={selectType}>
                    <option value={0}>Имени</option>
                    <option value={1}>Дате</option>
                    <option value={2}>Времени</option>
                    <option value={3}>Приоритету</option>
                    <option value={4}>Описанию</option>
                </select>
                <button>Поиск</button>
            </form>
            <div className="tasks">
                {search.searchTasks == null && state.groups[groupId].tasks.map(task => <Task id={task.id}
                name={task.name}
                date={new Date(task.date).toLocaleString("ru", options)}
                priority={task.priority}
                description={task.description}
                onDel={delTask}/>)}
                {search.searchTasks != null && search.searchTasks.map(task => <Task id={task.id}
                name={task.name}
                date={new Date(task.date).toLocaleString("ru", options)}
                priority={task.priority}
                description={task.description}
                onDel={delTask}/>)}
            </div>
        </div>
    );
}