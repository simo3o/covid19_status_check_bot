const TelegramBot = require('node-telegram-bot-api');
const config = require('./config.js');
const dataLayer = require('./dataLayer.js');
const fetch = require('node-fetch');



// replace the value below with the Telegram token you receive from @BotFather
const token = config.token;
console.log('token:' + JSON.stringify(token));

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/start/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = 'What country are you looking for information? send with /Country  command + Name';
    // the captured "whatever"

    // send back the matched "whatever" to the chat
    console.log(msg.chat.id)
    bot.sendMessage(chatId, resp);
});


bot.onText(/\/country (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    console.log(JSON.stringify('Match: ' + match[1]))
    const chatId = msg.chat.id;
    const country = match[1];
    // the captured "whatever"

    // send back the matched "whatever" to the chat
    let countryData = dataLayer.getCovidList(country).then((data) => {
        // console.log('Country data: ' + JSON.stringify(data))
        let lastStatus = dataLayer.getLastData(data);
        // let cases = data.timeline.cases;
        // let deaths = data.timeline.deaths;
        let response = '';
        if (typeof (lastStatus) != 'undefined') {
            response = lastStatus.cases + ' total of cases in ' + data.country + ' and ' + lastStatus.deaths + ' deaths on ' + lastStatus.date
        } else {
            response = 'There was an error';
        }
        bot.sendMessage(chatId, response);

    }

    )
});
bot.onText(/\/available/, (msg, match) => {


    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = 'The list of available countries is: ';
    console.log(msg.chat.id)
    bot.sendMessage(chatId, resp);

    let countries = dataLayer.getCountriesWithCorona().then(
        (data) => {
            let stringMessage = '';
            data.map(elem => {
                stringMessage = stringMessage + elem + '\n';
                // bot.sendMessage(chatId, elem)
            })
            if (stringMessage.length > 4096) {
                bot.sendMessage(chatId, stringMessage.slice(0, 4095));
                bot.sendMessage(chatId, stringMessage.slice(4096, (stringMessage.length - 1)))
            } else {
                bot.sendMessage(chatId, stringMessage);
            };

        })
    // the captured "whatever"

    // send back the matched "whatever" to the chat

});



// Listen for any kind of message. There are different kinds of
// messages.
// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;

//     // send a message to the chat acknowledging receipt of their message
//     bot.sendMessage(chatId, 'Received your message');
// });


// var getCovidList = async function (country) {
//     try {
//         const response = await fetch(NovelCovidAPI + country);
//         // console.log('response: ' + JSON.stringify(data))
//         let responseData = await response.json();
//         return responseData;
//     } catch (error) {
//         console.log('ERROR ' + error);
//     }
// };

// var getLastData = function (data) {
//     let currentDate = getCurrentDate();
//     let dailyCases = getDailyResults(currentDate, data.timeline);
//     return dailyCases;
// }

// var getCurrentDate = function () {
//     let d = new Date();
//     let day = d.getDate().toString();
//     let month = (d.getMonth() + 1).toString();
//     let year = d.getFullYear().toString().substr(2, 3);
//     let resultDate = month + '/' + day + '/' + year
//     return resultDate
// }
// var getDailyResults = function (currentDate, currentData) {
//     if (currentData.cases.hasOwnProperty(currentDate)) {
//         let dailyData = {};
//         dailyData.date = currentDate;
//         dailyData.cases = currentData.cases[currentDate];
//         dailyData.deaths = currentData.deaths[currentDate];
//         return dailyData;
//     } else {
//         let dateArray = currentDate.split('/');
//         let newDate = '';
//         if (dateArray[2] === 1) {
//             newDate = (Number(dateArray[0]) - 1).toString() + '/' + dateArray[1].toString() + '/' + dateArray[3].toString();
//         } else {
//             newDate = dateArray[0] + '/' + (Number(dateArray[1]) - 1).toString() + '/' + dateArray[2].toString();
//         }
//         return getDailyResults(newDate, currentData);

//     }
// }