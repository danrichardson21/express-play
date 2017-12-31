import { Container } from 'inversify';
import 'reflect-metadata';
import { Operation, HelloWorld, Profile } from '../operations/helloworld';
import { Server } from '../server';

let container = new Container();
container.bind<Operation>("Operation").to(HelloWorld);
container.bind<Operation>("Operation").to(Profile);
container.bind<Server>(Server).toSelf();


var server = container.get<Server>(Server);
