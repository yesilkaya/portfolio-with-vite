// src/routes/api-routes.ts
import { Router, json } from "express";
import { requireAdmin } from "../auth/basic.js";
import * as contactController from "../controllers/contact.controller.js";
import { validatePost, validatePut, validateDelete } from "../middlewares/validate-body.js";
const apiRouter = Router();
apiRouter.use(json());
// GET → admin korumalı
apiRouter.get("/contacts", requireAdmin({ challenge: true }), contactController.getContacts);
// POST → validation middleware, admin zorunlu değil
apiRouter.post("/contacts", validatePost, contactController.createContact);
// PUT → validation middleware, admin zorunlu değil
apiRouter.put("/contacts/:id", requireAdmin({ challenge: true }), validatePut, contactController.updateContact);
// DELETE → admin korumalı
apiRouter.delete("/contacts/:id", requireAdmin({ challenge: true }), validateDelete, contactController.deleteContact);
export default apiRouter;
//# sourceMappingURL=api-routes.js.map