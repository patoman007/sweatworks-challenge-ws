import { GenericResultInterface } from '../models/results/generic-result';

export default class ResultManager {

  public static WithData(data: object): GenericResultInterface {
    return { data };
  }

  public static WithError(error: string): GenericResultInterface {
    return { data: {}, error };
  }

}
