const codebottle = require(`codebottle`);
const { inlineButtons, formatText } = require(`../helpers`);

module.exports = bot =>
    bot.command(`fetch`, async ctx => {
        try {
            let { text, entities } = ctx.message;
            text = text.slice(entities[0].length + 1);

            if (text) {
                const data = await codebottle.fetch(text);

                ctx.reply(
                    formatText(data),
                    Object.assign(
                        { parse_mode: `html` },
                        inlineButtons(data.id, true),
                    ),
                );
            }
        } catch (e) {
            ctx.reply(`There was an error.`);
            console.log(e);
        }
    });
