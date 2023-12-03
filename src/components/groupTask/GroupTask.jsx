import React from "react";
import './GroupTask.css';

export default class GroupTask extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isEdit: false,
            name: props.name
        }
    }

    handlerClick = () => {
        this.props.navigate("/" + this.props.id);
    }

    handlerClickEdit = () => {
        if(this.state.isEdit){
            this.props.onEdit(this.props.id, this.state.name);
        }
        this.setState({...this.state, isEdit: !this.state.isEdit});
    }

    handlerEdit = e => {
        this.setState({...this.state, name: e.target.value});
    }

    render() {
        return (
            <div className="group-container">
                {this.state.isEdit && <input value={this.state.name} maxLength="30" onChange={this.handlerEdit}/>}
                {!this.state.isEdit && <p className="title" onClick={this.handlerClick}>{this.props.name}</p>}
                <div className="panel">
                    {!this.state.isEdit && <button onClick={this.handlerClickEdit}>Редактировать</button>}
                    {this.state.isEdit && <button onClick={this.handlerClickEdit}>Сохранить</button>}
                    <button onClick={() => {this.props.onDel(this.props.id)}}>Удалить</button>
                </div>
            </div>
        );
    }
}