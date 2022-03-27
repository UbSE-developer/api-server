import 'dotenv/config';
export const DEFAULT_PORT = process.env.PORT || '4000';
export const DEFAULT_URL = process.env.URL + '192.168.0.14';
export const SWAGGER_URL = process.env.URL + ':' + process.env.PORT || 'http://192.168.0.14:4000';
export const DEFAULT_VERSION = process.env.VERSION || 'v1';