"use strict";
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
exports.uploadMiddleware = exports.getStatus = exports.uploadFile = void 0;
const multer_1 = __importDefault(require("multer"));
const import_service_1 = __importDefault(require("../services/import.service"));
const upload = (0, multer_1.default)({ dest: 'uploads/' });
const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file)
        return res.status(400).send('No file uploaded');
    try {
        const result = yield import_service_1.default.processFile(req.file.path);
        res.json({ message: 'Data imported successfully', result });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error inserting data' });
    }
});
exports.uploadFile = uploadFile;
const getStatus = (req, res) => {
    res.send('✅ API is running...');
};
exports.getStatus = getStatus;
exports.uploadMiddleware = upload.single('file'); // Middleware for file upload
