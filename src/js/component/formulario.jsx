import React, {useState} from "react";

const initialState = {
  label: "",
  done: "",
};

const Formulario = ({ addTarea}) => {
  const [valor, setValor] = useState("");
  const [objeto, setObjeto] = useState(initialState);

  const handleChange = (e) => {
    const newValue = e.target.value
    setValor(newValue);
    setObjeto({"label": newValue ,"done": false});
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && valor.length >= 3) {
      //cuando se pulse tecla
      e.preventDefault();
      addTarea(objeto); //llamamos a la funcion addtarea que está en home
      setValor(""); //si la tecla es pulsada es enter y el input es mayor de 3 de longitud, mete el valor de la misma en un array o "null" y vacía el input
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
