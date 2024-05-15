import avatar_routes from "./Avatar/avatarRoutes";
import bookmark_routes from "./Bookmark/bookmarkroutes";
import category_routes from "./Category/categoryRoutes";
import comments_routes from "./Comments/commentsRoutes";
import message_routes from "./Message/messageRoutes";
import notification_routes from "./Notification/notificationRoutes";
import platform_routes from "./Platform/platformRoutes";
import reaction_routes from "./Reaction/ReactionRoutes";
import sosmed_account_routes from "./SosmedAccount/sosmedAccountRoutes";
import story_routes from "./Story/storyRoutes";
import users_routes from "./Users/usersRoutes";
import storyTag_routes from "./StoryTag/storyTagRoutes";
import tag_routes from "./Tag/tagRoutes";
import reStory_routes from "./ReStory/reStoryRoutes";
import following_routes from "./Following/followingRoutes";
import like_routes from "./Like/likeRoutes";
import image_upload_routes from "./ImageUpload/imageUploadRoutes";

const routes = [
  users_routes,
  avatar_routes,
  platform_routes,
  sosmed_account_routes,
  story_routes,
  category_routes,
  comments_routes,
  reaction_routes,
  bookmark_routes,
  message_routes,
  notification_routes,
  storyTag_routes,
  tag_routes,
  reStory_routes,
  following_routes,
  like_routes,
  image_upload_routes,
];

const router = (app) => {
  routes.forEach((route) => {
    app.use("/api_v1", route);
  });
};

export default router;
