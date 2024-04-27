import { Prisma, PrismaClient } from "@prisma/client";

export const UsersModels = new PrismaClient().users;
export const StoryModels = new PrismaClient().story;
export const CategoryModels = new PrismaClient().category;
export const CommentModels = new PrismaClient().comment;
