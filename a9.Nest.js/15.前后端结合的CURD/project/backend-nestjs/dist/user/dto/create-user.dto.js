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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '用户名称', example: '张三' }),
    (0, class_validator_1.IsNotEmpty)({ message: '名称不能为空' }),
    (0, class_validator_1.IsString)({ message: '名称必须是字符串' }),
    (0, class_validator_1.Length)(2, 20, { message: '名称长度必须在2-20个字符之间' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '用户描述', example: '这是一个用户描述' }),
    (0, class_validator_1.IsNotEmpty)({ message: '描述不能为空' }),
    (0, class_validator_1.IsString)({ message: '描述必须是字符串' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "desc", void 0);
//# sourceMappingURL=create-user.dto.js.map