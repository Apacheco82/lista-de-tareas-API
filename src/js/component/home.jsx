import React, {useState, useEffect} from "react";
import Formulario from "./formulario.jsx";
import Tareas from "./tareas.jsx";
import TareasHechas from "./tareashechas.jsx";
import Spinner from "./spinner.jsx";

const URL = "https://assets.breatheco.de/apis/fake/todos/user/apacheco";

const Home = () => {
  const [listaTareas, setListaTareas] = useState([]);

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
      });
      const data = await response.json();
      setListaTareas(data);
    } catch (error) {
      console.log("el error", error);
    }
  };

  const putTareas = async (listaTareas) => {
    try {
      const response = await fetch(URL, {
        method: "PUT",
        body: JSON.stringify(listaTareas),
        headers: {"Content-Type": "application/json"},
      });
      console.log("put hecho con exito");
      setTimeout(() => { //no es real, si falla entre medias tiene demasiado retardo, pero es la manera de que deje hacer cosas rápido
        get();
      }, 100000);
    } catch (error) {
      console.log("el error", error);
    }
  };

  const addTarea = async (valor) => {
    try {
      const nuevaListaTareas = [...listaTareas, valor];
      setListaTareas(nuevaListaTareas);
      //setListaTareas([...listaTareas, valor]); esto no se puede hacer por problemas de sincronía, hay que almacenar el valor nuevo al array existente metiéndolo en una const (dos líneas arriba)
      await putTareas(nuevaListaTareas);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTarea = async (tarea) => {
    try {
      const nuevaListaTareas = listaTareas.filter((obj) => obj.id !== tarea.id);
      setListaTareas(nuevaListaTareas);
      await putTareas(nuevaListaTareas);
    } catch (error) {
      console.log(error);
    }
  };

  const checkTarea = (tarea) => {
    const id = tarea.id;
    const modificaTarea = listaTareas.map((obj) => {
      return obj.id === id ? {...obj, done: true} : obj;
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
