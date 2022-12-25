import { SendTextResponse } from '../../@types/app';
import { formatPhoneNumber } from '../../utils/formatPhoneNumber';
import { DefaultException } from '../models/defaultException';
import { Message } from '../models/message';
import { Sender } from '../models/sender';

export interface SendTextMessageRequest {
  receiver: string
  content: string
}
type SendTextMessageResponse = Message;

const sender = new Sender({ sessionName: 'wpp_message_sender' });

export class SendTextMessage {
  static async execute({ receiver, content }: SendTextMessageRequest):
  Promise<SendTextMessageResponse> {
    const client = sender.getClient;
    const phoneNumber = formatPhoneNumber(receiver);

    const response = await client.sendText(`${phoneNumber}@c.us`, content);
    const responseData = response as SendTextResponse;

    if (responseData.erro) {
      throw new DefaultException({ code: 400, message: responseData.text });
    }

    const message = new Message({
      id: responseData.to.id,
      receiver: responseData.to.remote.user,
      content: responseData.text,
      error: responseData.erro,
      session: sender.getSession,
    });

    return message;
  }
}
