import React, {useState, useEffect} from "react";

const URL = "https://assets.breatheco.de/apis/fake/todos/user/apacheco"

const Home = () => {

	const [tarea, setTarea] = useState()

	useEffect(()=>{
fetch(URL, {method: "GET", headers:{"Content-Type":"application/json"}})
.then((response) => {
	console.log("response entero", response)
	console.log("ok del servidor",response.ok)
	console.log("status de response",response.status)
	console.log("texto response",response.text)
	return response.json()
})
.then((data) => {
	console.log("la data", data)
	return setTarea(data)

}) 
.catch((error)=>{
	console.log("el error",error)
})
	},[])


	return (
		<div className="text-center">
		hola
	
		</div>
	);
};

export default Home;
