import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error:null // error is initially none
        }
        // creates global error handler
        componentDidMount(){
            axios.interceptors.request.use(req=>{
                this.setState({error:null}); // clearing error on request
                return req; // returns the request so it can continue
            });
            axios.interceptors.response.use(res=>res,error => { // returns response so it can continue
                this.setState({error:error});
            });

        }

        errorConfirmedHandler = () => {
            this.setState({error:null});
        }
        render() {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed = {this.errorConfirmedHandler}>
                        {/* if there is an error, print the error, else - nothing */}
                        {this.state.error ? this.state.error.message : null }
                    </Modal>
                    {/* {...props} makes sure that the wrapper component receive its passed props */}
                    <WrappedComponent {...this.props}/>
    
                </Aux>
            );
        }
    }
}

export default withErrorHandler;