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
        const formData = {};
        //creating key value pairs
        for (let formElementIndentifier in this.state.orderForm){
            // where we add properties like name, email.. and setting it to equal to whatever the user has input
            formData[formElementIndentifier] = this.state.orderForm[formElementIndentifier].value;
        }
        this.setState({loading:true}); // changing the state and making the loader to show
        const order = {
            ingredients: this.props.ingredients,
            price:this.props.price,
            orderData:formData
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

    // detects input chanage for all form elements
    inputChangedHandler=(event, inputIdentifier)=>{
        //console.log(event.target.value);
        const updatedOrderForm = {//cloning the orderForm object from state
            ...this.state.orderForm
        }
        // updatedOrderForm[name],  updatedOrderForm[email]...
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        //updates the value state with the changed input
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm:updatedOrderForm});
    }
    render(){
        // creating array of the object form in the state
        const formElementsArray = [];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id:key, // name, street...
                config:this.state.orderForm[key] // the object of name,street,///
                
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {/* maps through the array and creates the form elements deriving the from the object */}
            {formElementsArray.map(formElement=>(
                <Input 
                        key={formElement.id}
                        changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}/>
            ))}
                <Button btnType ="Success" >ORDER</Button>
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