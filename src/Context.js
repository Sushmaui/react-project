import React, { Component } from 'react'
// import {devicesStore, deviceDetails} from './data'

const DeviceContext= React.createContext();
//Provider
//Consumer


class DeviceProvider extends Component {

    constructor(props){
        super(props);
        this.state = {devices:[], filteredDevices: [], details: [], cart: [], colorName:'', cartSubTotal:0, cartTax:0,cartTotal:0};
      }
    componentDidMount() {
        // fetch("http://localhost:8000/devices").then(res => res.json())
        // .then(data => this.setState({
        //   devices:data,
        //   filteredDevices: data
        // }))
        // fetch("http://localhost:8000/details").this(res => res.json())
        // .then(data => this.setState({
        //     details:data
        // }))
        const urls =[
            'http://localhost:8000/devices',
            'http://localhost:8000/details'
        ]
        Promise.all(urls.map(url => fetch(url).then(res => res.json())))
            .then(data => {
                const data_devices = data[0];
                const data_details = data[1];
                this.setState({
                    devices: data_devices,
                    filteredDevices: data_devices,
                    details: data_details,

                })
            })
    }
    // state={
    //     devices: devicesStore,
    //     deviceDetails: deviceDetails,
    // };

    setDevices(){
        fetch("http://localhost:8000/devices").then(res => res.json())
        .then(data => this.setState({
          devices:data,
        }))
    }

    getItem =(id) =>{
        const device =this.state.devices.find(item => item.id === id);
        return device;
    }

    selectedColor =(e) => {
        // let tempDevice = [...this.state.devices]
        // const index = tempDevice.indexOf(this.getItem(id));
        // const device = tempDevice[index];
        // device.color = e.target.value
        let colorname= e.target.value
                 this.setState(()=>{
                     return {colorName:colorname}
                     
                 })
  
    }

    handleDetail = (id) => {
     console.log('helo from details')
     const device = this.getItem(id);
     this.setState(() => {
         return {details:device}
     })
    };
    addToCart = (id) => {
        console.log(`helo from add to cart id is:${id}`)
        let tempDevice = [...this.state.devices]
        const index = tempDevice.indexOf(this.getItem(id));
        const device = tempDevice[index];
        device.inCart = true;
        device.count = 1;
        const price = device.price;
        device.total = price;
        this.setState(() => {
            return{devices: tempDevice, cart: [...this.state.cart, device]};
        
        },
        () => {
            this.addTotal();
        })
    };

    increment = (id) => {
        let tempCart = [...this.state.cart];
        const selectedDevice = tempCart.find(item => item.id === id)

        const index = tempCart.indexOf(selectedDevice);
        const device = tempCart[index];

        device.count = device.count + 1;
        device.total = device.count * device.price;

        this.setState(()=>{
            return{cart:[...tempCart]}
        },()=>{
            this.addTotal()
        })
    }

    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const selectedDevice = tempCart.find(item => item.id === id)

        const index = tempCart.indexOf(selectedDevice);
        const device = tempCart[index];

        device.count = device.count - 1;
        
        if(device.count === 0){
            this.removeItem(id)
        }else{
            device.total = device.count * device.price;
        }

        this.setState(()=>{
            return{cart:[...tempCart]}
        },()=>{
            this.addTotal()
        })
    }

    removeItem =(id) => {
         let tempDevices = [...this.state.devices];
         let tempCart = [...this.state.cart];
         
         tempCart = tempCart.filter(item => item.id !== id);
         
         const index = tempDevices.indexOf(this.getItem(id));
         let removedDevice = tempDevices[index];
         removedDevice.inCart=false;
         removedDevice.count=0;
         removedDevice.total=0;

         this.setState(()=>{
             return {
                 cart : [...tempCart],
                 product : [...tempDevices]
             }
         },() => {
             this.addTotal();
         })


    }

    editDetails=(id) =>{
        let tempCart = [...this.state.cart];
        const index = tempCart.indexOf(this.getItem(id));
        let device = tempCart[index]
        this.setState(()=>{
            return {details:device}
        })
       
    }

    clearCart =() =>{
        this.setState(()=>{
            return {cart:[]}
        },() => {
            this.setDevices();
            this.addTotal();
        })
    }
    
    addTotal =() => {
        let subTotal = 0;
        this.state.cart.map(item => (subTotal += item.total));
        const tempTax =subTotal * 0.2;
        const tax =parseFloat(tempTax.toFixed(2));
        const total =subTotal+ tax
        this.setState(()=>{
            return{
                cartSubTotal:subTotal,
                cartTax:tax,
                cartTotal:total
            }
        })
       
        
    }
    render(){
        return(
            <DeviceContext.Provider value={{
                ...this.state,
                handleDetail:this.handleDetail,
                addToCart: this.addToCart,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                editDetails: this.editDetails,
                clearCart:this.clearCart,
                selectedColor:this.selectedColor
            }}>
                {this.props.children}
            </DeviceContext.Provider>
        )
    }
}

const DeviceConsumer = DeviceContext.Consumer;

export { DeviceProvider , DeviceConsumer };