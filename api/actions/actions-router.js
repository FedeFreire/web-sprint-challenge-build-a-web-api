const express = require("express");
const Actions = require("./actions-model.js");
const {
  checkActionId,
  checkNewAction,
  editAction,
  validateProjectId,
} = require("./actions-middlware.js");

const actionsRouter = express.Router();

actionsRouter.get("/", (req, res, next) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(next);
});

actionsRouter.get("/:id", checkActionId, (req, res, next) => {
  res.json(req.action);
});

actionsRouter.post(
  "/",
  [checkNewAction, validateProjectId],
  (req, res, next) => {
    Actions.insert(req.body)
      .then((action) => {
        res.status(201).json(action);
      })
      .catch(next);
  }
);

actionsRouter.delete("/:id", checkActionId, (req, res, next) => {
  Actions.remove(req.params.id)
    .then((deletedAction) => {
      res.status(200).json(deletedAction);
    })
    .catch(next);
});

actionsRouter.put("/:id", [checkActionId, editAction], (req, res, next) => {
  Actions.update(req.params.id, req.body)
    .then(() => Actions.get(req.params.id))
    .then((updatedAction) => {
      res.status(200).json(updatedAction);
    })
    .catch(next);
});

actionsRouter.get("/:id/actions", checkActionId, (req, res, next) => {
  Actions.getActionsActions(req.params.id)
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch(next);
});

actionsRouter.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "Something tragic inside the Actions router!",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = actionsRouter;
// Write your "actions" router here!
