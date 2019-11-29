import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import * as moment from 'moment';
import './printArea.css';

type Props = {
    print: Object,
    bookings: Array,
    rooms: Array
};

export default class PrintArea extends Component<Props> {
    props: Props;

    renderAddons = (invoice) => {
        let addonsArr = invoice.booking_addons.split(',');
        return addonsArr.map(a => {
            let split = a.split(':');
            return(
                <tr>
                    <td id="invoice-date">{`${invoice.booking_checkin}-${invoice.booking_checkout}`}</td>
                    <td id="invoice-item">{`${split[0]}`}</td>
                    <td id="invoice-itemCount" style={{textAlign: 'center'}}>{`${split[1]}`}</td>
                    <td id="invoice-itemPrice"><span id="invoice-rp">Rp.</span>{`${split[2]}`}</td>
                    <td id="invoice-itemTotal"><span id="invoice-rp">Rp.</span>{`${parseInt(split[1], 10)*parseInt(split[2], 10)}`}</td>
                </tr>
            );
        })
    }

    render() {
      const { print, bookings, rooms } = this.props;

      let invoice = {};
      if(print && print.id_book !== 0) {
        bookings.forEach(b => {
            if(b.id_book === print.id_book) {
                invoice = b;
            }
        })
        rooms.forEach(r => {
            if(r.id_room = invoice.id_book) {
                invoice.room = r;
            }
        })
      }
        return(
            <div className="print-area">
                <header>
                    <h1>HOTEL MAWAR SHARON</h1>
                    <h2>JLN.DIPONEGORO NO 151</h2>
                    <h3>Telpn : (0341) 591951, 087757230567</h3>
                    <hr />
                </header>
                <aside>
                    <div style={{width: '100%'}}>
                    <div className="invoice-wrapper" id="invoice-id">{`Invoice: ${invoice.id_book}`}</div> 
                    <div className="name-wrapper" id="invoice-name">{`Name: ${invoice.booking_name}`}</div>
                    </div>
                </aside>
                <main>
                    <table className="print-area-table">
                        <thead>
                            <tr>
                                <th>Tanggal in - Tanggal out</th>
                                <th>Nama</th>
                                {/* <th>Lama</th> */}
                                <th>Jumlah</th>
                                <th>Harga</th>
                                <th>Total Harga</th>
                            </tr>
                            <tr>
                                <td id="invoice-date">{`${invoice.booking_checkin}-${invoice.booking_checkout}`}</td>
                                <td id="invoice-item">{`Kamar Tipe ${invoice.room.room_type}`}</td>
                                {/* <td id="lama-sewa">1 Hari</td> */}
                                <td id="invoice-itemCount">{`1 Kamar`}</td>
                                <td id="invoice-itemPrice"><span id="invoice-rp">Rp.</span>{`${invoice.room_price}`}</td>
                                <td id="invoice-itemTotal"><span id="invoice-rp">Rp.</span>{`${invoice.room_price}`}</td>
                            </tr>
                            {invoice.booking_addons !== '' ? this.renderAddons(invoice) : null}
                            <tr>
                                <td colSpan="4">Sub Total</td>
                                <td id="invoice-sub"><span id="invoice-rp">Rp.</span>{`${invoice.booking_total}`}</td>
                            </tr>
                            <tr>
                                <td colSpan="4">PPn 10%</td>
                                <td id="invoice-ppn"><span id="invoice-rp">Rp.</span>{`${invoice.booking_total*0.1}`}</td>
                            </tr>
                            <tr>
                                <td colSpan="4" style={{backgroundColor: 'black', color: 'white'}}>Total</td>
                                <td style={{backgroundColor: 'black', color: 'white'}} id="invoice-total"><span id="invoice-rp">Rp.</span>{`${invoice.booking_total + (invoice.booking_total*0.1)}`}</td>
                            </tr>
                        </thead>
                    </table>
                </main>

                <footer>
                    <div>
                    <div className="tanggal-terima" id="invoice-placedate">{`Batu, ${moment().format("DD MMMM YYYY")}`}</div>
                        {/* <div className="total-akhir" id="grand-total">Total : Rp. 220.000</div> */}
                    </div> 
                    <br />
                    <div>
                        <div className="petugas">Petugas</div> 
                        {/* <div className="dp-total" id="DP">DP:</div> */}
                    </div>
                    <br />
                    {/* <div>
                    <br />
                        <hr className="hr2" />
                    </div>
                    <br />
                    <div>
                        <div className="total-bayar" id="jumlah-bayar">Jumlah Bayar : Rp. 220.000</div>
                    </div> */}
                </footer>
            </div>
        );
    }
}