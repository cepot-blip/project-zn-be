export const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

export const destImageLink = (path) => {
  return path.split("\\").slice(-2).join("/");
};
