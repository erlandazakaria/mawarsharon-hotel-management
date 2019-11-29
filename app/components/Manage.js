import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import { ipcRenderer } from 'electron';
import './manage.css';

type Props = {
  users: array,
  bookings: array,
  rooms: array,
  managePopup: object,
  closeManagePopup: () => void,
};

export default class Manage extends Component<Props> {
    props: Props;

    onDailyReport = () => {
        const { bookings } = this.props;
        ipcRenderer.send('generate-pdf', bookings);        
    }

    renderManage = () => {
        const {users, rooms, bookings, managePopup} = this.props;
        if(managePopup.which === 'users') {
            return(
                <React.Fragment>
                    <div className="manage-addmore">Add User</div>
                    <table style={{marginTop: '20px'}}>
                        <tr className="manage-title"><td>Nama</td><td>Username</td><td>Tipe</td><td colSpan={2}>Action</td></tr>
                        {users.map(u => {
                            return(
                                <tr className="manage-content"><td>{u.user_name}</td><td>{u.username}</td><td>{u.user_type}</td><td>Edit</td><td>Delete</td></tr>
                            );
                        })}
                    </table>
                </React.Fragment>
            );
        } else if(managePopup.which === 'rooms') {
            return(
                <React.Fragment>
                    <div className="manage-addmore">Add Room</div>
                    <table style={{marginTop: '20px'}}>
                        <tr className="manage-title"><td>Nama</td><td>Tipe</td><td colSpan={2}>Action</td></tr>
                        {rooms.map(r => {
                            return(
                                <tr className="manage-content"><td>{r.room_name}</td><td>{r.room_type}</td><td>Edit</td><td>Delete</td></tr>
                            );
                        })}
                    </table>
                </React.Fragment>
            );
        } else if (managePopup.which === 'report') {
            return(
                <table>
                    <tbody>
                        <tr>
                            <td>Laporan Harian</td>
                            <td>:</td>
                            <td>Tanggal <input /></td>
                            <td>Bulan <input /></td>
                            <td>Tahun <input /></td>
                            <td><button onClick={this.onDailyReport}>Buat</button></td>
                        </tr>
                        <tr>
                            <td>Laporan Bulanan</td>
                            <td>:</td>
                            <td colSpan={3}>Bulan <input /></td>
                            <td><button>Buat</button></td>
                        </tr>
                        <tr>
                            <td>Laporan Tahunan</td>
                            <td>:</td>
                            <td colSpan={3}>Tahun <input /></td>
                            <td><button>Buat</button></td>
                        </tr>
                    </tbody>
                </table>
            );
        }
    }
    render() {
        const { closeManagePopup, managePopup } = this.props;
        console.log(this.props)
        return(
            <div className="manage-overlay">
                <div className="manage-container">
                    {this.renderManage()}
                </div>
                <div className="manage-close" onClick={() => closeManagePopup()}>
                    X
                </div>
            </div>
        );
    }
}