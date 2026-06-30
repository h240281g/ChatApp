"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const messageSchema_1 = require("./schema/messageSchema");
const mongoose_2 = require("mongoose");
const userSchema_1 = require("../users/schema/userSchema");
let MessageService = class MessageService {
    messageModel;
    userModel;
    constructor(messageModel, userModel) {
        this.messageModel = messageModel;
        this.userModel = userModel;
    }
    async createMsg(senderID, createMsgDto) {
        await this.validateObjectIDSR(senderID, createMsgDto.receiverID);
        const newMsg = new this.messageModel({
            senderID,
            ...createMsgDto,
        });
        return await newMsg.save();
    }
    async getUserById(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('Incorrect Format:  Verify User or Receiver ObjectIDs');
        }
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('User Not Found:  Verify User or Receiver ObjectIDs');
        }
        return `correct & exists: true`;
    }
    async getMessages(senderID, receiverID) {
        await this.validateObjectIDSR(senderID, receiverID);
        return await this.messageModel
            .find({
            $or: [
                { senderID, receiverID },
                { receiverID, senderID },
            ],
        })
            .select('messageBody createdAt -_id')
            .sort({ createdAt: 1 });
    }
    async validateObjectIDSR(senderID, receiverID) {
        const sender = await this.getUserById(senderID);
        if (!sender) {
            throw new common_1.NotFoundException('Sender not found');
        }
        const receiver = await this.getUserById(receiverID);
        if (!receiver) {
            throw new common_1.NotFoundException('Receiver not found');
        }
        return `All Validations Done on Sender and Receiver`;
    }
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(messageSchema_1.Message.name)),
    __param(1, (0, mongoose_1.InjectModel)(userSchema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], MessageService);
//# sourceMappingURL=message.service.js.map