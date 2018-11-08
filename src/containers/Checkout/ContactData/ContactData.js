import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import axios from '../../../axios-orders';
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../../store/actions/index';

class ContactData extends Component{
    state={
        orderForm:{
                name: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Name'
                    },
                    value: '',
                    validation:{
                        required:true
                    },
                    valid:false,                    
                    touched: false
                },
                street: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Street'
                    },
                    value: '',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched: false
                    
                },
                zipCode: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your zipCode'
                    },
                    value: '',
                    validation:{
                        required:true,
                        minLength:5,
                        maxLength:5
                    },
                    valid:false,
                    touched: false
                    
                },
                country: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Country'
                    },
                    value: '',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched: false
                    
                },
                email: {
                    elementType:'input',
                    elementConfig:{
                        type:'email',
                        placeholder:'Your email'
                    },
                    value: '',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched: false
                    
                },
                deliveryMethod:{
                    elementType:'select',
                    elementConfig:{
                        options:[
                            {value:'fastest', displayValue: 'fastest'},
                            {value:'cheapest', displayValue: 'cheapest'}                            
                        ]
                    },
                    value: 'fastest',
                    validation:{},  // fixes a validation error
                    valid:true
                }
        },
        formIsValid:false,
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
            ingredients: this.props.ings,
            price:this.props.price,
            orderData:formData
        }
       this.props.onOrderBurger(order, this.props.token);
    }
    

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
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
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation)
        updatedFormElement.touched = true;
        let formIsValid = true;
        //checks if all inputs are valid
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid; // 
        }
        console.log(formIsValid);
        //console.log(updatedFormElement);
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm:updatedOrderForm, formIsValid:formIsValid});
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
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                        shouldValidate={formElement.config.validation}
                        changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}/>
            ))}
                <Button btnType ="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>);
        if(this.props.loading){
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


const mapStateToProps = state => {
    return {
        ings:state.burgerReducer.ingredients,
        price:state.burgerReducer.totalPrice,
        loading:state.orderReducer.loading,
        token:state.authReducer.token
    }
}


const mapDispatchToProps = dispatch => {
    return{
        onOrderBurger: (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData,axios));