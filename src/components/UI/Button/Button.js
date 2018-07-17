import React from 'react';
import classes from "./Button.css";

//button component which takes btn style from props and make it success or danger styles
// className passes array of strings, so we use join to make it only strings
const button = (props) => (
    <button 
        className= {[classes.Button, classes[props.btnType]].join(' ')}
        onClick = {props.clicked}>{props.children}</button>
);

export default button;