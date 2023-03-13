import React from "react";

const Tareas = ({ tarea, deleteTarea, checkTarea}) => { //se importan desde home

  const handleCheck = () => { //se crea una funcion intermedia para poder llamar a la funcion de check que está en home
    checkTarea(tarea);
  };

  const handleDelete = () => { //se crea una funcion intermedia para poder llamar a la funcion de delete que está en home
    deleteTarea(tarea);
  };

  return (
    <li className="list-group-item">
      {tarea.label}{" "}
      <i title="Borrar"
        className="fa-solid fa-xmark"
        onClick={
          handleDelete /* el evento que llama a la funcion intermedia de arriba/ */
        }
      ></i>
      <i title="Completada" className="fa-solid fa-check" onClick={handleCheck /* el evento que llama a la funcion check de arriba/ */}></i>
    </li>
  );
};

export default Tareas;
