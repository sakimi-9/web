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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const tags_entity_1 = require("./entities/tags.entity");
let UserService = class UserService {
    constructor(userRepository, tagRepository) {
        this.userRepository = userRepository;
        this.tagRepository = tagRepository;
    }
    async create(createUserDto) {
        const user = this.userRepository.create(createUserDto);
        await this.userRepository.save(user);
        return { message: '创建成功', data: user };
    }
    async findAll(query) {
        const [data, total] = await this.userRepository.findAndCount({
            relations: ['tags'],
            where: {
                name: (0, typeorm_1.Like)(`%${query.keyWord}%`),
            },
            order: {
                id: 'DESC',
            },
            skip: (query.page - 1) * query.pageSize,
            take: query.pageSize,
        });
        return {
            data,
            total,
            page: query.page,
            pageSize: query.pageSize,
        };
    }
    async update(id, updateUserDto) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`ID为${id}的用户不存在`);
        }
        await this.userRepository.update(id, updateUserDto);
        return { message: '更新成功' };
    }
    async remove(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['tags']
        });
        if (!user) {
            throw new common_1.NotFoundException(`ID为${id}的用户不存在`);
        }
        if (user.tags && user.tags.length > 0) {
            await this.tagRepository.remove(user.tags);
        }
        await this.userRepository.remove(user);
        return { message: '删除成功' };
    }
    async addTags(params) {
        const userInfo = await this.userRepository.findOne({
            where: { id: params.userId },
            relations: ['tags']
        });
        if (!userInfo) {
            throw new common_1.NotFoundException(`ID为${params.userId}的用户不存在`);
        }
        const existingTags = userInfo.tags || [];
        const existingTagValues = existingTags.map(tag => tag.tags);
        const tagList = [];
        for (const tagValue of params.tags) {
            if (!existingTagValues.includes(tagValue)) {
                let tag = new tags_entity_1.Tags();
                tag.tags = tagValue;
                tag.user = userInfo;
                await this.tagRepository.save(tag);
                tagList.push(tag);
            }
        }
        if (tagList.length === 0) {
            return {
                message: '没有新标签被添加，标签可能已存在',
                data: {
                    id: userInfo.id,
                    name: userInfo.name,
                    desc: userInfo.desc,
                    tags: existingTags.map(tag => ({
                        id: tag.id,
                        tags: tag.tags
                    }))
                }
            };
        }
        return {
            message: '标签添加成功',
            data: {
                id: userInfo.id,
                name: userInfo.name,
                desc: userInfo.desc,
                tags: [...existingTags, ...tagList].map(tag => ({
                    id: tag.id,
                    tags: tag.tags
                }))
            }
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_2.InjectRepository)(tags_entity_1.Tags)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map