import React from "react";

const Tareas = ({tarea, index, deleteTarea, checkTarea}) =>{

    const handleCheck =() =>{
        
    }
    const handleDelete =() =>{

    }
return(
    
    <li className="list-group-item">{tarea.label} <i className="fa-solid fa-xmark" onClick={handleDelete /* el evento que llama a la funcion intermedia de arriba/ */}></i>
      <i className="fa-solid fa-check" onClick={handleCheck}></i></li>


)
}

export default Tareas