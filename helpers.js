exports.getCurrentDate = function () {
    let d = new Date();
    let day = d.getDate().toString();
    let month = (d.getMonth() + 1).toString();
    let year = d.getFullYear().toString().substr(2, 3);
    let resultDate = month + '/' + day + '/' + year
    return resultDate
}

exports.getDailyResults = function (currentDate, currentData) {
    if (currentData.cases.hasOwnProperty(currentDate)) {
        let dailyData = {};
        dailyData.date = currentDate;
        dailyData.cases = currentData.cases[currentDate];
        dailyData.deaths = currentData.deaths[currentDate];
        return dailyData;
    } else {
        let dateArray = currentDate.split('/');
        let newDate = '';
        if (dateArray[2] === 1) {
            newDate = (Number(dateArray[0]) - 1).toString() + '/' + dateArray[1].toString() + '/' + dateArray[3].toString();
        } else {
            newDate = dateArray[0] + '/' + (Number(dateArray[1]) - 1).toString() + '/' + dateArray[2].toString();
        }
        return getDailyResults(newDate, currentData);

    }
};

exports.getCountriesList = function (data) {
    let listArray = [];
    data.map(elem => {
        listArray.push(elem.country)
    })
}