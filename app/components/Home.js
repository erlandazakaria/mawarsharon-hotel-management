// @flow
import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import { countDay, generateMonth, generateYear } from './Date';

import styles from './Home.css';

import LoginPage from './LoginPage';

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
    }
  }

  componentDidMount() {
    ipcRenderer.on('select-all-reply', (event, arg) => {
      this.setState({
        [arg.table]: arg.rows,
      })
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

  pickDay = (day) => {
    console.log('asd')
    this.setState({
      pickedDate: day
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
        <div className="left-menu-button cursor-pointer">
            Manage Rooms
        </div>
        <div className="left-menu-button cursor-pointer">
            Manage Users
        </div>
        <div className="left-menu-button cursor-pointer" >
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
            return ( 
              <div className="standard-box cursor-pointer" key={r.id_room}
                onClick={() => this.showBookingPopUp(r.id_room)}>{r.room_name}</div> 
            );
          } else if(r.room_type === "Deluxe Room") {
            return ( 
              <div className="deluxe-box cursor-pointer" key={r.id_room}
                onClick={() => this.showBookingPopUp(r.id_room)}>{r.room_name}</div> 
            );
          } else if(r.room_type === "Twin's Room") {
            return ( 
              <div className="twin-box cursor-pointer" key={r.id_room}
                onClick={() => this.showBookingPopUp(r.id_room)}>{r.room_name}</div> 
            );
          } else if(r.room_type === "Triple Bed") {
            return ( 
              <div className="triple-box cursor-pointer" key={r.id_room}
                onClick={() => this.showBookingPopUp(r.id_room)}>{r.room_name}</div> 
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
    const { isLoggedIn, users } = this.state;
    console.log(this.state)
    return (
      <React.Fragment>
      {!isLoggedIn ? 
        this.renderDashboard()
      : <LoginPage users={users} loggingIn={(user) => this.loggingIn(user)} />}
      </React.Fragment>
    );
  }
}
