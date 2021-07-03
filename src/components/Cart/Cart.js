import React, { Component } from 'react'
import Title from "../Title";
import CartColoums from './CartColoums';
import EmptyCart from './EmptyCart';
import CartList from './CartList';
import CartTotal from './CartTotal'
import { DeviceConsumer } from '../../Context';

export default class Cart extends Component {
    render(){
        return(
            <section>
                <DeviceConsumer>
                    {value =>{
                        const { cart } =value;
                        if(cart.length > 0){
                            return(
                                <React.Fragment>
                                    <Title name="Your" title="Cart"/>
                                    <CartColoums />
                                    <CartList value={value}/>
                                    <CartTotal value={value}/>
                                </React.Fragment>
                               
                            )
                        }else {
                           return <EmptyCart />
                        }
                    }}
                </DeviceConsumer>
                
                
            </section>
        )
    }
}