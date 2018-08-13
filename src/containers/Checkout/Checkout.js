import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/Checkout/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
    state = {
        ingredients:{
            salad:1,
            bacon:1,
            cheese:1,
            meat:1
        }
    }

    componentDidMount(){
        //gets the URL parameters after ?
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()){ // loops through URL params
            //['salad', '1']
                //param[0] is the names like salad, meat...
                //param[1] is the value
            ingredients[param[0]] = +param[1]
        }
        this.setState({ingredients:ingredients});
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
                <Route path={this.props.match.path + "/contact-data"} 
                    render={()=>(<ContactData ingredients={this.state.ingredients}/>)}/>
            </div>
        )
    }
}

export default Checkout;