import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component{
    state = {
        purchaseable: false,
        purchasing: false,
        loading: false, // for the ajax
        error:false
    }
    
    componentDidMount(){
        // axios.get('https://react-burger-app-veneta.firebaseio.com/ingredients.json')
        //     .then(response=>{
        //         this.setState({ingredients:response.data});
        //     })
        //     .catch(error=>{
        //         this.setState({error:true});
        //     });
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
    

   //makes it possible for the modal to show
    purchaseHandler = () =>{
        this.setState({purchasing:true});
    }
    //closes the modal
    purchaseCanelHandler = () =>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => {
        //pushes all ingredients from state to the array queryParams
        const queryParams = [];
        for (let i in this.state.ingredients){
            //adds them like -> salad = 2...
            queryParams.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);//passing total price to the URL parameters
        
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:"/checkout",
            search: '?'+ queryString // passing it as url
        });
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

        let burger = this.state.error ? <p>the ingredients can't be loaded</p>: <Spinner/>;
       
        // if there are existing ingredients change the content of the variables
        if(this.props.ings){
            burger = <Aux>
                <Burger ingredients = {this.props.ings} />
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchaseable = {this.state.purchaseable}
                    price = {this.props.price}
                    ordered = {this.purchaseHandler}/>
                 </Aux>;
         orderSummary = <OrderSummary 
                finalPrice = {this.props.price}
                ingredients = {this.props.ings}
                purchaseContinued = {this.purchaseContinueHandler}
                purchaseCancelled = {this.purchaseCanelHandler}
                />;
        }
        if(this.state.loading){// if it's still loading
        orderSummary = <Spinner/>;
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
        ings:state.ingredients,
        price:state.totalPrice
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdded: (ingName)=>dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName)=>dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));