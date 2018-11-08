import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const purchaseBurgerSuccess = (id,orderData)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}

export const purchaseBurgerFail = (error)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}
export const purchaseBurgerStart = () =>{
    return {
        type:actionTypes.PURCHASE_BURGER_START
    }
}
export const purchaseBurger = (orderData,token)=>{
    return dispatch=>{
        dispatch(purchaseBurgerStart());
        axios.post("/orders.json?auth="+token, orderData) //sending post to firebase, firebase uses .json extension after path
        .then(response=>{
            dispatch(purchaseBurgerSuccess(response.data.name,orderData));
        })
        .catch(error=>{
            dispatch(purchaseBurgerFail(error));
        });
    }
}

export const purchaseInit = () => {
  return {
      type:actionTypes.PURCHASE_INIT
      
  }
}

export const fetchOrderSuccess = (orders) => {
    return{
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    } 
}

export const fetchOrderFail = (error) => {
    return{
        type:actionTypes.FETCH_ORDERS_FAIL,
        error:error
    } 
}

export const fetchOrderStart = () => {
    return{
        type:actionTypes.FETCH_ORDERS_START,
       
    } 
}

export const fetchOrders= (token)=>{
    return (dispatch)=>{
        dispatch(fetchOrderStart());
        axios.get('/orders.json?auth='+token)
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
            dispatch(fetchOrderSuccess(fetchedOrders));
        })
        .catch(err=>{
            dispatch(fetchOrderFail(err));
            
        })
    }
}