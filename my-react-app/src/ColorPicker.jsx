import React, {useState} from 'react'
function ColorPicker(){

    const [color,setColor] = useState("#ffffff ");
    function colorEvent(e){
        setColor(e.target.value);
    }
    return(<>
        <div className="container">
            <h1>
                Color Picker
            </h1>

            <div className="color-display" style ={{backgroundColor:color}}>
                <p>Selected Color: {color}</p>
                <label htmlFor="">Select a Color:</label>
                <input type="color" value={color} onChange={colorEvent}/>
            </div>
        </div>
    </>)   
}
export default ColorPicker
