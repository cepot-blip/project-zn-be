import { Prisma, PrismaClient } from "@prisma/client";

export const UsersModels = new PrismaClient().users;

export const avatarModel = new PrismaClient().avatar;
export const sosmedAccountModel = new PrismaClient().sosmed_account;
export const platformModel = new PrismaClient().platform;

export const StoryModels = new PrismaClient().story;
export const CategoryModels = new PrismaClient().category;
export const CommentModels = new PrismaClient().comment;

export const ReactionModel = new PrismaClient().reaction;
export const BookmarkModel = new PrismaClient().bookmark;
export const MessageModel = new PrismaClient().message;
export const NotificationModel = new PrismaClient().notification;

export const tagModels = new PrismaClient().tag;
export const storyTagModels = new PrismaClient().story_tag;
export const ReStoryModels = new PrismaClient().reStory;
export const followingModels = new PrismaClient().following;
export const likeModels = new PrismaClient().like;
