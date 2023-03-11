import React from "react";

const Tareas = ({ tarea, deleteTarea, checkTarea}) => {
  const handleCheck = () => {
    checkTarea(tarea);

  };
  const handleDelete = () => {
    
    deleteTarea(tarea);
  };
  return (
    <li className="list-group-item">
      {tarea.label}{" "}
      <i
        className="fa-solid fa-xmark"
        onClick={
          handleDelete /* el evento que llama a la funcion intermedia de arriba/ */
        }
      ></i>
      <i className="fa-solid fa-check" onClick={handleCheck}></i>
    </li>
  );
};

export default Tareas;
