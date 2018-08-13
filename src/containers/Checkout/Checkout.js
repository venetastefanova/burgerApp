import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/Checkout/CheckoutSummary';

class Checkout extends Component{
    state = {
        ingredients:{
            salad:1,
            bacon:1,
            cheese:1,
            meat:1
        }
    }

    checkoutCancelled=()=>{
        this.props.history.goBack(); // go back to the previous page
    }

    checkoutContinued = () => {
        this.props.history.replace("/checkout/contact-data");
        // changes the current route to another one
    }
    render(){
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}
                    />
            </div>
        )
    }
}

export default Checkout;