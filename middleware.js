`use strict`;

module.exports = (bot) => {
    bot.context.sendChatAction = function (action) {
        bot.telegram.sendChatAction(this.chat.id, action);
    };

    bot.context.chatAction = function (action = `typing`) {
        const interval = setInterval(() => this.sendChatAction(action), 4000);
        this.sendChatAction(action);

        const stop = () => clearInterval(interval);
        return { stop };
    };

    bot.context.reply = async function (...args) {
        const typing = this.chatAction();
        const { message_id } = this.message;

        this.assert(this.chat, `reply`);

        args[1] = Object.assign({
            reply_to_message_id: message_id,
            parse_mode: `markdown`
        }, args[1]);

        try {
            await bot.telegram.sendMessage(this.chat.id, ...args);
        } catch (e) {
            if (e.description == `Bad Request: reply message not found`) {
                args[1] = Object.assign(args[1], {
                    reply_to_message_id: null
                });

                bot.telegram.sendMessage(this.chat.id, ...args);
            } else {
                throw e;
            }
        } finally {
            typing.stop();
        }
    };
};