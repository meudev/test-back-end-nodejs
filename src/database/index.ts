import { createConnection, getConnectionOptions } from "typeorm";

interface IOptions {
  host: string;
}

getConnectionOptions().then((options) => {
  const newOptions = options as IOptions;
  newOptions.host = "db_softdesign";
  createConnection({
    ...options,
  }).then(() => console.log('connected to postgress database'));
});