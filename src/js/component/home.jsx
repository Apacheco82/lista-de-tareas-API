import React, {useState, useEffect} from "react";
import Formulario from "./formulario.jsx";
import Tareas from "./tareas.jsx";
import TareasHechas from "./tareashechas.jsx";

const URL = "https://assets.breatheco.de/apis/fake/todos/user/apacheco";

const Home = () => {
  const [listaTareas, setListaTareas] = useState([]);
  
  useEffect(() => {
    get()
   }, []);

  const get = () =>{ fetch(URL, {method: "GET", headers: {"Content-Type": "application/json"}})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    return setListaTareas(data);
  })
  .catch((error) => {
    console.log("el error", error);
  })}

  const putTareas = (listaTareas) => {
    fetch(URL, {
      method: "PUT",
      body: JSON.stringify(listaTareas),
      headers: {"Content-Type": "application/json"},
    })
      .then(() => {
        console.log("put hecho con exito");
      })

      .catch((error) => {
        console.log("el error", error);
      });
  };
 

  const addTarea = (valor) => {
    const nuevaListaTareas = [...listaTareas, valor];
    setListaTareas(nuevaListaTareas);
    //setListaTareas([...listaTareas, valor]); esto no se puede hacer por problemas de sincronía, hay que almacenar el valor nuevo al array existente metiéndolo en una const (dos líneas arriba)
    putTareas(nuevaListaTareas);
  };

  const deleteTarea = (id) => {
    const nuevaListaTareas = listaTareas.filter((tarea) => tarea.id !== id);
    setListaTareas(nuevaListaTareas);
    putTareas(nuevaListaTareas);
  };

  const checkTarea = (index) => {
    //1. modificar el DONE de una tarea existente
    const tareaMod = listaTareas[index];
    tareaMod.done = true;

    //2. borrado de la tarea de la lista original
    listaTareas.splice(index, 1);
    setListaTareas(listaTareas);

    //3.setear la tarea completada a la lista de tareas
    addTarea(tareaMod);
  };

  return (
    <div className="container">
      <Formulario addTarea={addTarea} />

      <div className="card">
        <ul className="list-group list-group-flush">
          {listaTareas
            .filter((tarea) => tarea.done == false) // Filtrar tareas completas
            .map((tarea, index) => (
              <Tareas
                key={tarea.id}
                tarea={tarea}
                index={index}
                deleteTarea={() => deleteTarea(tarea.id)}
                checkTarea={() => checkTarea(index)}
              />
            ))}
        </ul>
      </div>

      <div className="card">
        <ul className="list-group list-group-flush">
          {listaTareas
            .filter((tarea) => tarea.done == true)
            .map(
              (
                tarea,
                index //se hace un mapeo de las tareas añadiendo un indice, una tarea y dos funciones para borrar y marcar como completa
              ) => (
                <TareasHechas key={tarea.id} tarea={tarea} index={index}  deleteTarea={() => deleteTarea(tarea.id)}/>
              )
            )}
        </ul>
      </div>
    </div>
  );
};

export default Home;
