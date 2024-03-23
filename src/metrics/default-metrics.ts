import {collectDefaultMetrics, Registry} from "prom-client";

export const pmRegister = new Registry()
collectDefaultMetrics({ register: pmRegister })