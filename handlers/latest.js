const codebottle = require(`codebottle`);
const { inlineButtons, formatText } = require(`../helpers`);

module.exports = bot =>
    bot.command(`latest`, async ctx => {
        try {
            const data = await codebottle.latest;
            ctx.reply(
                formatText(data[0]),
                Object.assign(
                    { parse_mode: `html` },
                    inlineButtons(data[0].id, true),
                ),
            );
        } catch (e) {
            ctx.reply(`There was an error.`);
            console.log(e);
        }
    });
