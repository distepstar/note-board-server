"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
// cors
const cors = __importStar(require("cors"));
// swagger
const swaggerUI = __importStar(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../swagger.json"));
// dotenv
const dotenv_1 = __importDefault(require("dotenv"));
// mongoose
const mongoose_1 = require("mongoose");
// routers
const routes_1 = require("../routes");
// utils
const datetime_1 = require("../utils/datetime");
// controller 
const index_1 = require("../controllers/Kanban/index");
const KanbanProject_1 = require("../controllers/KanbanProject");
// mongoose
const mongooseInit = () => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        connectTimeoutMS: 5000,
    };
    process.env.MONGODB_URL && (yield (0, mongoose_1.connect)(process.env.MONGODB_URL, options)
        .catch(error => console.error(error)));
});
// configuration init
const globalInit = () => __awaiter(void 0, void 0, void 0, function* () {
    // dotenv
    dotenv_1.default.config();
    // app
    const app = (0, express_1.default)();
    const port = process.env.PORT;
    // cors
    const allowedOrigins = ["http://localhost:5173", "http://localhost:5510"];
    const corsOptions = {
        allowedHeaders: [
            "Origin",
            "X-Requested-With",
            "Content-Type",
            "Accept",
            "X-Access-Token",
        ],
        credentials: true,
        methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
        origin: (origin, callback) => {
            if (!origin)
                return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                let msg = "The CORS policy for this site doesn not allow access from the specific Origin";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        preflightContinue: false,
    };
    yield Promise.all([mongooseInit(), index_1.Kanban.initializeKanbanDataOnServerStart(), KanbanProject_1.KanbanProject.initialKanbanProjectOnStart()]).catch((err) => console.error(`Mongoose database init error: ${err}`));
    return { app, port, corsOptions };
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const { app, port, corsOptions } = yield globalInit();
    // swagger
    app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swagger_json_1.default));
    // cors settings
    app.use(cors.default(corsOptions));
    // body-parser
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    app.use(body_parser_1.default.json());
    // default router
    app.use('/api', routes_1.defaultRouter);
    // listen to port
    app.listen(port, () => {
        console.log(`⚡️  [server] ${(0, datetime_1.getCurrentDateTime)()}: Server is running at http://localhost:${port}`);
    });
});
exports.main = main;
