import React, {useState, useEffect} from "react";
import Formulario from "./formulario.jsx";
import Tareas from "./tareas.jsx";
import TareasHechas from "./tareashechas.jsx";

const URL = "https://assets.breatheco.de/apis/fake/todos/user/apacheco";

const Home = () => {
  const [listaTareas, setListaTareas] = useState([]);

  useEffect(() => {
    get();
  }, []);

  const get = () => {
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
  };

  const putTareas = (listaTareas) => {
    fetch(URL, {
      method: "PUT",
      body: JSON.stringify(listaTareas),
      headers: {"Content-Type": "application/json"},
    })
      .then(() => {
        console.log("put hecho con exito");
        get()
      })

      .catch((error) => {
        console.log("el error", error);
        get()
      });
  };

  const addTarea = (valor) => {
    const nuevaListaTareas = [...listaTareas, valor];
    setListaTareas(nuevaListaTareas);
    //setListaTareas([...listaTareas, valor]); esto no se puede hacer por problemas de sincronía, hay que almacenar el valor nuevo al array existente metiéndolo en una const (dos líneas arriba)
    putTareas(nuevaListaTareas);
  };

  const deleteTarea = (tarea) => {
    const nuevaListaTareas = listaTareas.filter((obj) => obj.id !== tarea.id);
    setListaTareas(nuevaListaTareas);
    putTareas(nuevaListaTareas);
  };

  const checkTarea = (tarea) => {
    const id = tarea.id;
    const modificaTarea = listaTareas.map((obj) => {
      if (obj.id === id) {
        return {...obj, done: true};
      }
      return obj;
    });
    const nuevaListaTareas = [...modificaTarea];
    setListaTareas(nuevaListaTareas);
    putTareas(nuevaListaTareas);
  };

  return (
    <div className="container">
      <Formulario addTarea={addTarea} listaTareas={listaTareas} />

      <div className="card">
        <ul className="list-group list-group-flush">
          {listaTareas
            .filter((tarea) => tarea.done == false && tarea.id != 0) // Filtrar tareas completas
            // .filter((tarea) => tarea.id != "0")
            .map((tarea, index) => (
              <Tareas
                key={index}
                tarea={tarea}
                index={index}
                deleteTarea={() => deleteTarea(tarea)}
                checkTarea={() => checkTarea(tarea)}
              />
            ))}
        </ul>
      </div>

      <div className="card">
        <ul className="list-group list-group-flush">
          {listaTareas
            .filter((tarea) => tarea.done == true && tarea.id != 0)
            .map(
              (
                tarea,
                index //se hace un mapeo de las tareas añadiendo un indice, una tarea y dos funciones para borrar y marcar como completa
              ) => (
                <TareasHechas
                  key={index}
                  tarea={tarea}
                  index={index}
                  deleteTarea={() => deleteTarea(tarea)}
                />
              )
            )}
        </ul>
      </div>
    </div>
  );
};

export default Home;
