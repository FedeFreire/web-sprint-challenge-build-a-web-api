const express = require("express");
const {
  checkProjectId,
  checkNewProject,
  editProject,
} = require("./projects-middleware.js");
const Projects = require("./projects-model.js");

const projectsRouter = express.Router();

projectsRouter.get("/", (req, res, next) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch(next);
});

projectsRouter.get("/:id", checkProjectId, (req, res, next) => {
  res.json(req.project);
});

projectsRouter.post("/", checkNewProject, (req, res, next) => {
  Projects.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch(next);
});

projectsRouter.delete("/:id", checkProjectId, (req, res, next) => {
  Projects.remove(req.params.id)
    .then((deletedProject) => {
      res.status(200).json(deletedProject);
    })
    .catch(next);
});

projectsRouter.put("/:id", [checkProjectId, editProject], (req, res, next) => {
  Projects.update(req.params.id, req.body)
    .then((updatedProject) => {
      res.status(200).json(updatedProject);
    })
    .catch(next);
});

projectsRouter.get("/:id/actions", checkProjectId, (req, res, next) => {
  Projects.getProjectActions(req.params.id)
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch(next);
});

projectsRouter.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "Something tragic inside the Projects router!",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = projectsRouter;
// Write your "projects" router here!
