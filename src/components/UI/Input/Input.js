import React from 'react';
import classes from './Input.css';

const input=(props)=>{
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    // checks if there is something invalid AND if the dropdown should be validated.
    if(props.invalid && props.shouldValidate){
        inputClasses.push(classes.InValid);//if invalid is true, add a class 
    }
    //checks what type of input to create, receved from props
    switch (props.elementType){
        case('input')://...props gets the stuff from props
            inputElement=<input 
                onChange={props.changed} // comes from method passed by props from parent
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value}/>
            break;
        case('textarea'):
            inputElement=<textarea 
                onChange={props.changed} // comes from method passed by props from parent
               className={inputClasses.join(' ')} 
               {...props.elementConfig}
               value={props.value}/>
            break;
        case('select'):
                inputElement=(
                    <select
                        onChange={props.changed} // comes from method passed by props from parent
                        className={inputClasses.join(' ')} 
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
              onChange={props.changed} // comes from method passed by props from parent
               className={inputClasses.join(' ')} 
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