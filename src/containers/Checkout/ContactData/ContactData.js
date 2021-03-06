import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{
    state={
        name: '',
        email: '',
        address: {
            street: '',
            postalCode:''
        },
        loading:false
    }

    orderHandler=(event)=>{
        event.preventDefault(); // prevents from reload of the page after clicking the form button

        this.setState({loading:true}); // changing the state and making the loader to show
        const order = {
            ingredients: this.props.ingredients,
            price:this.props.price,
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
                this.setState({loading:false}); // swaps loading with the purchase
                this.props.history.push('/');//redirects to home page after submitting data 
            })
            .catch(error=>{
                console.log(error);
                this.setState({loading:false}); // swaps loading with the purchase
            });
        console.log(this.props.ingredients);
    }
    render(){
        let form = (<form>
            <input type="text" name="name" placeholder="Your name"/>
            <input type="text" name="email" placeholder="Your email"/>
            <input type="text" name="street" placeholder="Your street"/>
            <input type="text" name="postal" placeholder="Your postal code"/>
            <Button btnType ="Success" clicked={this.orderHandler}>ORDER</Button>
         </form>);
        if(this.state.loading){
            form = <Spinner/>;
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Form</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;