

import moment from 'moment-timezone';
import {getUserOption} from 'js/Models/User';

const objectToUrl = (object) => {
    let outputArray = [];
    for (let key in object) {
        let val = object[key];

        if (Array.isArray(val)) {
            for(let i=0; i<val.length; i++) {
                outputArray.push(key+'[]='+val[i]);
            }
        }
        else {
            outputArray.push(key+'='+val);
        }
    }
    return outputArray.join('&');
};

const utcToLocaleTime = (dateUtc) => {
    let date  = moment.tz(dateUtc,'UTC');
    let localeDate  = date.clone().tz(getUserOption('timezone'));
    localeDate = moment(localeDate.format('YYYY-MM-DD HH:mm:ss'));


    return  localeDate.toDate();
};

const dateToLocaleTime = (dateLocale) => {
    let date  = moment(dateLocale);
    let localeDate  = date.clone().tz(getUserOption('timezone'));
    localeDate = moment(localeDate.format('YYYY-MM-DD HH:mm:ss'));
    return  localeDate.toDate();
};

const getMonday =(d) => {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
};

const isJson = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

export {
    objectToUrl,
    utcToLocaleTime,
    dateToLocaleTime,
    getMonday,
    isJson

}
