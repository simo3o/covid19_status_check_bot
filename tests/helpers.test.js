const helpers = require('../helpers.js');
describe("getDailyResults", () => {
    const inputDate = '3/3/20';
    const inputData = {
        cases: {
            '1/3/20': 2,
            '2/3/20': 2,
            '3/3/20': 3,
        },
        deaths: {
            '1/3/20': 2,
            '2/3/20': 2,
            '3/3/20': 3,
        }
    };

    const output = {
        date: '3/3/20',
        deaths: 3,
        cases: 3
    };
    expect(helpers.getDailyResults(inputDate, inputData)).toEqual(output);

});

describe("sanitizeCountry", () => {
    test("it should return a Country DTO", () => {
        const input = 'Spain,Valencia'

        const output = {
            Country: 'Spain',
            Province: 'Valencia'
        };

        expect(helpers.sanitizeCountry(input)).toEqual(output);

    });
});

    // describe("getCountryList", () => {
    //     // test stuff
    // });