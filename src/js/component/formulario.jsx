import React, {useState} from "react";

const initialState = {
  id: "",
  label: "",
  done: "",
};

const Formulario = ({addTarea, listaTareas}) => {
  const [valor, setValor] = useState("");
  //  const [objeto, setObjeto] = useState(initialState);

  const highestId = listaTareas.reduce((maxId, tarea) => {
    return tarea.id > maxId ? tarea.id : maxId;
  }, 0);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValor(newValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && valor.length >= 3) {
      //cuando se pulse tecla
      e.preventDefault();
      const newId = highestId + 1;
      const newObjeto = {id: newId, label: valor, done: false};
      addTarea(newObjeto); //llamamos a la funcion addtarea que está en home
      setValor(""); //si la tecla es pulsada es enter y el input es mayor de 3 de longitud, mete el valor de la misma en un array o "null" y vacía el input
    } else if (e.key === "Enter" && valor.length <= 2) {
      e.preventDefault();
    }
  };
  return (
    <form>
      <input
        type="text"
        name="label"
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
