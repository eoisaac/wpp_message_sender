interface MessageProps {
  receiver: string;
  content: string;
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
}
