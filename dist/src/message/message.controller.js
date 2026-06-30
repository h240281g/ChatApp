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
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const createMessage_dto_1 = require("./dto/createMessage.dto");
const message_service_1 = require("./message.service");
let MessageController = class MessageController {
    messageService;
    constructor(messageService) {
        this.messageService = messageService;
    }
    async createMsg(senderID, createMsgDto) {
        this.messageService.validateObjectIDSR(senderID, createMsgDto.receiverID);
        return this.messageService.createMsg(senderID, createMsgDto);
    }
    async getMessages({ senderID, receiverID }) {
        this.messageService.validateObjectIDSR(senderID, receiverID);
        return this.messageService.getMessages(senderID, receiverID);
    }
};
exports.MessageController = MessageController;
__decorate([
    (0, common_1.Post)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createMessage_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "createMsg", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getMessages", null);
exports.MessageController = MessageController = __decorate([
    (0, common_1.Controller)('message'),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], MessageController);
//# sourceMappingURL=message.controller.js.map