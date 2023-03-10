import React, {useState, useEffect} from "react";
import Formulario from "./formulario.jsx";
import Tareas from "./tareas.jsx";

const URL = "https://assets.breatheco.de/apis/fake/todos/user/apacheco";

const Home = () => {
  const [listaTareas, setListaTareas] = useState([]);
  const [listaTareasCheck, setListaTareasCheck] = useState([]);

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

  //PARA HACER EL CHECK DE TAREAS
  //1. leer indice de la tarea que hemos marcado como check (parametro index)
  //2. setear el done == true de esa tarea
  //3. se hace un put de toda la listaTareas
  //4. pintar la tarea que está check en un nuevo array de listaTareasCheck o añadir un classname a esa tarea para cambiar estilos en css
  const addTarea = (valor) => {
    const nuevaListaTareas = [...listaTareas, valor];

    setListaTareas(nuevaListaTareas);
    //setListaTareas([...listaTareas, valor]); esto no se puede hacer por problemas de sincronía, hay que almacenar el valor nuevo al array existente metiéndolo en una const (dos líneas arriba)
    putTareas(nuevaListaTareas);
  };

  const deleteTarea = (index) => {
    const nuevaListaTareas = [...listaTareas];
    nuevaListaTareas.splice(index, 1);
    setListaTareas(nuevaListaTareas);
    putTareas(nuevaListaTareas);
  };

  const checkTarea = (index) => {
    //modificar el DONE de una tarea existente
    const tareaMod = listaTareas[index];
    tareaMod.done = true;

    //setear a la lista de tareasCheck
    const nuevaListaTareasCheck = [...listaTareasCheck, tareaMod];
    setListaTareasCheck(nuevaListaTareasCheck);

    //borrado de una tarea de la lista original
    const nuevaListaTareas = [...listaTareas];
    nuevaListaTareas.splice(index, 1);
    setListaTareas(nuevaListaTareas);
  };

  return (
    <div className="container">
      <Formulario addTarea={addTarea} />
      <div className="card">
        <ul className="list-group list-group-flush">
          {listaTareas.map(
            (
              tarea,
              index //se hace un mapeo de las tareas añadiendo un indice, una tarea y dos funciones para borrar y marcar como completa
            ) => (
              <Tareas
                key={index}
                tarea={tarea}
                index={index}
                deleteTarea={
                  () =>
                    deleteTarea(
                      index
                    ) /*usamos una funcion como prop, esta función la llamaremos en el componente tb*/
                }
                checkTarea={
                  () =>
                    checkTarea(
                      index
                    ) /*usamos una funcion como prop, la llamaremos en el componente */
                }
              />
            )
          )}
          {listaTareasCheck.map(
            (
              tarea,
              index //se hace un mapeo de las tareas añadiendo un indice, una tarea y dos funciones para borrar y marcar como completa
            ) => (
              <Tareas key={index} tarea={tarea} index={index} />
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default Home;
