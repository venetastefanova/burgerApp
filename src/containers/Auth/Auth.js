import React, { Component } from 'react'
import { connect } from 'react-redux'
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from './Auth.css';
import * as actions from "../../store/actions/index";
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {updateObject} from '../../shared/utility';

export class Auth extends Component {
  state ={
      controls:{
        email: {
            elementType:'input',
            elementConfig:{
                type:'email',
                placeholder:'Email Address'
            },
            value: '',
            validation:{
                required:true,
                isEmail:true
            },
            valid:false,                    
            touched: false
        },
        password: {
            elementType:'input',
            elementConfig:{
                type:'password',
                placeholder:'Password'
            },
            value: '',
            validation:{
                required:true,
                minLength:6
            },
            valid:false,                    
            touched: false
        },
      },
      isSignup:true
  }

  componentDidMount() {
    if(!this.props.buildingBurger && this.props.authRedirectPath !=="/") {//if we are not building a burger and we are not on the building page 
        this.props.onSetAuthRedirectPath();
    }
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
    inputChangedHandler=(event, controlName)=>{
        const updatedControls = updateObject(this.state.controls, {
            [controlName]:updateObject(this.state.controls[controlName],{
                value:event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched:true
            })
        })

        this.setState({controls:updatedControls});
    }

    submitHandler = (event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }

    switchAuthModeHandler=()=>{
        this.setState(prevState=>{
            return {isSignup:!prevState.isSignup}
        })
    }
  render() {
    // creating array of the object form in the state
    const formElementsArray = [];
    for (let key in this.state.controls){
        formElementsArray.push({
            id:key, // name, street...
            config:this.state.controls[key] // the object of name,street,///
            
        })
    }

    let form = formElementsArray.map(formElement=>(
        <Input
            key = {formElement.id}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            shouldValidate={formElement.config.validation}
            changed={(event)=>this.inputChangedHandler(event,formElement.id)}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}/>

    ))

    if(this.props.loading){
        form = <Spinner/>
    }

    let errorMessage = null;
    if(this.props.error){
        errorMessage = (
            <p>{this.props.error.message}</p>
        )
    }

    if(this.props.isAuthenticated){
        return <Redirect to={this.props.authRedirectPath}/>
    }
    return (
      <div className={classes.Auth}>
      {errorMessage}
        <form onSubmit={this.submitHandler}>
            {form}
                 <Button btnType="Success">Submit</Button>

        </form>
        <Button 
            clicked={this.switchAuthModeHandler}
            btnType="Danger">SWITCH TO {this.state.isSignup ? "SIGNUP" : "LOGIN"}</Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        loading: state.authReducer.loading,
        error:state.authReducer.error,
        isAuthenticated:state.authReducer.token !== null,
        buildingBurger: state.burgerReducer.building,
        authRedirectPath : state.authReducer.authRedirectPath
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onAuth: (email,password,isSignup) => dispatch(actions.auth(email,password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
