import { Router, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { OrderDao } from '../db/db.orders';
import { Order } from 'common/types';

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
        router.get('/order/:orderId', (req, res) => {
            let orderId = +req.param('orderId');
            let order = this.orderDao.getOrderById(orderId);
            order.then((order) => {
                res.send(JSON.stringify(order));
            });
        });

        router.post('/order', (req, res) => {
            let order = req.body as Order;
            this.orderDao.saveOrder(order);
            res.send(JSON.stringify(order));
        });

        router.put('/order/:orderId', (req, res) => {
            let order = req.body() as Order;
            let orderId = +req.param('orderId');
            order.Id = orderId;
        });
    }

}

export { HelloWorld, Profile, Operation, OrderOperation };