import { injectable, inject, postConstruct } from 'inversify'
import { config, ConnectionPool, ISOLATION_LEVEL, Request, TYPES, Transaction } from 'mssql';
import { Order } from '../common/types';
import { resolve } from 'path';

@injectable()
class OrderDao {

    private connection: Promise<ConnectionPool>; 

    constructor(@inject('database_config') private conf: config) { }


    public saveOrder(order: Order): void {
        this.connection
        .then((conn) => {
            //const transaction = conn.request().transaction;
            
            const transaction = new Transaction(conn);

            transaction.begin(ISOLATION_LEVEL.READ_COMMITTED, (err) => {
                let rollback = false;
    
                transaction.on('rollback', aborted => {
                    rollback = true;
                });

                new Request(transaction)
                .input('orderDate', TYPES.Date, order.OrderDate)
                .input('orderNumber',TYPES.Int, order.OrderNumber)
                .input('customerId', TYPES.Int, order.CustomerId)
                .input('total', TYPES.Numeric, order.TotalAmount)
                .query('INSERT INTO dbo.[Order] (OrderDate, OrderNumber, CustomerId, TotalAmount) Values (@orderDate, @orderNumber, @customerId, @total)', (err, recordset) => {
                    if (err) {
                        if (!rollback) {
                            transaction.rollback();
                        }
                    } else {
                        transaction.commit();
                    }
                });
            });
        });
    }

    public getOrderById(orderId: number): Promise<Order> {
        return this.connection
        .then((conn) => conn.request().input('id', orderId).query('SELECT * FROM dbo.[Order] where Id = @id'))
        .then((result) => result.recordset.map((item) => item as Order))
        .then((rd) => rd[0])
        .catch((err) => new Promise((res, err) => resolve({Id: -1})));
    }

    @postConstruct()
    public setup(): void {
        this.connection = new ConnectionPool(this.conf).connect();
    }

}

export { OrderDao };