// @flow
import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import { countDay, generateMonth, generateYear, generateDateFormat, checkBookDate } from './Date';

import styles from './Home.css';

import LoginPage from './LoginPage';
import BookingPopup from './BookingPopup';
import PrintArea from './PrintArea';
import Manage from './Manage';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;
  state = {
    isLoggedIn: false,
    loggedUser: {},
    users: [],
    rooms: [],
    bookings: [],
    pickedDate: {
      day: null,
      month: null,
      year: null
    },
    bookingPopup: {
      open: false,
      id_room: 0,
      pickedDate: null
    },
    managePopup: {
      open: false,
      which: ''
    },
    alert: {
      open: false,
      content: ''
    },
    print: {
      open: false,
      id_book: 0,
    },
  }

  componentDidMount() {
    ipcRenderer.on('select-all-reply', (event, arg) => {
      this.setState({
        [arg.table]: arg.rows,
      })
    })
    ipcRenderer.on('edit-booking-reply', (event, editArg) => {
      if(editArg.affectedRows > 0) {
        ipcRenderer.send('select-all-message', 'bookings');
        this.setState({
          alert: {open: true, content: 'BOOKING TERUPDATE'}
        })
      }
    })
    ipcRenderer.on('insert-booking-reply', (event, insertArg) => {
      if(insertArg.affectedRows > 0) {
        ipcRenderer.send('select-all-message', 'bookings');
        this.setState({
          alert: {open: true, content: 'TAMBAH BOOKING BERHASIL'}
        })
      }
    })
    ipcRenderer.on('delete-booking-reply', (event, deleteArg) => {
      if(deleteArg.affectedRows > 0) {
        ipcRenderer.send('select-all-message', 'bookings');
        this.setState({
          alert: {open: true, content: 'BOOKING BERHASIL DIHAPUS'}
        })
      }
    })
    ipcRenderer.send('select-all-message', 'users');
    ipcRenderer.send('select-all-message', 'rooms');
    ipcRenderer.send('select-all-message', 'bookings');
    const todayDate = new Date();
    this.setState({
      pickedDate: {
        day: todayDate.getDate(),
        month: todayDate.getMonth() + 1,
        year: todayDate.getFullYear()
      }
    })
  }
  
  loggingIn = (user) => {
    this.setState({
      loggedUser: user,
      isLoggedIn: true
    })
  }

  loggingOut = () => {
    this.setState({
      loggedUser: {},
      isLoggedIn: false,
      bookingPopup: {
        open: false,
        id_room: 0,
        pickedDate: null
      },
      managePopup: {
        open: false,
        which: ''
      },
      alert: {
        open: false,
        content: ''
      }
    })
  }

  onPrint = (id) => {
    this.setState({
      print: {
        open: true,
        id_book: id
      }
    }, () => {
      window.print();
    })
  }

  checkRoomAvail = (id) => {
    const { bookings, pickedDate} = this.state;
    const date = generateDateFormat(pickedDate.day, pickedDate.month, pickedDate.year)
    let isCheckOutDay = false;
    const findBooking = bookings.filter(b => {
      if(b.booking_room === id) { 
        let roomStatus = checkBookDate(date, b.booking_checkin, b.booking_checkout)
        if(!roomStatus.avail) {
          if(roomStatus.lastDay) {
            isCheckOutDay = true
          }
          let newBooking = b
          newBooking.avail = roomStatus.avail;
          newBooking.lastDay = roomStatus.lastDay;
          return newBooking
        } 
      }
    });
    if(findBooking && findBooking[0]) {
      if(isCheckOutDay) {
        return {backgroundColor: 'orange', status: 2, book: findBooking}
      } else {
        return {backgroundColor: 'red', status: 0, book: findBooking}
      }
    } else {
      return {backgroundColor: 'green', status: 1, book: []}
    }
  }

  showBookingPopup = (room, boxStatus) => {
    const {pickedDate} = this.state;
    const date = generateDateFormat(pickedDate.day, pickedDate.month, pickedDate.year)

    this.setState({
      bookingPopup: {
        open: true,
        pickedDate: date,
        status: boxStatus.status,
        book: boxStatus.book,
        room: room
      }
    })
  }

  closeBookingPopup = ()=> {
    this.setState({
      bookingPopup: {
        open: false, 
        id_room: 0,
        pickedDate: null
      }
    })
  }

  closeManagePopup = () => {
    this.setState({
      managePopup: {
        open: false,
        which: ''
      }      
    })
  }

  renderHeader = () => {
    return(
      <div className='dashboard-header cursor-pointer'>
          <h1>Hotel Mawarsharon</h1>
      </div>
    );
  }

  renderLeftMenu = () => {
    return(
      <div className='left-menu'>
        <div className="left-menu-button cursor-pointer" onClick={() => this.setState({managePopup: {open: true, which: 'report'}})}>
            Report
        </div>
        <div className="left-menu-button cursor-pointer" onClick={() => this.setState({managePopup: {open: true, which: 'rooms'}})}>
            Manage Rooms
        </div>
        <div className="left-menu-button cursor-pointer" onClick={() => this.setState({managePopup: {open: true, which: 'users'}})}>
            Manage Users
        </div>
        <div className="left-menu-button cursor-pointer" onClick={this.loggingOut}>
            Logout
        </div>
      </div>
    );
  }

  renderContent = () => {
    const { rooms, pickedDate } = this.state;
    return(
      <div className="dashboard-content">
        <div className="standard-title cursor-pointer">Standard</div>
        <div className="deluxe-title cursor-pointer">Deluxe</div>
        <div className="twin-title cursor-pointer">Twin</div>
        <div className="triple-title cursor-pointer">Triple</div>
        {rooms.map(r => {
          if(r.room_type === "Standard Room") {
            const boxStatus = this.checkRoomAvail(r.id_room);
            const boxColor = {backgroundColor: boxStatus.backgroundColor};
            return ( 
              <div className="standard-box cursor-pointer" key={r.id_room} style={boxColor}
                onClick={() => this.showBookingPopup(r, boxStatus)}>{r.room_name}</div> 
            );
          } else if(r.room_type === "Deluxe Room") {
            const boxStatus = this.checkRoomAvail(r.id_room);
            const boxColor = {backgroundColor: boxStatus.backgroundColor};
            return ( 
              <div className="deluxe-box cursor-pointer" key={r.id_room} style={boxColor}
                onClick={() => this.showBookingPopup(r, boxStatus)}>{r.room_name}</div> 
            );
          } else if(r.room_type === "Twin's Room") {
            const boxStatus = this.checkRoomAvail(r.id_room);
            const boxColor = {backgroundColor: boxStatus.backgroundColor};
            return ( 
              <div className="twin-box cursor-pointer" key={r.id_room} style={boxColor}
                onClick={() => this.showBookingPopup(r, boxStatus)}>{r.room_name}</div> 
            );
          } else if(r.room_type === "Triple Bed") {
            const boxStatus = this.checkRoomAvail(r.id_room);
            const boxColor = {backgroundColor: boxStatus.backgroundColor};
            return ( 
              <div className="triple-box cursor-pointer" key={r.id_room} style={boxColor}
                onClick={() => this.showBookingPopup(r, boxStatus)}>{r.room_name}</div> 
            );
          }
        })}
        <div className="booking-date-container">
          <div className="booking-date-title">Tanggal</div>
          <div className="booking-date-wrapper">
            <div className="booking-date">
              <select name="booking-date-day" id="booking-date-day"
                onChange={(e) => this.setState({pickedDate: {...pickedDate, day: parseInt(e.target.value)}})}>
                  {countDay(pickedDate.month, pickedDate.year).map(d => {
                    if(pickedDate.day === d) {
                      return (
                        <option value={d} key={d} selected>{d}</option>
                      );
                    } else {
                      return (
                        <option value={d} key={d}>{d}</option>
                      );
                    }
                  })}
              </select>
            </div>
            <div className="booking-date">
              <select name="booking-date-month" id="booking-date-month"
                onChange={(e) => this.setState({pickedDate: {...pickedDate, month: parseInt(e.target.value)}})}>
                  {generateMonth().map(m => {
                    if(pickedDate.month === m.month_id) {
                      return (
                        <option value={m.month_id} key={m.month_id} selected>{m.month_name}</option>
                      );
                    } else {
                      return (
                        <option value={m.month_id} key={m.month_id}>{m.month_name}</option>
                      );
                    }
                  })}
              </select>
            </div>
            <div className="booking-date">
              <select name="booking-date-year" id="booking-date-year"
                onChange={(e) => this.setState({pickedDate: {...pickedDate, year: parseInt(e.target.value)}})}>
                  {generateYear().map(y => {
                    if(pickedDate.year === y) {
                      return (
                        <option value={y} key={y} selected>{y}</option>
                      );
                    } else {
                      return (
                        <option value={y} key={y}>{y}</option>
                      );
                    }
                  })}
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderDashboard = () => {
    return(
      <React.Fragment>
        {this.renderHeader()}
        {this.renderLeftMenu()}
        {this.renderContent()}
      </React.Fragment>
    );
  }

  render() {
    const { isLoggedIn, users, bookingPopup, alert, bookings, rooms, managePopup, print} = this.state;
    console.log(this.state)
    return (
      <React.Fragment>
      {!isLoggedIn ? 
        this.renderDashboard()
      : <LoginPage users={users} loggingIn={(user) => this.loggingIn(user)} />}
      {bookingPopup.open ? <BookingPopup detail={bookingPopup} closeBookingPopup={this.closeBookingPopup} onPrint={(id) => this.onPrint(id)} /> : null}
      {alert.open ? <div className="alert-box">{alert.content}
        <div className="alert-box-close" onClick={() => this.setState({alert: {open: false, content: ''}})}>X</div>
      </div> : null}
      {print.open ? <PrintArea bookings={bookings} rooms={rooms} print={print} /> : null}
      {managePopup.open && <Manage users={users} bookings={bookings} rooms={rooms} managePopup={managePopup} closeManagePopup={this.closeManagePopup}/>}
      </React.Fragment>
    );
  }
}
