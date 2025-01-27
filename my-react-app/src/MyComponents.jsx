import React, {useState} from 'react'

function MyComponents(){
    const[name, setName]  = useState("Tong")
    const updateName = () =>{
        setName("Tyson");
    }
    return (<div>
            <p>Name: {name}</p>
            <button onClick = {updateName}>Set Name </button>
    </div>)
}
export default MyComponents