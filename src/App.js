import logo from './logo.svg';
import './App.css';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TasksPage from './components/pages/tasksPage/TasksPage';
import AddTaskPage from './components/pages/addTaskPage/AddTaskPage';
import EditTaskPage from './components/pages/editTaskPage/EditTaskPage';
import GroupsTaskPage from './components/pages/groupsTaskPage/GroupsTaskPage';

function App() {
    const groups = JSON.parse(localStorage.getItem("groups"));
    const[state, setState] = useState({groups: groups == null ? [] : groups, isAddGroup: false});
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.setItem("groups", JSON.stringify(state.groups));
    }, [state.groups]);
    return (
        <div className="App">
            <header>
                <div className="nav">
                    <a className="item" href="/">Главная</a>
                    {state.selectGroupId && <a className="item" href={"/" + state.selectGroupId}>{state.groups[state.selectGroupId].name}</a>}
                </div>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<GroupsTaskPage state={state} setState={setState} navigate={navigate}/>}/>
                    <Route path="/:groupId" element={<TasksPage state={state} setState={setState}/>}/>
                    <Route path="/:groupId/add" element={<AddTaskPage state={state} setState={setState} navigate={navigate}/>}/>
                    <Route path="/:groupId/edit/:taskId" element={<EditTaskPage state={state} setState={setState} navigate={navigate}/>}/>
                </Routes>
            </main>
        </div>
  );
}

export default App;
