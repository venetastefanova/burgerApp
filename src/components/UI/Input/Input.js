import React from 'react';
import classes from './Input.css';

const input=(props)=>{
    let inputElement = null;
    //checks what type of input to create, receved from props
    switch (props.elementType){
        case('input')://...props gets the stuff from props
            inputElement=<input 
                className={classes.InputElement} 
                {...props.elementConfig}
                value={props.value}/>
            break;
        case('textarea'):
            inputElement=<textarea 
               className={classes.InputElement} 
               {...props.elementConfig}
               value={props.value}/>
            break;
        case('select'):
                inputElement=(
                    <select
                        className={classes.InputElement} 
                        {...props.elementConfig}
                         value={props.value}>
                         {props.elementConfig.options.map(option=>(
                            <option 
                                key={option.value}
                                value={option.value}>
                                {option.displayValue}
                            </option>
                         ))}
                    </select>
                )
                
            break;
        default:
            inputElement=<input 
               className={classes.InputElement} 
               {...props.elementConfig}
               value={props.value}/>
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;