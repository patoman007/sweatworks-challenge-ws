import { appPort } from './app/config/config';
import app from './app/app';
import database from './app/dynamodb/dynamo-db-client';

const port = appPort || 3000;

(async () => {
  try {
    await database.InitTables();
    app.listen(port, () => {
      console.log(`Listening on port ${ port }`);
    });
  } catch (ex) {
    console.error('Error when trying to init database tables', ex);
  }
})();
