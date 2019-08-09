import AWS from 'aws-sdk';
import { ScanInput } from 'aws-sdk/clients/dynamodb';

import { production, awsRegion, awsAccessKey, awsSecretAccessKey } from '../config/config';

import * as authors from './authors.schema';
import * as publications from './publications.schema';

type awsConfig = AWS.DynamoDB.DocumentClient.DocumentClientOptions
  & AWS.DynamoDB.Types.ClientConfiguration;

class DynamoDbClient {

  private readonly doc: AWS.DynamoDB.DocumentClient;

  private static GetAWSCfg(): awsConfig {
    return production
      ? { region: 'us-west-2', accessKeyId: awsAccessKey, secretAccessKey: awsSecretAccessKey  }
      : { region: awsRegion, endpoint: 'http://localhost:8000' };
  }

  private static async CreateTableIfNotExists(dynamoDB: AWS.DynamoDB,
                                              tableName: string,
                                              params: any) {
    const result = await dynamoDB.listTables({}).promise();
    const exists = result
      && result.TableNames
      && result.TableNames.indexOf(tableName) >= 0;
    if (exists) { return ; }

    try {
      const data = await dynamoDB.createTable(params).promise();
      DynamoDbClient.TableCreationSucceed(tableName, data);
      return;
    } catch (ex) {
      DynamoDbClient.TableCreationFailed(tableName, ex);
      throw ex;
    }
  }

  private static TableCreationSucceed(tableName: string,
                                      data: AWS.DynamoDB.CreateTableOutput) {
    const message = `Table ${ tableName } was successfully created.`;
    const description = JSON.stringify(data, null, 2);
    console.log(message, description);
  }

  private static TableCreationFailed(tableName: string, error: AWS.AWSError) {
    let errorMessage = `Unable to create table ${ tableName }`;
    errorMessage += JSON.stringify(error, null, 2);
    console.error(errorMessage);
  }

  static async InitTables() {
    const cfg = DynamoDbClient.GetAWSCfg();
    const dynamoDB = new AWS.DynamoDB(cfg);
    try {
      await DynamoDbClient.CreateTableIfNotExists(dynamoDB, authors.tableName,
        authors.params);

      await DynamoDbClient.CreateTableIfNotExists(dynamoDB,
        publications.tableName, publications.params);
    } catch (ex) {
      console.error(ex.message || ex);
    }
  }

  constructor() {
    const cfg = DynamoDbClient.GetAWSCfg();
    this.doc = new AWS.DynamoDB.DocumentClient(cfg);
  }

  getAll(params: ScanInput): Promise<any> {
    const doc = this.doc;
    return new Promise<any>((resolve, reject) => {
      doc.scan(params, (err, result) => {
        return err ? reject(err) : resolve(result);
      });
    });
  }

  get(params: any): Promise<any> {
    const doc = this.doc;
    return new Promise<any>((resolve, reject) => {
      doc.get(params, (err, result) => {
        return err ? reject(err) : resolve(result);
      });
    });
  }

  create(params: any): Promise<any> {
    const doc = this.doc;
    return new Promise<any>((resolve, reject) => {
      doc.put(params, (err) => {
        return err ? reject(err) : resolve();
      });
    });
  }

  update(params: any): Promise<any> {
    const doc = this.doc;
    return new Promise<any>((resolve, reject) => {
      doc.update(params, (err) => {
        return err ? reject(err) : resolve();
      });
    });
  }

  remove(params: any): Promise<any> {
    const doc = this.doc;
    return new Promise<any>((resolve, reject) => {
      doc.delete(params, (err) => {
        return err ? reject(err) : resolve();
      });
    });
  }

}

const instance = new DynamoDbClient();
export default DynamoDbClient;
export {
  instance
};
