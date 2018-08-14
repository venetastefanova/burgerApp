import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component{
    state={
        orderForm:{
                name: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Name'
                    },
                    value: ''
                },
                street: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Street'
                    },
                    value: ''
                },
                zipCode: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your zipCode'
                    },
                    value: ''
                },
                country: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Country'
                    },
                    value: ''
                },
                email: {
                    elementType:'input',
                    elementConfig:{
                        type:'email',
                        placeholder:'Your email'
                    },
                    value: ''
                },
                deliveryMethod:{
                    elementType:'select',
                    elementConfig:{
                        options:[
                            {value:'fastest', displayValue: 'fastest'},
                            {value:'cheapest', displayValue: 'cheapest'}                            
                        ]
                    },
                    value: ''
                }
        },
        loading:false
    }

    orderHandler=(event)=>{
        event.preventDefault(); // prevents from reload of the page after clicking the form button

        this.setState({loading:true}); // changing the state and making the loader to show
        const order = {
            ingredients: this.props.ingredients,
            price:this.props.price
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
            <Input />
            <Input inputtype= "input" type="email" name="email" placeholder="Your email"/>
            <Input inputtype= "input" type="text" name="street" placeholder="Your street"/>
            <Input inputtype= "input" type="text" name="postal" placeholder="Your postal code"/>
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