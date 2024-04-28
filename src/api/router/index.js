import avatar_routes from "./Avatar/avatarRoutes";
import category_routes from "./Category/categoryRoutes";
import comments_routes from "./Comments/commentsRoutes";
import story_routes from "./Story/storyRoutes";
import users_routes from "./Users/usersRoutes";

const routes = [
  users_routes,
  avatar_routes,
  story_routes,
  category_routes,
  comments_routes,
];

const router = (app) => {
  routes.forEach((route) => {
    app.use("/api_v1", route);
  });
};

export default router;
