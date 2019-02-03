import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';


export class BurgerBuilder extends Component{
    state = {
        purchasing: false
    }
    
    componentDidMount(){
        this.props.onInitIngredients();
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
       return sum>0;
    }
    

   //makes it possible for the modal to show
    purchaseHandler = () =>{
        if(this.props.isAuthenticated){
            this.setState({purchasing:true});
        }
        else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push("/auth");
        }
    }
    //closes the modal
    purchaseCanelHandler = () =>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push("/checkout");
        this.props.onInitPurchase();
    };
    render(){
   
        const disabledInfo ={
            ...this.props.ings
        }
        //checks if any of the ingredients is 0
        for(let key in disabledInfo){
            //{salad:true, meat: false, ...}
            //disabledInfo[key] <= 0 returns true or false
            disabledInfo[key] = disabledInfo[key] <=0
        }

        let orderSummary = null;

        let burger = this.props.error ? <p>the ingredients can't be loaded</p>: <Spinner/>;
       
        // if there are existing ingredients change the content of the variables
        if(this.props.ings){
            burger = <Aux>
                <Burger ingredients = {this.props.ings} />
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchaseable = {this.updatePurchaseState(this.props.ings)}
                    price = {this.props.price}
                    isAuth={this.props.isAuthenticated}
                    ordered = {this.purchaseHandler}/>
                 </Aux>;
         orderSummary = <OrderSummary 
                finalPrice = {this.props.price}
                ingredients = {this.props.ings}
                purchaseContinued = {this.purchaseContinueHandler}
                purchaseCancelled = {this.purchaseCanelHandler}
                />;
        }

    


        return(
            <Aux>
                <Modal modalClosed = {this.purchaseCanelHandler} show={this.state.purchasing}>
                  {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}



const mapStateToProps = (state)=>{
    return {
        ings:state.burgerReducer.ingredients,
        price:state.burgerReducer.totalPrice,
        error:state.burgerReducer.error,
        isAuthenticated:state.authReducer.token !==null
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdded: (ingName)=>dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName)=>dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: ()=>dispatch(actions.initIngredients()),
        onInitPurchase : () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath : (path) => dispatch(actions.setAuthRedirectPath(path))

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));