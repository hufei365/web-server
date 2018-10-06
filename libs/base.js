const number = {
    pad: function (number, length) {
        var len = length - ('' + Math.abs(number)).length + 1;
        return Array(len > 0 ? len : 0).join(0) + number;
    }
};

const date = {
    format: function(date, format){
        if(date === null || date===undefined){ return date; }
        date = new Date(date);
        const weekArr = ['日', '一', '二', '三', '四', '五', '六'],
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            date2 = date.getDate(),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds(),
            week = date.getDay();

        let pad = number.pad;
        let d = format.replace(/yyyy/g, pad(year, 4))
            .replace(/yy/g, pad(('' + year).slice(2), 2))
            .replace(/MM/g, pad(month, 2))
            .replace(/M/g, month)
            .replace(/dd/g, pad(date2, 2))
            .replace(/d/g, date2)
            .replace(/HH/g, pad(hours, 2))
            .replace(/H/g, hours)
            .replace(/hh/g, pad(hours % 12, 2))
            .replace(/h/g, hours % 12)
            .replace(/mm/g, pad(minutes, 2))
            .replace(/m/g, minutes)
            .replace(/ss/g, pad(seconds, 2))
            .replace(/s/g, seconds)
            .replace(/W/g, weekArr[week]);
        return d;
    }
}

module.exports={
    date: date
    ,number: number
}