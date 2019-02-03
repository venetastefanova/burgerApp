import React, {Component} from 'react';
import classes from "./Modal.css";
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        // update if show props change OR update if the props children are different, in this case rendering theorderSummary or loader
         return (nextProps.show !== this.props.show) || nextProps.children !==this.props.children;
    }

    componentWillUpdate(){
        //console.log("modal will update");
    }
    render(){
        return(
            <Aux>
            <Backdrop clicked={this.props.modalClosed} show = {this.props.show}/>
            <div 
            style={{
                transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity : this.props.show ? '1' : '0'
            }}
            className={classes.Modal}>
            {this.props.children}
        </div>

        </Aux>
        );
    }
}

export default Modal;