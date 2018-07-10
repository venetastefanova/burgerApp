import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    // turns the ingredients coming from props, from object to array
   // using map function on this array, we construct a new array using the Array(),
   //by passing the number of times each ingredient must be added(which is the original ingredients object passed as props) as the value
   // then for each array of specific ingredients, we return JSX containing the BurgerIngredient component

    const transformedIngredients = Object.keys(props.ingredients)
        .map(igKey=>{         
            // igKEy = salad, cheese... index = 1,2,3 ...
            return [...Array(props.ingredients[igKey])].map((_, index)=>{
              return  <BurgerIngredient key = {igKey + index} type={igKey} />
            });
        });

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;