import { create, Whatsapp } from 'venom-bot';

interface SenderProps {
  sessionName: string
}

export class Sender {
  private props: SenderProps;

  private client!: Whatsapp;

  constructor(props: SenderProps) {
    this.props = props;
    this.initialize(this.props.sessionName);
  }

  private initialize(sessionName: string) {
    create({ session: sessionName, multidevice: false })
      .then((client) => { this.setClient = client; })
      .catch((error) => { console.log(error); });
  }

  get getClient() {
    return this.client;
  }

  set setClient(client: Whatsapp) {
    this.client = client;
  }
}
