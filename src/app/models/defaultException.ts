interface DefaultExceptionProps extends Omit<Error, 'name'> {
  code: number
  name?: string
  message: string
}

export class DefaultException {
  private props: DefaultExceptionProps;

  constructor(props: DefaultExceptionProps) {
    this.props = props;
  }

  get code() {
    return this.props.code;
  }

  set code(code: number) {
    this.props.code = code;
  }

  get message() {
    return this.props.message;
  }

  set message(message: string) {
    this.props.message = message;
  }

  get error() {
    return this.props;
  }
}
