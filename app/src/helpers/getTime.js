const minutes = () => {
    const mins = new Date().getMinutes();
    if (mins < 10) {
        return `0${mins}`;
    } 
    return mins
}

const hours = new Date().getHours()

export default function() {
    if (hours && minutes()) {
        return `${hours}:${minutes()}`
    }
}