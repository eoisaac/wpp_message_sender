import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';
import { create, Whatsapp } from 'venom-bot';

interface SendMessageProps {
  number: string
  message: string
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

    create({ session: 'wpp_message_sender', multidevice: false })
      .then((client) => start(client))
      .catch((error) => { console.log(error); });
  }

  async sendMessage({ number, message }: SendMessageProps) {
    if (!isValidPhoneNumber(number, 'BR')) {
      throw new Error('The phone number is not valid!');
    }

    if (!message) {
      throw new Error('You must add a text message!');
    }

    const phoneNumber = parsePhoneNumber(number, 'BR')
      .format('E.164').toString().replace('+', '');

    return this.client.sendText(`${phoneNumber}@c.us`, message);
  }
}
