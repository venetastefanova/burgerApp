import * as actionTypes from './actions.js';

const initialState={
    ingredients:{// temporary fix because dont know yet how to handle ajax calls
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
    },
    totalPrice:4
}


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon:0.7
}

const reducer = (state=initialState, action)=>{
    switch (action.type){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,//cloning state
                ingredients:{// creating new object and everything nested
                    ...state.ingredients, 
                    [action.ingredientName] : state.ingredients[action.ingredientName] +1 //geting the payload
                },
                totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingredientName] // updates total price with the current state of the price with teh currently selected ingredient
            }
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,//cloning state
                ingredients:{// creating new object and everything nested
                    ...state.ingredients, 
                    [action.ingredientName] : state.ingredients[action.ingredientName] -1 //geting the payload
                },
                totalPrice:state.totalPrice - INGREDIENT_PRICES[action.ingredientName] // updates total price with the current state of the price with teh currently selected ingredient
                
            }
        default:
            return state;
    }

}

export default reducer;