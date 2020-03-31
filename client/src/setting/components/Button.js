import React from 'react'

const Button = (prop) => {
    const { className, type, placeHolder, onClick } = prop
    
    return (
        <div>
            <input
                className = { className }
                type = { type } 
                placeholder = 'Edit!'
                onClick = { onClick }
            />
        </div>
    );
}

export default Button;