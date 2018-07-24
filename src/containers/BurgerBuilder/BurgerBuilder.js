import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

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
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false // for the ajax
    }

    //checks if the ingredient amount is 0 and if yes, makes the order button disabled
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients) //creates array of strings
            .map(isKey=>{
                return ingredients[isKey]; // gettng the numbers of ingredients
            })
            .reduce((sum,element)=>{
                return sum + element;
            },0);
        this.setState({purchaseable: sum > 0 });
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
        this.updatePurchaseState(updatedIngredients); // makes the order button enabled or disabled
        
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
        this.updatePurchaseState(updatedIngredients); // makes the order button enabled or disabled
    }

   //makes it possible for the modal to show
    purchaseHandler = () =>{
        this.setState({purchasing:true});
    }
    //closes the modal
    purchaseCanelHandler = () =>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => {
        //alert("you continued");
        this.setState({loading:true}); // changing the state and making the loader to show
        const order = {
            ingredients: this.state.ingredients,
            price:this.state.totalPrice,
            customer:{
                name: "Veneta Stefanova",
                address: {
                    street: "teststreet 1",
                    zipCode: "342342",
                    country: 'Finland'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post("/orders.json", order) //sending post to firebase, firebase uses .json extension after path
            .then(response=>{
                this.setState({loading:false, purchasing:false}); // swaps loading with the purchase
            })
            .catch(error=>{
                console.log(error);
                this.setState({loading:false, purchasing:false}); // swaps loading with the purchase
            });

    };
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
        let orderSummary = <OrderSummary 
            finalPrice = {this.state.totalPrice}
            ingredients = {this.state.ingredients}
            purchaseContinued = {this.purchaseContinueHandler}
            purchaseCancelled = {this.purchaseCanelHandler}
            />;
        if(this.state.loading){
            orderSummary = <Spinner/>;
           }
        return(
            <Aux>
                <Modal modalClosed = {this.purchaseCanelHandler} show={this.state.purchasing}>
                  {orderSummary}
                </Modal>
                <Burger ingredients = {this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchaseable = {this.state.purchaseable}
                    price = {this.state.totalPrice}
                    ordered = {this.purchaseHandler}
                />

            </Aux>
        );
    }
}

export default BurgerBuilder;