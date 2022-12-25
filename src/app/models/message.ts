interface MessageProps {
  id: string
  session: string
  receiver: string;
  content: string;
  error: boolean
}

export class Message {
  private props: MessageProps;

  constructor(props: MessageProps) {
    this.props = props;
  }

  get content() {
    return this.props.content;
  }

  set content(content: string) {
    this.props.content = content;
  }

  get receiver() {
    return this.props.receiver;
  }

  set receiver(receiver: string) {
    this.props.receiver = receiver;
  }

  get error() {
    return this.props.error;
  }

  set error(error: boolean) {
    this.props.error = error;
  }
}
