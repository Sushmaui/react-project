import React, { Component } from 'react';
import Title from './Title';
import { Link } from 'react-router-dom';
import { DeviceConsumer } from '../Context';

export default class Details extends Component {


  render() {
    return (
      <React.Fragment>

        <DeviceConsumer>
          {value => {
            const { id, title, price, defaultPrice, color, capacity, info, inCart, colorName, totalAmount } = value.details;
            const { selectedColor, selectedCapacity, openModal, handleChange } = value
            console.log('value details :::', value.details)


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
                      <h4>Capacity:</h4>
                      <h4>{capacity.map(result => (
                        <p >
                          <input type="radio" value={result} name="capacityValue" onChange={(e, id) => selectedCapacity(e, id)} />
                          <b>{result}</b>
                        </p>

                      ))}
                      </h4>

                      <h4><strong>Price:<span>$</span>{defaultPrice}</strong></h4>
                      <a href="#" title="info" onClick={() => { value.openModal(id) }}>More Details</a>

                      <h4>{totalAmount.map(result => (
                        <p >
                          <input type="radio" value={result} name="amountValue" onChange={(e, id) => handleChange(e, id)} />
                          <b>{result}</b>
                        </p>

                      ))}
                      </h4>
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