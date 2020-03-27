const TelegramBot = require('node-telegram-bot-api');
const config = require('./config.js');
const helpers = require('./helpers.js');
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
    const resp = 'What country are you looking for information? send with /available to check available countries or /country + country or country,province to get the data';
    // the captured "whatever"

    // send back the matched "whatever" to the chat
    console.log(msg.chat.id)
    bot.sendMessage(chatId, resp);
});


bot.onText(/\/country (.+)/, (msg, match) => {

    console.log(JSON.stringify('Match: ' + match[1]))
    const chatId = msg.chat.id;
    const country = helpers.sanitizeCountry(match[1]);

    // get data for especific country
    let countryData = dataLayer.getCovidList(country).then((data) => {
        let lastStatus = dataLayer.getLastData(data);
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

    const chatId = msg.chat.id;
    const resp = 'The list of available countries is: ';
    console.log(msg.chat.id)
    bot.sendMessage(chatId, resp);

    // Get List of available countries with actual data
    let countries = dataLayer.getCountriesWithCorona().then(
        (data) => {
            let stringMessage = '';
            data.map(elem => {
                stringMessage = stringMessage + elem + '\n';
            })
            if (stringMessage.length > 4096) {
                bot.sendMessage(chatId, stringMessage.slice(0, 4095));
                bot.sendMessage(chatId, stringMessage.slice(4096, (stringMessage.length - 1)))
            } else {
                bot.sendMessage(chatId, stringMessage);
            };

        })


});