export default class ObjectUtils {

  static IsEmpty(obj: object): boolean {
    return obj && obj.constructor === Object && Object.keys(obj).length === 0;
  }

}
