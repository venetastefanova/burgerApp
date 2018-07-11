import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon:0.7
}

class BurgerBuilder extends Component{
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    }
    //type is the salad,bacon,cheese....
    addIngredientHandler = (type)=> {
        // gets the type of the ingredient = salad, bacon.. and the times it is in initial state
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        //we make opy of the array because we want to modify state
        const updatedIngredients = {
            ...this.state.ingredients
        };
        //updating the copied array before calling state
        updatedIngredients[type] = updatedCount;

        //gets the price from the initial constant
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        //changing the state 
        this.setState({totalPrice: newPrice, ingredients:updatedIngredients});
    }

    //type is the salad,cheese...
    removeIngredientHandler = (type)=>{
        // gets the type of the ingredient = salad, bacon.. and the times it is in initial state
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return; // doesnt throw error if there is no ingredients to delete
        }
        const updatedCount = oldCount - 1;
        //we make opy of the array because we want to modify state
        const updatedIngredients = {
            ...this.state.ingredients
        };
        //updating the copied array before calling state
        updatedIngredients[type] = updatedCount;

        //gets the price from the initial constant
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceDeduction;
        //changing the state 
        this.setState({totalPrice: newPrice, ingredients:updatedIngredients})
    }
    render(){
   
        const disabledInfo ={
            ...this.state.ingredients
        }
        //checks if any of the ingredients is 0
        for(let key in disabledInfo){
            //{salad:true, meat: false, ...}
            //disabledInfo[key] <= 0 returns true or false
            disabledInfo[key] = disabledInfo[key] <=0
        }

        return(
            <Aux>
                <Burger ingredients = {this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                />

            </Aux>
        );
    }
}

export default BurgerBuilder;