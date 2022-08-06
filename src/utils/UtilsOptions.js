
const getSystemDateFormatted = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    let hh = today.getHours();
    let min = today.getMinutes();
    let ss = today.getSeconds();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (hh < 10) hh = '0' + hh;
    if (min < 10) min = '0' + min;
    if (ss < 10) ss = '0' + ss;

    const formattedToday =  dd + '/' + mm + '/' + yyyy + " time: " + hh + ":" + min + ":" + ss;
    console.log("new Data " + formattedToday);
    return formattedToday
}

export default { getSystemDateFormatted };
