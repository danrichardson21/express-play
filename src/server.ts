import * as express from "express";
import { HelloWorld } from './operations/helloworld';


class Server {

    private app: express.Application;

    constructor() {
        this.app = express();
        this.app.set("port", process.env.port || 3000);   
    }

    public startServer(): void {
        let router = express.Router();
        HelloWorld.setupHelloWorld(router);
        
        this.app.use(router);
        this.app.listen(this.app.get("port"), () => {
            console.log('server started');
        });
    }
}

export {Server};

let server = new Server();
server.startServer();
