exports.getCurrentDate = function () {
    let d = new Date();
    let day = d.getDate().toString();
    let month = (d.getMonth() + 1).toString();
    let year = d.getFullYear().toString().substr(2, 3);
    let resultDate = month + '/' + day + '/' + year
    return resultDate
}


// Get the last results based on current date
exports.getDailyResults = function (currentDate, currentData) {
    if (currentData.cases.hasOwnProperty(currentDate)) {
        let dailyData = {};
        dailyData.date = currentDate;
        if (Object.keys(currentData.cases).length === 0) {
            dailyData.cases = 0;
        } else {
            dailyData.cases = currentData.cases[currentDate];
        };
        if (Object.keys(currentData.deaths).length === 0) {
            dailyData.deaths = 0;
        } else {
            dailyData.deaths = currentData.deaths[currentDate];
        };

        return dailyData;
    } else {
        let dateArray = currentDate.split('/');
        let newDate = '';
        if (dateArray[2] === 1) {
            newDate = (Number(dateArray[0]) - 1).toString() + '/' + dateArray[1].toString() + '/' + dateArray[3].toString();
        } else {
            newDate = dateArray[0] + '/' + (Number(dateArray[1]) - 1).toString() + '/' + dateArray[2].toString();
        }
        return exports.getDailyResults(newDate, currentData);

    }
};

//Get List of countries available.
exports.getCountriesList = function (data) {
    let listArray = [];
    data.map(elem => {
        listArray.push(elem.country)
    })
};


// Sanitize string spliting with province
exports.sanitizeCountry = function (countryData) {
    let countryDTO = {};
    let countryArray = countryData.split(',');
    if (countryArray.length > 1) {
        countryDTO = {
            Country: countryArray[0],
            Province: countryArray[1]
        };
    } else {
        countryDTO = {
            Country: countryArray[1],
            Province: 'NA'
        };
    };
    return countryDTO;
}