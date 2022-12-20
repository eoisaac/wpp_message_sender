export interface QRCode {
  qrCode: string
  asciiQR: string
  attempts: number
  urlCode?: string
}

export interface SendTextResponse {
  to: {
    fromMe: boolean,
    remote: {
      user: string,
    },
    id: string
  },
  erro: boolean,
  text: string,
  status: string,
}
