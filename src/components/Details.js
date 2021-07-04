import React, { Component, userState } from 'react';
import Title from './Title';
import { Link } from 'react-router-dom';
import { DeviceConsumer } from '../Context';

export default class Details extends Component {
  render() {
    // const { id, title, price, color, capacity, info, inCart } = this.props.details;
    return (
      <React.Fragment>

        <DeviceConsumer>
          {value => {
            const { id, title, price, color, capacity, info, inCart, colorName } = value.details;
            const { selectedColor } = value
            console.log(value.details)

            // this.state= {checked:''}
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
              <div>

                <div className="container">
                  <div className="p-3 m-3">
                  <h1 className="text-center text-uppercase pb-10">{title}</h1>
                  </div>
                  <div className="row mt-5 pt-5">
                    <div className="col-10  col-md-6 my-3 ">
                      <img src={`devices/${id}.jpg`} height="500px" ></img>
                    </div>
                    <div className="col-10 col-md-6 mt-3 pt-3 text-capaitalize">

                      <h4>Model : {title}</h4>
                      <h4 className="d-none d-xl-block">About Device<p>{info}</p></h4>
                      <h4>{color.map(result => (
                        <p >
                          <input type="radio" value={result} name="colorValue" onChange={(e) => selectedColor(e)} />
                          <b>{result}</b>
                        </p>

                      ))}
                      </h4>

                      <h4>Capacity:{capacity}</h4>
                      <h4><strong>Price:<span>$</span>{price}</strong></h4>
                      <a href="#" className="d-none d-sm-block d-md-none text-info" data-toggle="tooltip" title="info">More Details</a>
                      <div>
                        <Link to='/'>
                          <button className="btn btn-primary " >Back to Devices</button>
                        </Link>

                        <button className="btn btn-success" hidden={inCart ? true : false} onClick={() => { value.addToCart(id) }
                        }>
                          {inCart ? "inCart" : "add to cart"}
                        </button>
                        <Link to='/cart'>
                          <button className="btn btn-info" >Checkout</button>
                        </Link>
                      </div>
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