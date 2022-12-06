import { create, Whatsapp } from 'venom-bot';

export class Sender {
	constructor() {
		this.initialize();
	}

	private client!: Whatsapp;

	private initialize() {
		const start = (client: Whatsapp) => {
			this.client = client;
			this.sendMessage('55900000000@c.us', 'Message test');
		};

		create({session: 'wpp_message_sender', multidevice: false})
			.then((client) => start(client))
			.catch((erro) => {console.log(erro);});
	}

	async sendMessage(to: string, body: string) {
		// 55900000000@c.us @c.us -> send to contact
		this.client.sendText(to, body);
	}
}