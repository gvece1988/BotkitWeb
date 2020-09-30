import { Botkit, BotkitConversation } from "botkit";

export default (controller: Botkit) => {
    let authCheckDialog = new BotkitConversation("authCheckDialog", controller);

    authCheckDialog.ask("Please enter procedure codes",
        async (response, convo, bot) => {
            await convo.gotoThread('procCodesResponse');
        }, 'procCodes');

    authCheckDialog.addMessage(`You have entered`, "procCodesResponse");
    authCheckDialog.addQuestion({
        text: ["Do you want to check other procedure codes?"],
        quick_replies: [{ title: "Yes", payload: "Yes" }, { title: "No", payload: "No" }]
    }, [{
        pattern: 'Yes',
        type: 'string',
        handler: async (response, convo, bot) => {
            return await convo.gotoThread('default');
        }
    }, {
        pattern: 'No',
        type: 'string',
        handler: async (response, convo, bot) => {
            return await bot.replaceDialog("mainDialog");
        }
    }], "moreProcCodes", "procCodesResponse");

    controller.addDialog(authCheckDialog);
}