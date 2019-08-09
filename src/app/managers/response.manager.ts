import { GenericResponseInterface } from '../models/responses/generic.response';
import { GenericResultInterface } from '../models/results/generic-result';

type Result = GenericResultInterface;
type Response = GenericResponseInterface;

export default class ResponseManager {

  public static Succeed(data: object): Response {
    return {
      succeed: true,
      errorMessages: [],
      data
    };
  }

  public static WithErrors(errorMessages: string[]): Response {
    return {
      succeed: false,
      errorMessages,
      data: {}
    };
  }

  public static FromResult(result: Result): Response {
    return result.error
      ? ResponseManager.WithErrors([result.error])
      : ResponseManager.Succeed(result.data);
  }

}
