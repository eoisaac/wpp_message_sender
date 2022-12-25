import { Whatsapp, create } from 'venom-bot';
import { QRCode } from '../../@types/app';

interface SenderProps {
  sessionName: string
}

export class Sender {
  private props: SenderProps;
  private client!: Whatsapp;
  private qrCode!: QRCode;

  constructor(props: SenderProps) {
    this.props = props;
    this.initialize(this.props.sessionName);
  }

  private async initialize(sessionName: string) {
    create(
      {
        session: sessionName,
        multidevice: false,
        catchQR: (
          qrCode: string,
          asciiQR: string,
          attempts: number,
          urlCode?: string,
        ) => {
          this.setQrCode = {
            qrCode, asciiQR, attempts, urlCode,
          };
        },
      },
    )
      .then((client) => {
        this.setClient = client;
      })
      .catch((error) => { console.log(error); });
  }

  get getClient() {
    return this.client;
  }

  set setClient(client: Whatsapp) {
    this.client = client;
  }

  get getQrCode() {
    return this.qrCode;
  }

  set setQrCode(qrCode: QRCode) {
    this.qrCode = qrCode;
  }

  get getSession() {
    return this.props.sessionName;
  }
}
