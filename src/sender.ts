import { create, Whatsapp } from 'venom-bot';

interface SendMessageProps {
	to: string
	body: string
}

export class Sender {
	constructor() {
		this.initialize();
	}

	private client!: Whatsapp;

	private initialize() {
		const start = (client: Whatsapp) => {
			this.client = client;
		};

		create({session: 'wpp_message_sender', multidevice: false})
			.then((client) => start(client))
			.catch((error) => {console.log(error);});
	}

	async sendMessage({to, body}: SendMessageProps) {
		// 55900000000@c.us @c.us -> send to contact
		await this.client.sendText(to, body);
	}
}