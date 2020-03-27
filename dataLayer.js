const fetch = require('node-fetch');

const helpers = require('./helpers.js');
const countriesAPI = 'https://corona.lmao.ninja/v2/jhucsse';
const NovelCovidAPI = 'https://corona.lmao.ninja/v2/historical/';

var lastUpdateData = [];
var lastUpdateDate = '';

// TODO:change api endpoint to countries endpoint because it has more relevant data. 

exports.getCovidList = async function (country) {
    try {
        const response = await fetch(NovelCovidAPI + country);
        // console.log('response: ' + JSON.stringify(data))
        let responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('ERROR: ' + error);
        return 'ERROR';
    }
};

exports.getLastData = function (data) {
    let currentDate = helpers.getCurrentDate();
    let dailyCases = helpers.getDailyResults(currentDate, data.timeline);
    return dailyCases;
};

exports.getCountriesWithCorona = async function () {
    try {
        const response = await fetch(countriesAPI);
        let responseData = await response.json();
        countriesArray = [];
        responseData.map(elem => {
            let province = '';
            if (elem.province === null) {
                province = '';
            } else {
                province = elem.province;
            };
            let countryProvince = elem.country + ', ' + province;
            countriesArray.push(countryProvince);
        })
        return countriesArray;
    } catch (error) {
        console.error('ERROR: ' + error);
        return 'ERROR';
    }
}