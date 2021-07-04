import React, { Component } from 'react';
import Devices from './Devices';
import Title from './Title';
import { DeviceConsumer } from '../Context';


export default class DeviceList extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {devices:[], filteredDevices: []};
    //   }
    //   componentWillMount(){
    //     fetch("http://localhost:8000/devices").then(res => res.json())
    //     .then(data => this.setState({
    //       devices:data,
    //       filteredDevices: data
    //     }))
    //   }
    render(){
        return(
          <React.Fragment>
            <div className="container">
              <Title className="p-3 m-3" title="Devices" />
              <div className="row mt-5 pt-5">
                {/* <Devices devices={this.state.filteredDevices} handleAddCart={this.handleAddCart} /> */}
                <DeviceConsumer>
                  {value => {
                    console.log(value);
                    return value.devices.map(devices =>{
                      return <Devices key={devices.id} devices={devices}/>
                    })
                  
                  }}
                </DeviceConsumer>
              </div>
            </div>

          </React.Fragment>


        )
    }
}