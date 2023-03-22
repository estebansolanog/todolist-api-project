import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const ToDo = () => {
    const { store, actions } = useContext(Context);
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const cargaDatos = async () => {
            actions.getToDoList()
        }
        cargaDatos()
        let limpiar = document.querySelector("#tarea")
        limpiar.value = ""
    }, [store.user, refresh])

    useEffect(() => { console.log(store.todoList) }, [store.todoList])

    let todoCounter = store.todoList.length;

    return (
        <div className="text-center container-fluid" id="body">
            <h1 className="title">My Todos </h1>
            <br />
            <div className="row d-flex justify-content-center mt-0">
                <input placeholder="Username" id="search-bar" onChange={(e) => { actions.userToDo(e.target.value) }}></input>
                <br></br>
                <input placeholder="Agregar ToDo" id="tarea"
                    onKeyUp={async (e) => {
                        if (e.key == "Enter") {
                            console.log("tarea", e.target.value)
                            let resultado = await actions.agregarToDo(e.target.value)
                            if (resultado) {
                                setRefresh(!refresh)
                                e.target.value = ""
                            }
                        }
                    }}>
                </input>
                <br />
            </div>
            <div className="row d-flex justify-content-center mt-0">
                {store.todoList && store.todoList.length > 0 ?
                    <><ul className="p-0 mb-0">{store.todoList.map((item, index) => {
                        return <li key={index}>
                            {item.label}
                            <button type="button"
                                className="text-danger ocultar mx-3"
                                onClick={() => {
                                    actions.eliminarToDo(index);
                                }}>
                                X
                            </button>
                        </li>;
                    })}</ul>
                        <p className="m-0 counter">{todoCounter} ToDo's left</p>
                        <div className="container-todo-shadow mt-0">
                            <div className="container-todo-shadow1"></div>
                            <div className="container-todo-shadow2"></div>
                        </div></>
                    :
                    <>No hay tareas</>
                }
            </div>
        </div>
    );
};
