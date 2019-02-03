import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/Checkout/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component{

    checkoutCancelled=()=>{
        this.props.history.goBack(); // go back to the previous page
    }

    checkoutContinued = () => {
        this.props.history.replace("/checkout/contact-data");
        // changes the current route to another one
    }
    render(){
        let sumary = <Redirect to="/"/>
         if(this.props.ings){
            const purchasedRedirect  = this.props.purchased ? <Redirect to ="/"/> : null;

            sumary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}
                    />
                    <Route path={this.props.match.path + "/contact-data"} component={ContactData}/>
                                

                </div>
               
            ) 
         }
        return(
            <div>
                {sumary}
            </div>
        )
    }
}


const mapStateToProps = state =>{
    return{
        ings:state.burgerReducer.ingredients,
        purchased:state.orderReducer.purchased
    }
}

//ommitting mapDispatchToProps since we dont dispatch any actions
//if we omit mapStateToProps then it will be : export default connect(null,mapDispatchToProps)(Checkout) ;
export default connect(mapStateToProps)(Checkout);