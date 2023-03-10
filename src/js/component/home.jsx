import React, {useState, useEffect} from "react";
import Formulario from "./formulario.jsx";
import Tareas from "./tareas.jsx";

const URL = "https://assets.breatheco.de/apis/fake/todos/user/apacheco";

/*const initialState = {
  label: "",
  done: "",
};*/

const Home = () => {
  const [listaTareas, setListaTareas] = useState([]);

  useEffect(() => {
    fetch(URL, {method: "GET", headers: {"Content-Type": "application/json"}})
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return setListaTareas(data);
      })
      .catch((error) => {
        console.log("el error", error);
      });
  }, []);


 /* const addTarea = (valor) => {
    setListaTareas([...listaTareas, valor]);
    console.log("la lista final", listaTareas);

  };*/

  const addTarea = async (valor) => {
    try {
      // Realizar alguna operación asíncrona aquí, como una llamada a una API
      const resultado = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Si la operación asíncrona tiene éxito, actualizar el estado de la lista de tareas
      if (resultado.ok) {
        const nuevaListaTareas = [...listaTareas, valor];
        setListaTareas(nuevaListaTareas);
		console.log("la nueva", nuevaListaTareas)
//llamada a una funcion put
      } else {
        throw new Error("Hubo un problema al agregar la tarea");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <Formulario addTarea={addTarea} />
      <div className="card">
        <ul className="list-group list-group-flush">
		{listaTareas.map((tarea, index) => ( //se hace un mapeo de las tareas añadiendo un indice, una tarea y dos funciones para borrar y marcar como completa
            <Tareas
              key={index}
              tarea={tarea}
              index={index}
  //deleteTarea={() => deleteTarea(index) /*usamos una funcion como prop, esta función la llamaremos en el componente tb*/}
             // checkTarea={() => checkTarea(tarea, index)/*usamos una funcion como prop, la llamaremos en el componente */}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
