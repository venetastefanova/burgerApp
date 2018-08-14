import React from 'react';
import classes from './Order.css';

const order = (props) => {
    const ingredients = [];
    //ingredientname = salad, meat...
    for (let ingredientName in props.ingredients){
        //props.ingredients[ingredientName]=1,2, 0.. 
        ingredients.push(
            {   name:ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );

    }

    // maps through all ingredients
    const ingredientOutput = ingredients.map(ingredient=>{
        return <span 
            style={{
                textTransform:'capitalize',
                display:'inline-block',
                margin: '0 8px',
                border: '1px solid gray',
                paddig:'5px'
                }}
            key={ingredient.name}>{ingredient.name} {ingredient.amount}</span>
    })
    return(
        <div className={classes.Order}>
        <p>Ingredients: {ingredientOutput}</p>
        <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>

    </div>
    )
}
    


export default order;