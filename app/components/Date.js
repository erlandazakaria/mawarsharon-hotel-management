import * as moment from 'moment';

const countDay = (month, year) => {
    let totalDay = 30;
    let day = [];
    if(month === 4  || month === 6  || month === 9  || month === 11) {
        totalDay = 30;
    } else if (month === 1 || month === 3  || month === 5  || month === 7 || month === 8 || month === 10 || month === 12) {
        totalDay = 31;
    } else if (month === 2) {
        if(year%4 === 0) {
            if(year%100 === 0 && year%400!==0) {
                totalDay=28
            } else {
                totalDay = 29;
            }
        } else {
            totalDay = 28;
        }
    }
    for(let i = 1; i <= totalDay; i++) {
        day.push(i);
    }
    return day
}

const generateMonth = () => {
    return ([
        {
            month_id: 1,
            month_name: "Januari"
        },
        {
            month_id: 2,
            month_name: "Februari"
        },
        {
            month_id: 3,
            month_name: "Maret"
        },
        {
            month_id: 4,
            month_name: "April"
        },
        {
            month_id: 5,
            month_name: "Mei"
        },
        {
            month_id: 6,
            month_name: "Juni"
        },
        {
            month_id: 7,
            month_name: "Juli"
        },
        {
            month_id: 8,
            month_name: "Agustus"
        },
        {
            month_id: 9,
            month_name: "September"
        },
        {
            month_id: 10,
            month_name: "Oktober"
        },
        {
            month_id: 11,
            month_name: "November"
        },
        {
            month_id: 12,
            month_name: "Desember"
        },
    ]);
}

const generateYear = () => {
    const dateNow = new Date();
    const year = [];
    for(let i = dateNow.getFullYear() - 10; i <= dateNow.getFullYear() + 10; i++) {
        year.push(i)
    }
    return year
}

const generateDateFormat = (day, month, year) => {
    let newDay = String(day);
    let newMonth = String(month);
    if(newDay.length <2) {
        newDay = '0' + newDay;
    }
    if(newMonth.length <2) {
        newMonth = '0' + newMonth;
    }
    return `${year}-${newMonth}-${newDay}`
}

const checkBookDate = (pickedDate, checkin, checkout) => {
    let dayCheckout = parseInt(checkout.substr(8,2), 10);
    let monthCheckout = parseInt(checkout.substr(5,2), 10);
    let yearCheckout = parseInt(checkout.substr(0,4), 10);
    let dayCheckin = parseInt(checkin.substr(8,2), 10);
    let monthCheckin = parseInt(checkin.substr(5,2), 10);
    let yearCheckin = parseInt(checkin.substr(0,4), 10);
    let dayPicked = parseInt(pickedDate.substr(8,2), 10);
    let monthPicked = parseInt(pickedDate.substr(5,2), 10);
    let yearPicked = parseInt(pickedDate.substr(0,4), 10);
    let avail = true;
    let lastDay = false;
    let a = moment([yearCheckin, monthCheckin-1, dayCheckin]);
    let b = moment([yearCheckout, monthCheckout-1, dayCheckout]);
    let countStay = b.diff(a, 'days');
    let bookedDate = [];
    for(let i = 0; i <= countStay; i++) {
        let totalDayInMonth = countDay(monthCheckin, yearCheckin).length;
        let insertDay = dayCheckin+i;
        let insertMonth = monthCheckin;
        let insertYear = yearCheckin;
        if(dayCheckin+i > totalDayInMonth) {
            insertDay = insertDay-totalDayInMonth;
            insertMonth = insertMonth + 1;
            if(insertMonth > 12) {
                insertMonth= insertMonth - 12;
                insertYear= insertYear + 1;
            }
        }
        if(String(insertDay).length < 2) { insertDay = '0' + insertDay }
        if(String(insertMonth).length < 2) { insertMonth = '0' + insertMonth }
        bookedDate.push(`${insertYear}-${insertMonth}-${insertDay}`)
    }
    if(bookedDate.includes(pickedDate)) {
        avail = false;
        let today = moment([yearPicked, monthPicked-1, dayPicked]);
        let fromCheckout = b.diff(today, 'days');
        if(fromCheckout === 0) {
            lastDay = true;
        }
    }

    return {
        avail: avail,
        lastDay: lastDay
    }
}

export {
    countDay,
    generateMonth,
    generateYear,
    generateDateFormat,
    checkBookDate
}
