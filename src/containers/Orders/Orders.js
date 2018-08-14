import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{
    state={
        orders:[],
        loading:true
    }
    componentDidMount(){
        axios.get('/orders.json')
        .then(res=>{
            const fetchedOrders=[];
            for(let key in res.data){
                //order objects with ids
                fetchedOrders.push({
                    ...res.data[key],
                     id: key
                    });
            }
            console.log(res.data);
            this.setState({loading:false,  orders:fetchedOrders})
        })
        .catch(err=>{
            this.setState({loading:false})
            
        })
    }
    render(){
        return(
            <div>
                {/* rendering the orders */}
                                  {/* passing the information to Order from the object from DB */}

               {this.state.orders.map(order=>{
                  return <Order 
                  ingredients={order.ingredients}
                  price={+order.price}
                  key={order.id}/>
               })}

            </div>
        );
    }
}

export default withErrorHandler(Orders,axios);