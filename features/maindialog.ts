import { Botkit, BotkitConversation } from "botkit";

export default (controller: Botkit) => {
    let mainDialog = new BotkitConversation("mainDialog", controller);

    mainDialog.ask({
        text: ["Hi there! Please select the topic"],
        quick_replies: [{ title: "Check if Auth is Required", payload: "Check if Auth is Required" }]
    }, [{
        pattern: "Check if Auth is Required",
        handler: async (response, convo, bot) => {
            await bot.replaceDialog("authCheckDialog");
        }
    }], 'welcome');

    controller.addDialog(mainDialog);

    controller.on(["hello", "welcome_back"], async (bot, message) => {
        await bot.beginDialog("mainDialog");
    });
}