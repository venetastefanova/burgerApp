import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const purchaseBurgerSuccess = (orderId)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:orderId,
        orderData:orderData
    }
}

export const purchaseBurgerFail = (error)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}

export const purchaseBurgerStart = (orderData)=>{
    return dispatch=>{
        axios.post("/orders.json", orderData) //sending post to firebase, firebase uses .json extension after path
        .then(response=>{
            dispatch(purchaseBurgerSuccess(response.data,orderData));
        })
        .catch(error=>{
            dispatch(purchaseBurgerFail(error));
        });
    }
}