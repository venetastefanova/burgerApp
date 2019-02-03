import React, { Component } from 'react';
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import { Route, withRouter,Switch, Redirect } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

const asyncCheckout = asyncComponent(()=>{
  return import('./containers/Checkout/Checkout');
});
const asyncOrders = asyncComponent(()=>{
  return import('./containers/Orders/Orders');
});
const asyncAuth = asyncComponent(()=>{
  return import('./containers/Auth/Auth');
});

class App extends Component {

  componentDidMount(){
    this.props.onTrySignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder}/>
        <Route path="/auth"  component={asyncAuth}/>
        <Redirect to="/"/> 
      </Switch>
    )

    if(this.props.isAuthenticated){
     routes = (
        <Switch>
          <Route path="/orders" component={asyncOrders}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/checkout" component={asyncCheckout}/>        
          <Route path="/auth"  component={asyncAuth}/>
          <Route path="/logout" component={Logout}/>
          <Redirect to="/"/>

        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.authReducer.token !==null
  }
}
const mapDispatchToPro = dispatch => {
  return{
    onTrySignup: ()  => dispatch(actions.authCheckState())
  }
}
//withRouter is added because otherwise connect( breaks the routing for the app
export default withRouter(connect(mapStateToProps, mapDispatchToPro)(App));
