import * as express from 'express';
import * as bodyParser from  'body-parser';
import { HelloWorld, Profile, Operation } from './operations/helloworld';
import { injectable, multiInject, postConstruct } from 'inversify';

@injectable()
class Server {

    private app: express.Application;
    private operations: Operation[];

    constructor(@multiInject("Operation") operations: Operation[]) {
        this.app = express();
        this.app.set("port", process.env.port || 3000);
        this.operations = operations;
    }

    @postConstruct()
    public startServer(): void {
        let router = express.Router();
        this.operations.forEach((operation) => operation.setupOperation(router));
        
        this.app.use(bodyParser.json());
        this.app.use(router);
        this.app.listen(this.app.get("port"), () => {
            console.log('server started');
        });
    }
}

export {Server};
