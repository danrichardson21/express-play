import { Router, Request, Response } from "express";

interface Operation {
    setupOperation(router: Router): void;
}

class HelloWorld implements Operation {

    public setupOperation(router: Router): void {
        router.get('/hello', (req, res) => {
            this.handleRequest(req, res);
        });
    }

    private handleRequest(req: Request, res: Response): void {
        res.send("Hello World");
    }
}

class Profile implements Operation {

    public setupOperation(router: Router): void {
        router.get('/profile', (req, res) => {
            res.send('Dan');
        });
    }
}

export { HelloWorld, Profile, Operation };