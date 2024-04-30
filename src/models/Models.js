import { Prisma, PrismaClient } from "@prisma/client";

export const UsersModels = new PrismaClient().users;

export const avatarModel = new PrismaClient().avatar;
export const sosmedAccountModel = new PrismaClient().sosmed_account;
export const platformModel = new PrismaClient().platform;

export const StoryModels = new PrismaClient().story;
export const CategoryModels = new PrismaClient().category;
export const CommentModels = new PrismaClient().comment;
