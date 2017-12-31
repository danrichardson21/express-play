import { Container } from 'inversify';
import 'reflect-metadata';
import { Operation, HelloWorld, Profile, OrderOperation } from '../operations/helloworld';
import { Server } from '../server';
import { DATABASE_CONFIG } from './database.config';
import { config } from 'mssql';
import { OrderDao } from '../db/db.orders';

let container = new Container();
container.bind<Operation>("Operation").to(HelloWorld);
container.bind<Operation>("Operation").to(Profile);
container.bind<Operation>("Operation").to(OrderOperation);
container.bind<OrderDao>(OrderDao).toSelf();
container.bind<Server>(Server).toSelf();
container.bind<config>("database_config").toConstantValue(DATABASE_CONFIG);


var server = container.get<Server>(Server);
