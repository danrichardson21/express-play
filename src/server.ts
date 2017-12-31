import * as express from "express";
import { HelloWorld, Profile, Operation } from './operations/helloworld';


class Server {

    private app: express.Application;
    private operations: Operation[];

    constructor() {
        this.app = express();
        this.app.set("port", process.env.port || 3000);
        this.operations = new Array();
        this.operations.push(new HelloWorld());
        this.operations.push(new Profile());
    }

    public startServer(): void {
        let router = express.Router();
        this.operations.forEach((operation) => operation.setupOperation(router));
        
        this.app.use(router);
        this.app.listen(this.app.get("port"), () => {
            console.log('server started');
        });
    }
}

export {Server};

let server = new Server();
server.startServer();
