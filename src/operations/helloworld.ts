import { Router, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { OrderDao } from '../db/db.orders';

interface Operation {
    setupOperation(router: Router): void;
}

@injectable()
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

@injectable()
class Profile implements Operation {

    public setupOperation(router: Router): void {
        router.get('/profile', (req, res) => {
            res.send('Dan');
        });
    }
}

@injectable()
class OrderOperation implements Operation {

    constructor (@inject(OrderDao) private orderDao: OrderDao) {}

    public setupOperation(router: Router): void {
        router.get('/order', (req, res) => {
            let order = this.orderDao.getOrderById(1);
            order.then((order) => {
                res.send(JSON.stringify(order));
            });
        });
    }

}

export { HelloWorld, Profile, Operation, OrderOperation };