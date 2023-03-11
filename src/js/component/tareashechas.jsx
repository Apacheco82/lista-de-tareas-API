import React from "react";

const TareasHechas = ({tarea, deleteTarea}) => {
  
  const handleDelete = () => {
    deleteTarea(tarea);
  };
  return (
    <li className="list-group-item" id="tareasHechas">
      {tarea.label}{" "}
      <i
        className="fa-solid fa-xmark"
        onClick={
          handleDelete /* el evento que llama a la funcion intermedia de arriba/ */
        }
      ></i>
     
    </li>
  );
};

export default TareasHechas;
