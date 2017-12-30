import * as express from "express";

class server {

    private app:express.Application;

    constructor() {
        this.app = express();
        this.app.set("port", process.env.port || 3000);   
    }

    public startServer(): void {
        this.app.listen(this.app.get("port"), () => {
            console.log('server started');
        });
    }
}

export {server};
