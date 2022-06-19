import * as bodyParser from 'body-parser';
import express from 'express';
import 'module-alias/register';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import RootRouter from './controller';
import 'dotenv/config';
import cors from 'cors';
import { DEFAULT_PORT, DEFAULT_URL, DEFAULT_VERSION, SWAGGER_URL } from './common/const';

const port = DEFAULT_PORT;

const options: cors.CorsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,POST',
    origin: DEFAULT_URL,
    
    preflightContinue: false,
};

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'ubsta-Server',
            version: '1.0.0',
            description: 'ubsta backend server',
        },
        host: SWAGGER_URL,
        basePath: DEFAULT_VERSION,
    },
    apis: ['swagger.yaml'],
};

const specs = swaggerJsDoc(swaggerOptions);

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(bodyParser.json());
app.use(cors());
// app.use(cors(options));

app.use('/v1', RootRouter);

app.listen(port, async () => {
    console.log('Server Start');
});