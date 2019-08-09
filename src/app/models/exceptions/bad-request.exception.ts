import HttpException from './http.exception';
import { HttpStatusCodes } from '../../constants/http-status-codes.enum';

export class BadRequestException extends HttpException {

  static WithMessages(messages: string[]): BadRequestException {
    return new BadRequestException(messages.join(' - '));
  }

  constructor(public error: string) {
    super(HttpStatusCodes.BAD_REQUEST, error);
  }

}
