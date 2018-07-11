import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';


const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}, 
];

const buildControl = (props) => (
    <div className={classes.BuildControls}>
        {controls.map(ctrl =>(
            <BuildControl 
                key={ctrl.label}
                label={ctrl.label}
                //calls the function to what type of ingredient is added
                added={()=>props.ingredientAdded(ctrl.type)}/>
        ))}
        
    </div>
);

export default buildControl;