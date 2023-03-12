import React from "react";

const TareasHechas = ({tarea, deleteTarea}) => { //se importa desde home para poder usar aqui
  
  const handleDelete = () => {  //se crea una funcion intermedia para poder llamar a la funcion de delete que está en home
    deleteTarea(tarea);
  };
  return (
    <li className="list-group-item" id="tareasHechas">
      {tarea.label}
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
