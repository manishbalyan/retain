/**
 * Created by consultadd on 2/8/16.
 */
import {Store} from "./store";
export {App} from './app';
import * as services from './services';
export {routes} from './routes'

const mapValuesToArray = (obj) => Object.keys(obj).map(key => obj[key]);

export const providers = [
    Store,
    ...mapValuesToArray(services)
];