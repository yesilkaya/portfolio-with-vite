// src/routes/api-routes.ts
import { Router, json } from "express";
import { requireAdmin, forbidAdminOnPost } from "../middlewares/admin.js";
import * as contactController from "../controllers/contact.controller.js";
import { validatePost, validatePut, validateDelete } from "../middlewares/validate-body.js";

const apiRouter = Router();
apiRouter.use(json());

// GET → admin korumalı
apiRouter.get("/contacts", requireAdmin({ challenge: true }), contactController.getContacts);

// POST → validation middleware, admin zorunlu değil
apiRouter.post("/contacts", forbidAdminOnPost(), validatePost, contactController.createContact);

// PUT → validation middleware, admin korumalı
apiRouter.put("/contacts/:id", requireAdmin({ challenge: true }), validatePut, contactController.updateContact);

// DELETE → admin korumalı
apiRouter.delete("/contacts/:id", requireAdmin({ challenge: true }), validateDelete, contactController.deleteContact);

apiRouter.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint bulunamadıqwd",
  });
});

export default apiRouter;
