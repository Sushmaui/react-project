import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { DeviceConsumer } from "../Context";
import PropTypes from 'prop-types'

export default class Devices extends Component {


  render() {

    const { id, title, price, inCart } = this.props.devices;

    return (
      <div className="col-md-4">
        <div className="thumbnail text-center"  >
          <div className=" card ">
            <DeviceConsumer>
              {(value) => {
                return (
                  <div>
                    <div className="img-container" onClick={() => value.handleDetail(id)}>
                      <Link to="/details">
                        <img src={`devices/${this.props.devices.id}.jpg`} />
                        <button className="details-btn btn-primary" hidden>Details</button>
                      </Link>
                    </div>
                    <button className="details-btn btn-info" onClick={() => value.openModal(id)}>Details</button>

                    <h4>
                      {this.props.devices.title}
                    </h4>
                    <button className="btn btn-primary btn-lg " disabled={this.props.devices.inCart ? true : false} onClick={() => { value.addToCart(id) }} >{inCart ? "inCart" : "add to cart"}</button>
                  </div>
                )

              }}
            </DeviceConsumer>
          </div>
        </div>
      </div>
    )
  }
}

Devices.propTypes = {
  devices: PropTypes.shape({
    id: PropTypes.number,
    img: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    inCart: PropTypes.bool
  }).isRequired
}

