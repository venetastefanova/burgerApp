import React from 'react';
import classes from './Input.css';

const input=(props)=>{
    let inputElement = null;
    //checks what type of input to create, receved from props
    switch (props.inputtype){
        case('input')://...props gets the stuff from props
            inputElement=<input className={classes.InputElement} {...props}/>
            break;
        case('textarea'):
            inputElement=<textarea className={classes.InputElement} {...props}/>
            break;
        default:
            inputElement=<input className={classes.InputElement} {...props}/>;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;