const Actions = require("./actions-model.js");
const Projects = require("../projects/projects-model.js");

async function checkActionId(req, res, next) {
  try {
    const action = await Actions.get(req.params.id);
    if (action) {
      req.action = action;
      next();
    } else {
      next({ status: 404, message: `Action ${req.params.id} not found` });
    }
  } catch (err) {
    next(err);
  }
}

function checkNewAction(req, res, next) {
  const { project_id, description, notes } = req.body;
  if (project_id && description && notes) {
    next();
  } else {
    res.status(400).json({ message: "Missing required fields" });
  }
}

async function validateProjectId(req, res, next) {
  try {
    const project = await Projects.get(req.body.project_id);
    if (project) {
      next();
    } else {
      res.status(400).json({ message: "Invalid project_id" });
    }
  } catch (err) {
    next(err);
  }
}

function editAction(req, res, next) {
  const { description, notes, completed } = req.body;
  if (description && notes && typeof completed === "boolean") {
    next();
  } else {
    res
      .status(400)
      .json({ message: "Missing required fields for the action." });
  }
}

module.exports = {
  checkActionId,
  checkNewAction,
  editAction,
  validateProjectId,
};
