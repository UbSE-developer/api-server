import * as bodyParser from 'body-parser';
import express from 'express';
import 'module-alias/register';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import RootRouter from './controller';

const main = async () => {
    const port = 4000;

    const swaggerOptions = {
        swaggerDefinition: {
            info: {
                title: 'ubsta-Server',
                version: '1.0.0',
                description: 'ubsta backend server',
            },
            host: 'localhost',
            basePath: '/api',
        },
        apis: ['swagger.yaml'],
    };

    const specs = swaggerJsDoc(swaggerOptions);

    const app = express();

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    app.use(bodyParser.json());
    app.use('/api', RootRouter);


    app.listen(port, async () => {
      console.log('Server Start');
    });
};
main();