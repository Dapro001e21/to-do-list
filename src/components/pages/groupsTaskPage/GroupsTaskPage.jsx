import { useCallback, useEffect, useState } from 'react';
import GroupTask from '../../groupTask/GroupTask';

export default function GroupsTaskPage({state, setState, navigate}){
    const[searchGroups, setSearchGroups] = useState();
    useEffect(() => {
        setState({...state, selectGroupId: null});
    }, []);
    const addGroupTask = useCallback(e => {
        if(state.isAddGroup){
            setState({...state, isAddGroup: !state.isAddGroup, groups: 
                [...state.groups, {id: state.groups.length, name: e.target[0].value, tasks: []}]});
        }else{
            setState({...state, isAddGroup: !state.isAddGroup});
        }
        e.preventDefault();
    });
    const delGroupTask = useCallback(id => {
        setState({...state, groups: state.groups.filter(group => {
            if(group.id != id){
                if(group.id > id) group.id--;
                return group;
            }
        })});
    });
    const editGroupTask = useCallback((id, name) => {
        setState({...state, groups: state.groups.map(group => {
            if(group.id == id){
                group.name = name;
            }
            return group;
        })});
    });
    const searchGroupTask = useCallback(e => {
        setSearchGroups(state.groups.filter(group => group.name.includes(e.target[0].value)));
        e.preventDefault();
    });
    const closeAddGroupTask = useCallback(() => {
        setState({...state, isAddGroup: false});
    });
    return (
        <div>
            <hr/>
            <form onSubmit={addGroupTask}>
                {state.isAddGroup &&
                <div className="add-group-container">
                    <label>Название: </label>
                    <input type="text" maxLength="30" required/>
                </div>
                }
                <div className="add-group-panel">
                    <button>Добавить группу</button>
                    {state.isAddGroup && <button className="close-btn" onClick={closeAddGroupTask}>Отмена</button>}
                </div>
            </form>
            <form onSubmit={searchGroupTask} className="group-search">
                <input type="text" placeholder="Введите имя"/>
                <button>Поиск</button>
            </form>
            <div className="groups-task">
                {searchGroups == null && state.groups.map(group => <GroupTask id={group.id} name={group.name} navigate={navigate} onDel={delGroupTask} onEdit={editGroupTask}/>)}
                {searchGroups != null && searchGroups.map(group => <GroupTask id={group.id} name={group.name} navigate={navigate} onDel={delGroupTask} onEdit={editGroupTask}/>)}
            </div>
        </div>
    );
}