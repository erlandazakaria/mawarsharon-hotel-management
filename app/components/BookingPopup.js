// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import './bookingPopup.css';

type Props = {
  detail: Object,
  closeBookingPopup: () => void
};

export default class BookingPopup extends Component<Props> {
  props: Props;

  addAddonCheckin = () => {
    const table = document.getElementById("checkin-addons")
    const countRow = document.getElementById("checkin-addons").getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
    let row = table.insertRow(countRow);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    cell1.innerHTML = '<input type="text" className="content-checkin-add-ons-name" placeholder="extrabed" />';
    cell2.innerHTML = '<input type="text" className="content-checkin-add-ons-count" placeholder="1" />';
    cell3.innerHTML = '<input type="text" className="content-checkin-add-ons-price" placeholder="50000" />'; 
  }

  addAddonCheckout = () => {
    const table = document.getElementById("checkout-addons")
    const countRow = document.getElementById("checkout-addons").getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
    let row = table.insertRow(countRow);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    cell1.innerHTML = '<input type="text" className="content-checkout-add-ons-name" placeholder="extrabed" />';
    cell2.innerHTML = '<input type="text" className="content-checkout-add-ons-count" placeholder="1" />';
    cell3.innerHTML = '<input type="text" className="content-checkout-add-ons-price" placeholder="50000" />'; 
  }

  renderCheckin = () => {
    const { detail } = this.props;
      return (
        <div className="booking-popup-content-checkin">
            <div className="booking-popup-content-checkin-title">Check In/Booking</div>
            <table className="booking-popup-content-checkin-detail">
                <tbody>
                    <tr><td>NIK</td><td>:</td><td>
                        <input type="number" name="content-nik"/>
                    </td></tr>
                    <tr><td>Nama</td><td>:</td><td>
                        <input type="text" name="content-name"/>
                    </td></tr>
                    <tr><td>Alamat</td><td>:</td><td>
                        <textarea name="content-address" rows="5" cols="29" style={{marginLeft: '10px'}} />
                    </td></tr>
                    <tr><td>No. Hp</td><td>:</td><td>
                        <input type="number" name="content-phone"/>
                    </td></tr>
                    <tr><td>Check In</td><td>:</td><td>
                        <input type="text" name="content-checkin" placeholder={`Contoh: ${detail.pickedDate}`}/>
                    </td></tr>
                    <tr><td>Check Out</td><td>:</td><td>
                        <input type="text" name="content-checkout" placeholder={`Contoh: ${detail.pickedDate}`}/>
                    </td></tr>
                    <tr><td>Harga Kamar</td><td>:</td><td>
                        <input type="number" name="content-room-price"/>
                    </td></tr>
                    
                </tbody>
            </table>
            <table className="booking-popup-content-checkin-addons" id="checkin-addons">
                <tbody>
                    <tr><td className="tambahan">Tambahan</td></tr>
                    <tr>
                        <td><input type="text" className="content-checkin-add-ons-name" placeholder="extrabed" /></td>
                        <td><input type="text" className="content-checkin-add-ons-count" placeholder="1" /></td>
                        <td><input type="text" className="content-checkin-add-ons-price" placeholder="50000" /></td>
                    </tr>
                </tbody>
            </table>
            <table className="booking-popup-content-checkin-total">
                <tbody>
                    <tr><td>Total Booking</td><td>:</td><td>Rp. 0
                    </td></tr>
                </tbody>
            </table>
            <div className="booking-popup-content-checkin-button-c">
                <div className="booking-popup-content-checkin-button-add" onClick={this.addAddonCheckin}>
                    Tambah
                </div>
                <div className="booking-popup-content-checkin-button-save">
                    Simpan
                </div>
                <div className="booking-popup-content-checkin-button-print">
                    Cetak
                </div>
            </div>
        </div>
      );
  }

  renderCheckout = () => {
    const { detail } = this.props;
      return (
        <div className="booking-popup-content-checkout">
            <div className="booking-popup-content-checkout-title">Check Out</div>
            <table className="booking-popup-content-checkout-detail">
                <tbody>
                    <tr><td>NIK</td><td>:</td><td>
                        <input type="number" name="content-nik"/>
                    </td></tr>
                    <tr><td>Nama</td><td>:</td><td>
                        <input type="text" name="content-name"/>
                    </td></tr>
                    <tr><td>Alamat</td><td>:</td><td>
                        <textarea name="content-address" rows="5" cols="29" style={{marginLeft: '10px'}} />
                    </td></tr>
                    <tr><td>No. Hp</td><td>:</td><td>
                        <input type="number" name="content-phone"/>
                    </td></tr>
                    <tr><td>Check In</td><td>:</td><td>
                        <input type="text" name="content-checkin" placeholder={`Contoh: ${detail.pickedDate}`}/>
                    </td></tr>
                    <tr><td>Check Out</td><td>:</td><td>
                        <input type="text" name="content-checkout" placeholder={`Contoh: ${detail.pickedDate}`}/>
                    </td></tr>
                    <tr><td>Harga Kamar</td><td>:</td><td>
                        <input type="number" name="content-room-price"/>
                    </td></tr>
                    
                </tbody>
            </table>
            <table className="booking-popup-content-checkout-addons" id="checkout-addons">
                <tbody>
                    <tr><td className="tambahan">Tambahan</td></tr>
                    <tr>
                        <td><input type="text" className="content-checkout-add-ons-name" placeholder="extrabed" /></td>
                        <td><input type="text" className="content-checkout-add-ons-count" placeholder="1" /></td>
                        <td><input type="text" className="content-checkout-add-ons-price" placeholder="50000" /></td>
                    </tr>
                </tbody>
            </table>
            <table className="booking-popup-content-checkout-total">
                <tbody>
                    <tr><td>Total Booking</td><td>:</td><td>Rp. 0
                    </td></tr>
                </tbody>
            </table>
            <div className="booking-popup-content-checkout-button-c">
                <div className="booking-popup-content-checkout-button-add" onClick={this.addAddonCheckout}>
                    Tambah
                </div>
                <div className="booking-popup-content-checkout-button-save">
                    Simpan
                </div>
                <div className="booking-popup-content-checkout-button-print">
                    Cetak
                </div>
            </div>
        </div>
      );
  }

  render() {
    const { detail, closeBookingPopup } = this.props;
    console.log(detail)

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
