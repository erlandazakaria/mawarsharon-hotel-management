// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import routes from '../constants/routes';
import './bookingPopup.css';

type Props = {
  detail: Object,
  onPrint: () => void,
  closeBookingPopup: () => void
};

export default class BookingPopup extends Component<Props> {
  props: Props;

  state = {
    checkinId: 0,
    checkinNik: '',
    checkinName: '',
    checkinAdd: '',
    checkinPhone: '',
    checkinCheckin: '',
    checkinCheckout: '',
    checkinPrice: '',
    checkinAddons: [],
    checkinGrand: 0,
    checkinPpn: 0,
    checkinTotal: 0,
    checkoutId: 0,
    checkoutNik: '',
    checkoutName: '',
    checkoutAdd: '',
    checkoutPhone: '',
    checkoutCheckin: '',
    checkoutCheckout: '',
    checkoutPrice: '',
    checkoutAddons: [],
    checkoutGrand: 0,
    checkoutPpn: 0,
    checkoutTotal: 0,
  }

  componentDidMount() {
      const { detail } = this.props;
      if(detail.book && detail.book[0] && detail.book[0].id_book) {
            let bookAddons = [];
            let COBookAddons = [];
            let checkinBook = {};
            let checkoutBook = {};
            if (detail.book[0].lastDay === false) {
                checkinBook = detail.book[0];
                if(detail.book[1]) { checkoutBook= detail.book[1] }
            } else if (detail.book[0].lastDay === true) {
                checkoutBook = detail.book[0];
                if(detail.book[1]) { checkinBook= detail.book[1] }
            } 
        //   else if (detail.book && detail.book[1] && detail.book[1].lastDay === false) {
        //       checkinBook = detail.book[1];
        //       checkoutBook = detail.book[0]
        //   }
          if(checkinBook && checkinBook.id_book) {
                if(checkinBook.booking_addons !== '') {
                    let splitAddons = checkinBook.booking_addons.split(',');
                    if(splitAddons && splitAddons[0]) {
                        for(let i = 0; i <splitAddons.length; i++) {
                            bookAddons.push(splitAddons[i])
                            const table = document.getElementById("checkin-addons")
                            let row = table.insertRow(1 + i);
                            let cell1 = row.insertCell(0);
                            let cell2 = row.insertCell(1);
                            let cell3 = row.insertCell(2);
                            let splitAddon = splitAddons[i].split(':');
                            cell1.innerHTML = `<input type="text" className="content-checkin-add-ons-name" placeholder="extrabed" id="addonName${i}" value=${splitAddon[0]} />`;
                            cell2.innerHTML = `<input type="number" className="content-checkin-add-ons-count" placeholder="1" id="addonCount${i}" value=${splitAddon[1]} />`;
                            cell3.innerHTML = `<input type="number" className="content-checkin-add-ons-price" placeholder="50000" id="addonPrice${i}" value=${splitAddon[2]} />`; 
                            document.getElementById(`addonName${i}`).addEventListener("change", (e) => this.changeAddons(e))
                            document.getElementById(`addonCount${i}`).addEventListener("change", (e) => this.changeAddons(e))
                            document.getElementById(`addonPrice${i}`).addEventListener("change", (e) => this.changeAddons(e))
                        }
                    }
                }
                this.setState({
                    checkinId: checkinBook.id_book,
                    checkinNik: checkinBook.booking_nik,
                    checkinName: checkinBook.booking_name,
                    checkinAdd: checkinBook.booking_address,
                    checkinPhone: checkinBook.booking_phone,
                    checkinCheckin: checkinBook.booking_checkin,
                    checkinCheckout: checkinBook.booking_checkout,
                    checkinPrice: checkinBook.room_price,
                    checkinAddons: bookAddons
                })
            }
            if(checkoutBook && checkoutBook.id_book) {
                if(checkoutBook.booking_addons !== '') {
                    let splitAddons = checkoutBook.booking_addons.split(',');
                    if(splitAddons && splitAddons[0]) {
                        for(let i = 0; i <splitAddons.length; i++) {
                            COBookAddons.push(splitAddons[i])
                            const table = document.getElementById("checkout-addons")
                            let row = table.insertRow(1 + i);
                            let cell1 = row.insertCell(0);
                            let cell2 = row.insertCell(1);
                            let cell3 = row.insertCell(2);
                            let splitAddon = splitAddons[i].split(':');
                            cell1.innerHTML = `<input type="text" className="content-checkout-add-ons-name" placeholder="extrabed" id="coAddonName${i}" value=${splitAddon[0]} />`;
                            cell2.innerHTML = `<input type="number" className="content-checkout-add-ons-count" placeholder="1" id="coAddonCount${i}" value=${splitAddon[1]} />`;
                            cell3.innerHTML = `<input type="number" className="content-checkout-add-ons-price" placeholder="50000" id="coAddonPrice${i}" value=${splitAddon[2]} />`; 
                            document.getElementById(`coAddonName${i}`).addEventListener("change", (e) => this.changeCOAddons(e))
                            document.getElementById(`coAddonCount${i}`).addEventListener("change", (e) => this.changeCOAddons(e))
                            document.getElementById(`coAddonPrice${i}`).addEventListener("change", (e) => this.changeCOAddons(e))
                        }
                    }
                }
                this.setState({
                    checkoutId: checkoutBook.id_book,
                    checkoutNik: checkoutBook.booking_nik,
                    checkoutName: checkoutBook.booking_name,
                    checkoutAdd: checkoutBook.booking_address,
                    checkoutPhone: checkoutBook.booking_phone,
                    checkoutCheckin: checkoutBook.booking_checkin,
                    checkoutCheckout: checkoutBook.booking_checkout,
                    checkoutPrice: checkoutBook.room_price,
                    checkoutAddons: COBookAddons
                })
            }
      }
  }

  componentDidUpdate(prevProps, prevState) {
      const { checkinPrice, checkoutPrice } = this.state;
      if(prevState.checkinPrice !== checkinPrice) {
        this.calculateTotal('checkin')
      }
      if(prevState.checkoutPrice !== checkoutPrice) {
        this.calculateTotal('checkout')
      }
  }

//   printBooking = (id) => {
//       const { onPrint } = this.props;
    //   let getBook = {};
    //   let getRoom = {};
    //   bookings.forEach(b => {
    //       if(b.id_book === id) {
    //         getBook = b;
    //       }
    //   })
    //   rooms.forEach(r => {
    //       if(r.id_room = getBook.booking_room) {
    //           getRoom = r;
    //       }
    //   })
    //   document.getElementById("invoice-id").innerHTML = `Invoice: ${getBook.id_book}`;
    //   document.getElementById("invoice-name").innerHTML = `Name: ${getBook.booking_name}`;
    //   document.getElementById("invoice-date").innerHTML = `${getBook.booking_checkin}-${getBook.booking_checkout}`;
    //   document.getElementById("invoice-item").innerHTML = `Kamar Tipe ${getRoom.room_type}`;
    //   document.getElementById("invoice-itemCount").innerHTML = `1 Kamar`;
    //   document.getElementById("invoice-itemPrice").innerHTML = `${getBook.room_price}`;
    //   document.getElementById("invoice-itemTotal").innerHTML = `${getBook.room_price}`;
    //   window.print();
//   }

  deleteBooking = (id) => {
    const { closeBookingPopup } = this.props;

    ipcRenderer.send('delete-booking', id);
    closeBookingPopup();
  }

  insertBooking = () => {
    const { detail } = this.props;
    const { checkinNik, checkinName, checkinAdd, checkinPhone, checkinCheckin, checkinAddons, checkinCheckout, checkinPrice, checkinTotal } = this.state;
    let arg = {};
    let addons = '';
        if(checkinAddons && checkinAddons[0] && checkinAddons[0] !== '' && checkinAddons[0] !== '::') {
            checkinAddons.forEach(ci => {
                if(ci !== '' && ci !== '::') {
                    if(addons === '') {
                        addons = addons + ci
                    } else {
                        addons = addons + ',' + ci
                    }
                }
            })
        }
        arg.booking_room = detail.room.id_room;
        arg.room_price = parseInt(checkinPrice, 10);
        arg.booking_nik = checkinNik;
        arg.booking_name = checkinName;
        arg.booking_address = checkinAdd;
        arg.booking_phone = checkinPhone;
        arg.booking_checkin = checkinCheckin;
        arg.booking_checkout = checkinCheckout;
        arg.booking_addons = addons;
        arg.booking_total = checkinTotal;
        ipcRenderer.send('insert-booking', arg);
  }

  editBooking = (type) => {
    const { checkinNik, checkinName, checkinAdd, checkinPhone, checkinCheckin, checkinAddons, checkinCheckout, checkinPrice, checkinTotal, checkinId,
            checkoutNik, checkoutName, checkoutAdd, checkoutPhone, checkoutCheckin, checkoutAddons, checkoutCheckout, checkoutPrice, checkoutTotal, checkoutId } = this.state;
    let arg = {};
    if(type === 'checkin') {
        let addons = '';
        if(checkinAddons && checkinAddons[0] && checkinAddons[0] !== '' && checkinAddons[0] !== '::') {
            checkinAddons.forEach(ci => {
                if(ci !== '' && ci !== '::') {
                    if(addons === '') {
                        addons = addons + ci
                    } else {
                        addons = addons + ',' + ci
                    }
                }
            })
        }
        arg.id_book = checkinId;
        arg.room_price = parseInt(checkinPrice, 10);
        arg.booking_nik = checkinNik;
        arg.booking_name = checkinName;
        arg.booking_address = checkinAdd;
        arg.booking_phone = checkinPhone;
        arg.booking_checkin = checkinCheckin;
        arg.booking_checkout = checkinCheckout;
        arg.booking_addons = addons;
        arg.booking_total = checkinTotal;
        ipcRenderer.send('edit-booking', arg);
    } else if(type === 'checkout') {
        let addons = '';
        if(checkoutAddons && checkoutAddons[0] && checkoutAddons[0] !== '' && checkoutAddons[0] !== '::') {
            checkoutAddons.forEach(co => {
                if(co !== '' && co !== '::') {
                    if(addons === '') {
                        addons = addons + co
                    } else {
                        addons = addons + ',' + co
                    }
                }
            })
        }
        arg.id_book = checkoutId;
        arg.room_price = parseInt(checkoutPrice, 10);
        arg.booking_nik = checkoutNik;
        arg.booking_name = checkoutName;
        arg.booking_address = checkoutAdd;
        arg.booking_phone = checkoutPhone;
        arg.booking_checkin = checkoutCheckin;
        arg.booking_checkout = checkoutCheckout;
        arg.booking_addons = addons;
        arg.booking_total = checkoutTotal;
        ipcRenderer.send('edit-booking', arg);
    }
  }

  calculateTotal = (type) => {
    const { checkinPrice, checkinAddons, checkoutPrice, checkoutAddons } = this.state;
    if(type==='checkin') {
        let CIAddonsTotal = 0;
        let CIPrice = 0;
        if(checkinAddons[0]) {
            checkinAddons.forEach(i => {
                let split = i.split(':')
                if(split[1] !== '' && split[2] !== '') {
                    CIAddonsTotal = CIAddonsTotal + (parseInt(split[1]) * parseInt(split[2]))
                }
            })
        }
        if(checkinPrice !== '') {
            CIPrice = parseInt(checkinPrice)
        } else {
            CIPrice = 0;
        }
        this.setState({
            checkinGrand: CIAddonsTotal + CIPrice + ((CIAddonsTotal + CIPrice)*0.1),
            checkinPpn: (CIAddonsTotal + CIPrice)*0.1,
            checkinTotal: CIAddonsTotal + CIPrice
        })
    } else if(type==='checkout') {
        let COAddonsTotal = 0;
        let COPrice = 0;
        if(checkoutAddons[0]) {
            checkoutAddons.forEach(o => {
                let split = o.split(':')
                if(split[1] !== '' && split[2] !== '') {
                    COAddonsTotal = COAddonsTotal + (parseInt(split[1]) * parseInt(split[2]))
                }
            })
        }
        if(checkoutPrice !== '') {
            COPrice = parseInt(checkoutPrice)
        } else {
            COPrice = 0;
        }
        this.setState({
            checkoutGrand: COAddonsTotal + COPrice + ((COAddonsTotal + COPrice)*0.1),
            checkoutPpn: (COAddonsTotal + COPrice)*0.1,
            checkoutTotal: COAddonsTotal + COPrice
        })
    }

  }

  changeCOAddons = (e) => {
    const { checkoutAddons } = this.state;
    let id = e.target.id.charAt(e.target.id.length-1);
    let which = e.target.id.substr(7, (e.target.id.length-8));
    let newCheckoutAddons = [];
    for(let i = 0; i < checkoutAddons.length; i++) {
        let newAddons
        let whichIndex
        if(i === parseInt(id, 10)) {
            if(which === 'Name') { whichIndex = 0 }
            else if(which === 'Count') { whichIndex = 1 }
            else if(which === 'Price') { whichIndex = 2 }
            let split = checkoutAddons[i].split(':');
            split[whichIndex] = e.target.value;
            newCheckoutAddons.push(`${split[0]}:${split[1]}:${split[2]}`)
        } else {
            newCheckoutAddons.push(checkoutAddons[i])
        }
    }
    this.setState({
        checkoutAddons: newCheckoutAddons
    })
    if(which !== 'Name') {
        this.calculateTotal('checkout')
    }
  }

  changeAddons = (e) => {
    const { checkinAddons } = this.state;
    let id = e.target.id.charAt(e.target.id.length-1);
    let which = e.target.id.substr(5, (e.target.id.length-6));
    let newCheckinAddons = [];
    for(let i = 0; i < checkinAddons.length; i++) {
        let newAddons
        let whichIndex
        if(i === parseInt(id, 10)) {
            if(which === 'Name') { whichIndex = 0 }
            else if(which === 'Count') { whichIndex = 1 }
            else if(which === 'Price') { whichIndex = 2 }
            let split = checkinAddons[i].split(':');
            split[whichIndex] = e.target.value;
            newCheckinAddons.push(`${split[0]}:${split[1]}:${split[2]}`)
        } else {
            newCheckinAddons.push(checkinAddons[i])
        }
    }
    this.setState({
        checkinAddons: newCheckinAddons
    })
    if(which !== 'Name') {
        this.calculateTotal('checkin')
    }
  }

  addAddonCheckin = () => {
    const { checkinAddons } = this.state;
    let newCheckinAddons = checkinAddons;
    newCheckinAddons[newCheckinAddons.length] = "::"
    const table = document.getElementById("checkin-addons")
    const countRow = document.getElementById("checkin-addons").getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
    let row = table.insertRow(countRow);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    cell1.innerHTML = `<input type="text" className="content-checkin-add-ons-name" id="addonName${countRow-1}" placeholder="extrabed" />`;
    cell2.innerHTML = `<input type="number" className="content-checkin-add-ons-count" id="addonCount${countRow-1}" placeholder="1" />`;
    cell3.innerHTML = `<input type="number" className="content-checkin-add-ons-price" id="addonPrice${countRow-1}" placeholder="50000" />`;
    this.setState({
        checkinAddons: newCheckinAddons
    })
    document.getElementById(`addonName${countRow-1}`).addEventListener("change", (e) => this.changeAddons(e))
    document.getElementById(`addonCount${countRow-1}`).addEventListener("change", (e) => this.changeAddons(e))
    document.getElementById(`addonPrice${countRow-1}`).addEventListener("change", (e) => this.changeAddons(e))
  }

  addAddonCheckout = () => {
    const { checkoutAddons } = this.state;
    let newCheckoutAddons = checkoutAddons;
    newCheckoutAddons[newCheckoutAddons.length] = "::"
    const table = document.getElementById("checkout-addons")
    const countRow = document.getElementById("checkout-addons").getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
    let row = table.insertRow(countRow);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    cell1.innerHTML = `<input type="text" className="content-checkout-add-ons-name" id="coAddonName${countRow-1}" placeholder="extrabed" />`;
    cell2.innerHTML = `<input type="number" className="content-checkout-add-ons-count" id="coAddonCount${countRow-1}" placeholder="1" />`;
    cell3.innerHTML = `<input type="number" className="content-checkout-add-ons-price" id="coAddonPrice${countRow-1}" placeholder="50000" />`;
    this.setState({
        checkoutAddons: newCheckoutAddons
    })
    document.getElementById(`coAddonName${countRow-1}`).addEventListener("change", (e) => this.changeCOAddons(e))
    document.getElementById(`coAddonCount${countRow-1}`).addEventListener("change", (e) => this.changeCOAddons(e))
    document.getElementById(`coAddonPrice${countRow-1}`).addEventListener("change", (e) => this.changeCOAddons(e))
  }

  renderCheckin = () => {
    const { checkinNik, checkinName, checkinAdd, checkinPhone, checkinCheckin,
            checkinCheckout, checkinPrice, checkinTotal, checkinId, checkinGrand, checkinPpn } = this.state;
    const { detail } = this.props;
      return (
        <div className="booking-popup-content-checkin">
            <div className="booking-popup-content-checkin-title">Check In/Booking</div>
            <table className="booking-popup-content-checkin-detail">
                <tbody>
                    <tr><td>NIK</td><td>:</td><td>
                        <input type="number" name="content-nik" value={checkinNik} 
                            onChange={(e) => this.setState({checkinNik: e.target.value})} />
                    </td></tr>
                    <tr><td>Nama</td><td>:</td><td>
                        <input type="text" name="content-name" value={checkinName} 
                            onChange={(e) => this.setState({checkinName: e.target.value})} />
                    </td></tr>
                    <tr><td>Alamat</td><td>:</td><td>
                        <textarea name="content-address" rows="5" cols="29" style={{marginLeft: '10px'}} value={checkinAdd} 
                            onChange={(e) => this.setState({checkinAdd: e.target.value})} />
                    </td></tr>
                    <tr><td>No. Hp</td><td>:</td><td>
                        <input type="number" name="content-phone" value={checkinPhone} 
                            onChange={(e) => this.setState({checkinPhone: e.target.value})} />
                    </td></tr>
                    <tr><td>Check In</td><td>:</td><td>
                        <input type="text" name="content-checkin" placeholder={`Contoh: ${detail.pickedDate}`} value={checkinCheckin} 
                            onChange={(e) => this.setState({checkinCheckin: e.target.value})} />
                    </td></tr>
                    <tr><td>Check Out</td><td>:</td><td>
                        <input type="text" name="content-checkout" placeholder={`Contoh: ${detail.pickedDate}`} value={checkinCheckout} 
                            onChange={(e) => this.setState({checkinCheckout: e.target.value})} />
                    </td></tr>
                    <tr><td>Harga Kamar</td><td>:</td><td>
                        <input type="number" name="content-room-price" value={checkinPrice} 
                            onChange={(e) => this.setState({checkinPrice: e.target.value})} />
                    </td></tr>
                    
                </tbody>
            </table>
            <table className="booking-popup-content-checkin-addons" id="checkin-addons">
                <tbody>
                    <tr><td className="tambahan">Tambahan</td></tr>
                </tbody>
            </table>
            <table className="booking-popup-content-checkin-total">
                <tbody>
                    <tr><td>Total Booking</td><td>:</td><td>Rp. {String(checkinTotal)}</td></tr>
                    <tr><td>Ppn 10%</td><td>:</td><td>Rp.  <span style={{paddingLeft: '10px'}}>{String(checkinPpn)}</span></td></tr>
                    <tr><td>Grand Total</td><td>:</td><td>Rp. {String(checkinGrand)}
                    </td></tr>
                </tbody>
            </table>
            <div className="booking-popup-content-checkin-button-c">
                <div className="booking-popup-content-checkin-button-add" onClick={this.addAddonCheckin}>
                    Tambah
                </div>
                <div className="booking-popup-content-checkin-button-save" onClick={() => {if(checkinId===0){this.insertBooking()} else{this.editBooking('checkin')}}}>
                    Simpan
                </div>
                <div className="booking-popup-content-checkin-button-print" onClick={() => this.printBooking(checkinId)}>
                    Cetak
                </div>
                <div className="booking-popup-content-checkin-button-delete" onClick={() => this.deleteBooking(checkinId)}>
                    Hapus
                </div>
            </div>
        </div>
      );
  }

  renderCheckout = () => {
    const { checkoutNik, checkoutName, checkoutAdd, checkoutPhone, checkoutCheckin, checkoutId,
            checkoutCheckout, checkoutPrice, checkoutTotal, checkoutGrand, checkoutPpn } = this.state;
    const { detail, onPrint } = this.props;
      return (
        <div className="booking-popup-content-checkout">
            <div className="booking-popup-content-checkout-title">Check Out</div>
            <table className="booking-popup-content-checkout-detail">
                <tbody>
                    <tr><td>NIK</td><td>:</td><td>
                        <input type="number" name="content-nik" value={checkoutNik} 
                            onChange={(e) => this.setState({checkoutNik: e.target.value})} />
                    </td></tr>
                    <tr><td>Nama</td><td>:</td><td>
                        <input type="text" name="content-name" value={checkoutName} 
                            onChange={(e) => this.setState({checkoutName: e.target.value})} />
                    </td></tr>
                    <tr><td>Alamat</td><td>:</td><td>
                        <textarea name="content-address" rows="5" cols="29" style={{marginLeft: '10px'}} value={checkoutAdd} 
                            onChange={(e) => this.setState({checkoutAdd: e.target.value})} />
                    </td></tr>
                    <tr><td>No. Hp</td><td>:</td><td>
                        <input type="number" name="content-phone" value={checkoutPhone} 
                            onChange={(e) => this.setState({checkoutPhone: e.target.value})} />
                    </td></tr>
                    <tr><td>Check In</td><td>:</td><td>
                        <input type="text" name="content-checkin" placeholder={`Contoh: ${detail.pickedDate}`} value={checkoutCheckin} 
                            onChange={(e) => this.setState({checkoutCheckin: e.target.value})} />
                    </td></tr>
                    <tr><td>Check Out</td><td>:</td><td>
                        <input type="text" name="content-checkout" placeholder={`Contoh: ${detail.pickedDate}`} value={checkoutCheckout} 
                            onChange={(e) => this.setState({checkoutCheckout: e.target.value})} />
                    </td></tr>
                    <tr><td>Harga Kamar</td><td>:</td><td>
                        <input type="number" name="content-room-price" value={checkoutPrice} 
                            onChange={(e) => this.setState({checkoutPrice: e.target.value})} />
                    </td></tr>
                    
                </tbody>
            </table>
            <table className="booking-popup-content-checkout-addons" id="checkout-addons">
                <tbody>
                    <tr><td className="tambahan">Tambahan</td></tr>
                </tbody>
            </table>
            <table className="booking-popup-content-checkout-total">
                <tbody>
                    <tr><td>Total Booking</td><td>:</td><td>Rp. {String(checkoutTotal)}</td></tr>
                    <tr><td>Ppn 10%</td><td>:</td><td>Rp.  <span style={{paddingLeft: '10px'}}>{String(checkoutPpn)}</span></td></tr>
                    <tr><td>Grand Total</td><td>:</td><td>Rp. {String(checkoutGrand)}
                    </td></tr>
                </tbody>
            </table>
            <div className="booking-popup-content-checkout-button-c">
                <div className="booking-popup-content-checkout-button-add" onClick={this.addAddonCheckout}>
                    Tambah
                </div>
                <div className="booking-popup-content-checkout-button-save" onClick={() => this.editBooking('checkout')}>
                    Simpan
                </div>
                <div className="booking-popup-content-checkout-button-print" onClick={() => onPrint(checkoutId)}>
                    Cetak
                </div>
                <div className="booking-popup-content-checkout-button-delete" onClick={() => this.deleteBooking(checkoutId)}>
                    Hapus
                </div>
            </div>
        </div>
      );
  }

  render() {
    const { detail, closeBookingPopup } = this.props;
    console.log(this.state, this.props)

    return (
        <div className="booking-popup-overlay">
            <div className="booking-popup-container" data-tid="container">
                <div className="booking-popup-header">
                    {detail.room.room_type} - {detail.room.room_name}
                </div>
                <div className="booking-popup-date">
                    Tanggal: {detail.pickedDate}
                </div>
                <div className="booking-popup-content">
                    {this.renderCheckin()}
                    {detail.status === 2 ? this.renderCheckout() : null}
                </div>
            </div>
            <div className="booking-popup-close" onClick={() => closeBookingPopup()}>
                X
            </div>
        </div>
    );
  }
}
