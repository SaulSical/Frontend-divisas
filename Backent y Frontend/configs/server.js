'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import apiLimiter from "../src/middlewares/validar-peticiones.js";
import conversionRoutes from '../src/convertidor/convertidor.routes.js';

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.middlewares();
        this.convertPath = '/api/v1/convert';
        this.routes();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(morgan('dev'));
        this.app.use(apiLimiter);
    }

    routes(){
        this.app.use(this.convertPath, conversionRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default Server;