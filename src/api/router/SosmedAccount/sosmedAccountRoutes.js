import express from "express";
import { catchAsync } from "../../../utils";
import createSosmedAccount from "../../controllers/SosmedAccount/createSosmedAccount";
import { authCheck } from "../../middlewares/authGuard";
import getSosmedAccounts from "../../controllers/SosmedAccount/getSosmedAccounts";
import getSosmedAccountById from "../../controllers/SosmedAccount/getSosmedAccountById";
import updateSosmedAccountById from "../../controllers/SosmedAccount/updateSosmedAccountById";
import deleteSosmedAccountById from "../../controllers/SosmedAccount/deleteSosmedAccountById";

const sosmed_account_routes = express.Router();

sosmed_account_routes.post(
  "/sosmed-accounts",
  authCheck,
  catchAsync(createSosmedAccount)
);
sosmed_account_routes.get(
  "/sosmed-accounts",
  authCheck,
  catchAsync(getSosmedAccounts)
);
sosmed_account_routes.get(
  "/sosmed-accounts/:id",
  authCheck,
  catchAsync(getSosmedAccountById)
);
sosmed_account_routes.put(
  "/sosmed-accounts/:id",
  authCheck,
  catchAsync(updateSosmedAccountById)
);
sosmed_account_routes.delete(
  "/sosmed-accounts/:id",
  authCheck,
  catchAsync(deleteSosmedAccountById)
);

export default sosmed_account_routes;
