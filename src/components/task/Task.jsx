import React, { useCallback } from "react";
import './Task.css';
import { Link } from "react-router-dom";

export default class Task extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="task-container">
                <p><b>Название:</b> {this.props.name}</p>
                <p><b>Время исполнения:</b> {this.props.date}</p>
                <p><b>Приоритет:</b> {this.props.priority}</p>
                <p><b>Описание:</b> {this.props.description}</p>
                <div className="panel">
                    <Link to={"edit/" + this.props.id}>
                        <button>Редактировать</button>
                    </Link>
                    <button onClick={() => {this.props.onDel(this.props.id)}}>Удалить</button>
                </div>
            </div>
        );
    }
}