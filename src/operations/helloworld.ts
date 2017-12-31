import { Router, Request, Response } from "express";

class HelloWorld {

    public static setupHelloWorld(router: Router): void {
        router.get('/hello', (req, res) => {
            new HelloWorld().handleRequest(req, res);
        })
    }

    private handleRequest(req: Request, res: Response): void {
        res.send("Hello World");
    }
}

export { HelloWorld };