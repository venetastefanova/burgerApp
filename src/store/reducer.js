import * as actionTypes from './actions.js';

const initialState={
    ingredients:{// temporary fix because dont know yet how to handle ajax calls
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
    },
    totalPrice:""
}


const reducer = (state=initialState, action)=>{
    switch (action.type){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,//cloning state
                ingredients:{// creating new object and everything nested
                    ...state.ingredients, 
                    [action.ingredientName] : state.ingredients[action.ingredientName] +1 //geting the payload
                }
            }
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,//cloning state
                ingredients:{// creating new object and everything nested
                    ...state.ingredients, 
                    [action.ingredientName] : state.ingredients[action.ingredientName] -1 //geting the payload
                }
            }
        default:
            return state;
    }

}

export default reducer;