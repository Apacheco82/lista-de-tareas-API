import React, {useState} from "react";


const Formulario = ({addTarea, listaTareas}) => { //se importan las funciones que están en home
  const [valor, setValor] = useState(""); //para controlar el estado del input


  const highestId = listaTareas.reduce((maxId, tarea) => { //reduce recorre la lista buscando el id más alto
    return tarea.id > maxId ? tarea.id : maxId; //si id de la tarea que se recorre es mayor que el valor de maxid, se iguala al id, en caso contrario lo deja asi
  }, 0); //0 es el valor inicial

  const handleChange = (e) => { //cuando va cambiando el input 
    const newValue = e.target.value; //almacenamos el valor de ese input (solo hay uno en este caso)
    setValor(newValue); //se setea al estado valor
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && valor.length >= 3) {
      //cuando se pulse tecla enter y el valor es mayor a 3 caracteres
      e.preventDefault(); //evita que la pagina se recargue
      const newId = highestId + 1; //le añadimos 1 al id para que sea más alto que el anterior que teníamos en la API
      const newObjeto = {id: newId, label: valor, done: false}; //igualamos lo introducido en el input y le decimos donde va a ir y especificamos el resto
      addTarea(newObjeto); //llamamos a la funcion addtarea que está en home
      setValor(""); //si la tecla es pulsada es enter y el input es mayor de 3 de longitud, mete el valor de la misma en un array o "null" y vacía el input
    } else if (e.key === "Enter" && valor.length <= 2) { //en caso de que sea menor a dos caracteres y se pulse intro
      e.preventDefault(); //evita que la pagina se recargue
    }
  };
  return (
    <form>
      <input
        type="text"
        name="label" // ahi se almacena el valor
        className="form-control"
        value={valor} // le decimos que el valor del input es el mismo que recibe el input de e.target.value
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Introduce tu tarea pulsando ENTER"
      ></input>
    </form>
  );
};

export default Formulario;
