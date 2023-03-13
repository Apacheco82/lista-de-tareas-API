import React, {useState, useEffect} from "react";
import Formulario from "./formulario.jsx";
import Tareas from "./tareas.jsx";
import TareasHechas from "./tareashechas.jsx";


const URL = "https://assets.breatheco.de/apis/fake/todos/user/apacheco"


const Home = () => {
  const [listaTareas, setListaTareas] = useState([]);
  const [loading, setLoading] = useState(false); //estado para comprobar si la web está cargando o no

 
  const get = async () => {
    setLoading(true); //se setea el estado en true, si se hace al revés se queda siempre cargando por el renderizado condicional del return
    try {
      const response = await fetch(URL, { //se obtienen los datos con GET, opciones dadas por la API
        method: "GET",
        headers: {"Content-Type": "application/json"},
      });
      const data = await response.json(); //se almacenan en una variable 
      setListaTareas(data); //se setean a la lista de tareas
    } catch (error) {
     console.log("Error al hacer GET", error); //si hay error, lo muestra en consola
    } finally {
      setLoading(false); //cambia el estado a false de nuevo
    }
  };

  useEffect(() => { //se usa get al cargar la página para traer los datos
    get();
  }, []);

  const putTareas = async (listaTareas) => { //funcion para almacenar en la lista
    try {
      await fetch(URL, { //se envian los datos con put, opciones dadas por la API
        method: "PUT",
        body: JSON.stringify(listaTareas), //se tienen que pasar a texto 
        headers: {"Content-Type": "application/JSON"},
      });
      get(); //se vuelven a obtener los datos
      console.log("put hecho con exito"); //mensaje en consola para saber que se ha realizado con éxito
     
    } catch (error) {
    console.log("Error al cargar la tarea", error); //mensaje de error si la tarea no se carga
    }
  };

  const addTarea = async (valor) => { //funcion para añadir la tarea a la lista
    try {
      const nuevaListaTareas = [...listaTareas, valor]; //se copia la lista y se añade el valor
      setListaTareas(nuevaListaTareas); //se añade a la lista
      //setListaTareas([...listaTareas, valor]); esto no se puede hacer por problemas de sincronía, hay que almacenar el valor nuevo al array existente metiéndolo en una const (dos líneas arriba)
      await putTareas(nuevaListaTareas); //se usa la funcion put para volver a cargar las tareas a la API
    } catch (error) {
    console.log("Error al añadir tarea",error); //mensaje por si hay error al añadir la tarea
    }
  };

  const deleteTarea = async (tarea) => { //funcion para borrar las tareas
    try {
      const nuevaListaTareas = listaTareas.filter((obj) => obj.id !== tarea.id); //se usa filter para eliminar la tarea que marquemos con un id
      setListaTareas(nuevaListaTareas); //se vuelven a poner en la lista de tareas todas excepto la borrada
      await putTareas(nuevaListaTareas); //se vuelve a pasar a la API
    } catch (error) {
    console.log("Error al borrar la tarea",error); // error si la tarea es borrada
    }
  };

  const checkTarea = (tarea) => { //funcion para marcar la tarea como completada
    const id = tarea.id; //se almacena la key id del obj lista de tareas
    const modificaTarea = listaTareas.map((obj) => { //se recorre la lista de tareas habiendo creado una const en la que meter el resultado
      return obj.id === id ? {...obj, done: !obj.done} : obj;
      //se cambia la key done de la tarea que coincida con el id o returna el objeto
    });
    const nuevaListaTareas = [...modificaTarea]; //se crea una variable para almacenar una copia de la tarea modificada anteriormente 
    setListaTareas(nuevaListaTareas); //se setea a la lista de tareas
    putTareas(nuevaListaTareas); //se vuelve a pasar a la API
  };

  return ( //render condicional : si está loading solo muestra el spinner, si no muestra el resto de la web
    <>
      {loading ? (
     <div className="d-flex justify-content-center">
     <div className="spinner-border text-primary" role="status">
       <span className="sr-only">Loading...</span>
     </div>
   </div>
      ) : (
        <div>
          { <div className="container">
      <Formulario addTarea={addTarea} listaTareas={listaTareas} />

      <div className="card">
        <ul className="list-group list-group-flush">
          {listaTareas
            .filter((tarea) => tarea.done == false && tarea.id != 0) // Filtrar tareas incompletas (done: false) excepto el id 0 (elemento fijo en la API)
            // .filter((tarea) => tarea.id != "0") se podria hacer en dos lineas 
            .map((tarea, index) => ( //recorre la lista de tareas para pintarlas en el componente tareas
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
            .filter((tarea) => tarea.done == true && tarea.id != 0) // Filtrar tareas completas (done: true) excepto el id 0 (elemento fijo en la API)
            .map( //recorre la lista de tareas para pintarlas en el componente tareasHechas
              (
                tarea,
                index 
              ) => (
                <TareasHechas
                  key={index}
                  tarea={tarea}
                  index={index}
                  deleteTarea={() => deleteTarea(tarea)}
                  checkTarea={() => checkTarea(tarea)}
                />
              )
            )}
        </ul>
      </div>
    </div>}
        </div>
      )}
    </>
  );
};
export default Home;
