import moment from 'moment';

export default function() {
    return { 
        day: moment().format('LL'),
        time: moment().format('LT')
    };
}
