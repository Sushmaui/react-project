import React, { Component } from 'react';
import Title from './Title';
import { Link } from 'react-router-dom';
import { DeviceConsumer } from '../Context';

export default class Details extends Component {
    render(){
       // const { id, title, price, color, capacity, info, inCart } = this.props.details;
        return(
            <React.Fragment>

                <DeviceConsumer>
                    {value => {
                        const { id, title, price, color, capacity, info, inCart } = value.details;
                        console.log(value.details)
                        // return value.details.map(details =>{
                        // return (
                            
                        //     <div className="container">
                        //         <Title  title="Device Details" />
                        //         <div className="row">
                        //             <div className="col-10 mx-auto col-md-6 my-3 ">
                        //             <img src={`devices/${details.id}.jpg`} height="500px"/>
                        //             </div>
                        //             <div className="col-10 col-md-6 text-capaitalize">
                        //                 <h4>Model : {details.title}</h4>
                        //                 <h4>About Device</h4><p>{details.info}</p>
                        //                 <h4>Color: {details.color}</h4>
                        //                 <h4>Capacity:{details.capacity}</h4> 
                        //                 <h4><strong>Price:<span>$</span>{details.price}</strong></h4>
                        //                 <div>
                        //                     <Link to='/'>
                        //                         <button className= "btn btn-primary " >Back to Devices</button>
                        //                     </Link>
                                            
                        //                     <button className="btn btn-success" disabled={inCart ? true : false} onClick={() => {value.addToCart(id)}
                        //                      }>
                        //                         {inCart ? "inCart" : "add to cart"}
                        //                     </button>
                        //                 </div>
                        //             </div>
                        //         </div>
                        //     </div>
                        //     // <div>
                        //     //     hello
                        //     // </div>
                        // )
                        // })

                        return (
                            
                            <div className="container">
                                {/* <Title  title="Device Details" /> */}
                                <h1 className="text-center text-uppercase">{title}</h1>
                                <div className="row">
                                    <div className="col-10 mx-auto col-md-6 my-3 ">
                                    <img src={`devices/${id}.jpg`} height="500px"/>
                                    </div>
                                    <div className="col-10 col-md-6 text-capaitalize">
                                        <h4>Model : {title}</h4>
                                        <h4>About Device</h4><p>{info}</p>
                                        <h4>Color: {color}</h4>
                                        <h4>Capacity:{capacity}</h4> 
                                        <h4><strong>Price:<span>$</span>{price}</strong></h4>
                                        <div>
                                            <Link to='/'>
                                                <button className= "btn btn-primary " >Back to Devices</button>
                                            </Link>
                                            
                                            <button className="btn btn-success" disabled={inCart ? true : false} onClick={() => {value.addToCart(id)}
                                             }>
                                                {inCart ? "inCart" : "add to cart"}
                                            </button>
                                            <Link to='/cart'>
                                            <button className="btn btn-success">Check Out</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }}
                </DeviceConsumer>
            </React.Fragment>
        )
    }
}