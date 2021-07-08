import React, { Component } from 'react'

const DeviceContext = React.createContext();
//Provider
//Consumer


class DeviceProvider extends Component {

    constructor(props) {
        super(props);
        this.state = { devices: [], filteredDevices: [], details: [], cart: [], modalOpen: false, modalDevice: [], colorName: '', capacitySelected: '', priceSelected: '', cartSubTotal: 0, cartTax: 0, cartTotal: 0, totalChanged: '',hover:false };
    }
    componentDidMount() {

        const urls = [
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
                    modalDevice: data_details,

                })
            })
    }

    setDevices() {
        fetch("http://localhost:8000/devices").then(res => res.json())
            .then(data => this.setState({
                devices: data,
            }))
    }

    getItem = (id) => {
        const device = this.state.devices.find(item => item.id === id);
        return device;
    }

    selectedColor = (e) => {
        let colorname = e.target.value
        this.setState(() => {
            return { colorName: colorname }

        }, () => {
            console.log("im a color::", this.state.colorName)
        })

    }

    selectedCapacity = (e, id) => {
        let capacityselected = e.target.value

        this.setState({
            capacitySelected: capacityselected


        }, () => {
           this.selectedPrice(id)
        })


    }

    selectedPrice = (id) => {
        const details = this.getItem(id);
        const priceselected = this.state.capacitySelected ? this.state.details.price[this.state.capacitySelected] : '';
        this.state.details.defaultPrice = priceselected;
        this.setState({
            priceSelected: priceselected
        })
    }

    handleDetail = (id) => {
        console.log('helo from details')
        const device = this.getItem(id);
        this.setState(() => {
            return { details: device }
        })
    };
    addToCart = (id) => {
        console.log(`helo from add to cart id is:${id}`)
        let tempDevice = [...this.state.devices]
        const index = tempDevice.indexOf(this.getItem(id));
        const device = tempDevice[index];
        device.inCart = true;
        device.count = 1;
        const price = this.state.capacitySelected ? device.price[this.state.capacitySelected] : '';
        device.total = price;
        device.price = price;
        console.log(price);
        device.selectedColor = this.state.colorName;
        device.selectedCapacity = this.state.capacitySelected;
        this.setState(() => {
            return { devices: tempDevice, cart: [...this.state.cart, device] };

        },
            (e) => {
                this.addTotal(id);
               // this.addSubTotal()
            })
    };

    increment = (id) => {
        let tempCart = [...this.state.cart];
        const selectedDevice = tempCart.find(item => item.id === id)

        const index = tempCart.indexOf(selectedDevice);
        const device = tempCart[index];

        device.count = device.count + 1;
        const tempTotal = device.count * device.pay;

        const total = parseFloat(tempTotal.toFixed(2));
        device.total = total;
        
        

        this.setState(() => {
            return { cart: [...tempCart] }
        }, () => {
            //this.addSubTotal();
        })
    }

    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const selectedDevice = tempCart.find(item => item.id === id)

        const index = tempCart.indexOf(selectedDevice);
        const device = tempCart[index];

        device.count = device.count - 1;

        if (device.count === 0) {
            this.removeItem(id)
        } else {
           
            const tempTotal = device.count * device.pay;

           const total = parseFloat(tempTotal.toFixed(2));
         device.total = total;
        }

        this.setState(() => {
            return { cart: [...tempCart] }
        }, () => {
           // this.addSubTotal();
        })
    }

    removeItem = (id) => {
        let tempDevices = [...this.state.devices];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id);

        const index = tempDevices.indexOf(this.getItem(id));
        let removedDevice = tempDevices[index];
        removedDevice.inCart = false;
        removedDevice.count = 0;
        removedDevice.total = 0;

        this.setState(() => {
            return {
                cart: [...tempCart],
                device: [...tempDevices]
            }
        }, () => {
            this.addSubTotal();
        })


    }

    editDetails = (id) => {
        let tempCart = [...this.state.cart];
        const index = tempCart.indexOf(this.getItem(id));
        let device = tempCart[index]
        this.setState(() => {
            return { details: device }
        },()=>{
           //this.selectedPrice(id)
        })

    }

    clearCart = () => {
        this.setState(() => {
            return { cart: [] }
        }, () => {
            this.setDevices();
            this.addSubTotal();
        })
    }


    handleChange = (e) => {

        let totalchanged = e.target.value
        console.log(totalchanged)
        this.setState(() => {
            return { totalChanged: totalchanged }
        })
    }

    addTotal = (id) => {
        let tempDevice = [...this.state.devices]
        const index = tempDevice.indexOf(this.getItem(id));
        const device = tempDevice[index];
        let subTotal = 0;
        subTotal = device.total
        const tempemisubtotal = subTotal / 12;
        const emisubtotal = parseFloat(tempemisubtotal.toFixed(2));
        
        if (this.state.totalChanged === "emi") {
            console.log("i'm here to test it:::::", emisubtotal)
            this.setState(() => {
               
                    device.pay= emisubtotal
                    device.total= device.pay
             
            })
        }
        else{
                        
            this.setState(() => {
               device.pay= subTotal
            })
        }


    }

    addSubTotal = () => {
        let subTotal = 0;
        this.state.cart.map(item => (subTotal += item.total));
        const tempTax = subTotal * 0.2;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax
        this.setState(() => {
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }



    openModal = (id) => {
        const device = this.getItem(id);
        this.setState(() => {
            return { modalDevice: device, modalOpen: true }
        })
    }

    closeModal = () => {
        this.setState(() => {
            return { modalOpen: false }
        })
    }

    handleMouseIn(){
        this.setState({hover:true})
    }
    handleMouseOut(){
        this.setState({hover:false})
    }

    render() {
        return (
            <DeviceContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                editDetails: this.editDetails,
                clearCart: this.clearCart,
                selectedColor: this.selectedColor,
                selectedCapacity: this.selectedCapacity,
                openModal: this.openModal,
                closeModal: this.closeModal,
                handleChange: this.handleChange,
                addSubTotal:this.addSubTotal
            }}>
                {this.props.children}
            </DeviceContext.Provider>
        )
    }
}

const DeviceConsumer = DeviceContext.Consumer;

export { DeviceProvider, DeviceConsumer };