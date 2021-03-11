declare const global: any;
import { Express } from "express";
const expressSwagger = require("express-swagger-generator");
const config = require('../config/config.json');
const hostName = process.env.HOST || config.http.host;
const port = process.env.PORT || config.http.port;

export function initSwagger(app: Express) {


    let options = {
        swaggerDefinition: {
            info: {
                description: 'Memory Game Api',
                title: 'Memory Game',
                version: '1.0.0',
            },
            host: `${hostName}:${port}`,
            basePath: '/v1',
            produces: [
                "application/json"
            ],
            schemes: ['http']
        },
        basedir: global.appRoot, //app absolute path
        files: ['./routes/**/*.js'] //Path to the API handle folder
    };


    expressSwagger(app)(options);

}