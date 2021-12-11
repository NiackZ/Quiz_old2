import React from 'react';
import '../Input/Input.css'
const Input = ({...props}) => {
	
    return (
        <input
					className="myInput"
					type={props.type? props.type : "text"}
					value={props.value? props.value : ""}
					{...props}
				/>
    );
};

export default Input;