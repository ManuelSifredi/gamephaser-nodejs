import { createConnection } from 'typeorm';

const connection = createConnection()
.then((result) => console.log("Connected with DB"))
.catch((err) => console.log(err));

export default connection;