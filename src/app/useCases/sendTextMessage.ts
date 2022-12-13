import { randomUUID } from 'crypto';
import { QRCode } from '../../@types/app';
import { formatPhoneNumber } from '../../utils/formatPhoneNumber';
import { Message } from '../models/message';
import { Sender } from '../models/sender';

interface SendTextMessageRequest {
  receiver: string
  content: string
}
type SendTextMessageResponse = Message | void | QRCode | string;

const sender = new Sender({ sessionName: 'wpp_message_sender' });

export class SendTextMessage {
  static async execute({ receiver, content }: SendTextMessageRequest):
  Promise<SendTextMessageResponse> {
    const client = sender.getClient;

    const phoneNumber = formatPhoneNumber(receiver);
    await client.sendText(`${phoneNumber}@c.us`, content);

    const message = new Message({
      id: randomUUID(),
      receiver,
      content,
    });

    return message;
  }

  static async qrCode(): Promise<SendTextMessageResponse> {
    return sender.getQrCode;
  }

  static async status(): Promise<SendTextMessageResponse> {
    return sender.getStatus;
  }
}
