import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext";

export default {
	async email(message, env, ctx) {

		const msg = createMimeMessage();
		msg.setHeader("In-Reply-To", message.headers.get("Message-ID"));
		msg.setSender({ name: "Auto Reply", addr: message.to });
		msg.setRecipient(message.from);
		msg.setSubject("Hello! Thanks for contacting!");
		msg.addMessage({
			contentType: 'text/html',
			data: `<h1>Hello! Thanks for contacting!</h1>This is an <b>auto-reply</b> and I am eating some Pizza.`
		});
		
		const replyMessage = new EmailMessage(
		  message.to,
		  message.from,
		  msg.asRaw()
		);
		
		await message.reply(replyMessage);
	},
};
