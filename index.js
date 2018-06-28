`use strict`;

const { token, options } = require(`./config`);

const codebottle = require(`codebottle`);
const telegraf = require(`telegraf`);
const bot = new telegraf(token, options);

const {
    inlineButtons,
    formatText,
} = require(`./functions`);

bot.command(`start`, async (ctx) => ctx.reply(`Hi I'm CodeBottle Bot.`));

bot.command(`search`, async (ctx) => {
    try {
        let { text, entities } = ctx.message;
        text = text.slice(entities[0].length + 1);

        if (text) {
            const { data } = await codebottle.search(text);

            ctx.reply(
                formatText(data[0]),
                Object.assign({
                    parse_mode: `html`
                }, inlineButtons(data[0].id, true))
            );
        }
    } catch (e) {
        ctx.reply(`There was an error.`);
    }
});

bot.command(`latest`, async (ctx) => {
    try {
        const { data } = await codebottle.getLatest();
        ctx.reply(
            formatText(data[0]),
            Object.assign({
                parse_mode: `html`
            }, inlineButtons(data[0].id, true))
        );
    } catch (e) {
        ctx.reply(`There was an error.`);
    }
});

bot.command(`get`, async (ctx) => {
    try {
        let { text, entities } = ctx.message;
        text = text.slice(entities[0].length + 1);

        if (text) {
            const { data } = await codebottle.get(text);

            ctx.reply(
                formatText(data),
                Object.assign({
                    parse_mode: `html`
                }, inlineButtons(data.id, true))
            );
        }
    } catch (e) {
        ctx.reply(`There was an error.`);
    }
});

bot.on(`inline_query`, async (ctx) => {
    const results = [];
    const { query } = ctx.update.inline_query;

    try {
        const { data } = await (query ?
            codebottle.search(query) :
            codebottle.getLatest());

        data.forEach((snippet) => {
            results.push({
                type: `article`,
                id: snippet.id,
                title: snippet.title,
                input_message_content: {
                    message_text: formatText(snippet),
                    parse_mode: `html`,
                    disable_web_page_preview: true
                },
                reply_markup: inlineButtons(snippet.id, true),
                url: `https://codebottle.io/s/${snippet.id}`,
                hide_url: true,
            });
        });
    } catch (e) {
        results.push({
            type: `article`,
            id: `error`,
            title: `There was an error.`,
            message_text: `¯\\_(ツ)_/¯`
        });
    } finally {
        ctx.answerInlineQuery(results.slice(0, 50));
    }
});

bot.action(/^code_(.+)$/, async (ctx) => {
    try {
        const [, id] = ctx.match;
        const { data } = await codebottle.get(id);

        await ctx.editMessageText(
            formatText(data, true),
            Object.assign({
                parse_mode: `html`
            }, inlineButtons(id))
        );

        ctx.answerCbQuery();
    } catch (e) {
        ctx.answerCbQuery(`There was an error.`, true);
    }
});

bot.action(/^desc_(.+)$/, async (ctx) => {
    try {
        const [, id] = ctx.match;
        const { data } = await codebottle.get(id);

        await ctx.editMessageText(
            formatText(data),
            Object.assign({
                parse_mode: `html`
            }, inlineButtons(id, true))
        );

        ctx.answerCbQuery();
    } catch (e) {
        ctx.answerCbQuery(`There was an error.`, true);
    }
});

bot.startPolling();
// eslint-disable-next-line no-console
console.log(`@${options.username} is running...`);