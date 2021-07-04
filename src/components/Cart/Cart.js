import React, { Component } from 'react'
import Title from "../Title";
import CartColoums from './CartColoums';
import EmptyCart from './EmptyCart';
import CartList from './CartList';
import CartTotal from './CartTotal'
import { DeviceConsumer } from '../../Context';
import { Link } from 'react-router-dom';

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
                                    <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-12 text-capitalize  text-right">
                                    <Link to='/'>
                                        <button className= "btn btn-primary btn-lg">Add Devices</button>
                                    </Link>
                                    </div>
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