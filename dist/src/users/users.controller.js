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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const createUserDto_1 = require("./dto/createUserDto");
const mongoose_1 = require("mongoose");
let UsersController = class UsersController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    createUser({ username, ...createUserDto }) {
        return this.userService.createUser({ username, ...createUserDto });
    }
    getUser(username) {
        const user = this.userService.getUser(username);
        return user;
    }
    geAlltUsers() {
        const user = this.userService.getAllUsers();
        return user;
    }
    async getUserById(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('User not found');
        }
        const user = await this.userService.getUserById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUserDto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('username/:username'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "geAlltUsers", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map