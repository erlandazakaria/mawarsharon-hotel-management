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

export {
    countDay,
    generateMonth,
    generateYear
}
