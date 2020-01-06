const codebottle = require(`codebottle`);
const { inlineButtons, formatText } = require(`../helpers`);

module.exports = bot =>
    bot.command(`search`, async ctx => {
        try {
            let { text, entities } = ctx.message;
            text = text.slice(entities[0].length + 1);

            if (text) {
                const data = await codebottle.search({ query: text });

                ctx.reply(
                    formatText(data[0]),
                    Object.assign(
                        { parse_mode: `html` },
                        inlineButtons(data[0].id, true),
                    ),
                );
            }
        } catch (e) {
            ctx.reply(`There was an error.`);
            console.log(e);
        }
    });
