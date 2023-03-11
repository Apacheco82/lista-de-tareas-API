import React from "react";

const TareasHechas = ({tarea, index, deleteTarea}) => {
  
  const handleDelete = () => {
    deleteTarea(index);
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
     
    </li>
  );
};

export default TareasHechas;
