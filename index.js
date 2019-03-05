`use strict`;

const { token, options } = require(`./config`);

const telegraf = require(`telegraf`);
const bot = new telegraf(token, options);

require(`./handlers`)(bot);

bot.startPolling();
console.log(`@${options.username} is running...`);
