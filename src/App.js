import React, { Component } from 'react';
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, withRouter } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount(){
    this.props.onTrySignup();
  }

  render() {
    return (
      <div>
        <Layout>
          <Route path="/orders" component={Orders}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/auth"  component={Auth}/>
          <Route path="/logout" component={Logout}/>
          </Layout>
      </div>
    );
  }
}


const mapDispatchToPro = dispatch => {
  return{
    onTrySignup: ()  => dispatch(actions.authCheckState())
  }
}
//withRouter is added because otherwise connect( breaks the routing for the app
export default withRouter(connect(null, mapDispatchToPro)(App));
