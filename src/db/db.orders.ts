import { injectable, inject, postConstruct } from 'inversify'
import { config, ConnectionPool } from 'mssql';
import { Order } from '../common/types';
import { resolve } from 'path';

@injectable()
class OrderDao {

    private connection: Promise<ConnectionPool>; 

    constructor(@inject('database_config') private conf: config) { }

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