import React from 'react'

const Text = (prop) => {
    const { className, type, placeHolder, onChange, readOnly } = prop;

    return (
        <div>
            <input
                className = { className }
                type = { type } 
                placeholder = { placeHolder }
                onChange = { onChange }
                readOnly = { readOnly }
            />
            
        </div>
    );
}

export default Text;