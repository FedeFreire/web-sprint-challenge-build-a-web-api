const Projects = require("./projects-model.js");

async function checkProjectId(req, res, next) {
    try {
      const project = await Projects.get(req.params.id);
      if (project) {
        req.project = project;
        next();
      } else {
        next({ status: 404, message: `Project ${req.params.id} not found` });
      }
    } catch (err) {
      next(err);
    }
  }
  

  function checkNewProject(req, res, next) {
    const { name, description } = req.body;
      if (name && typeof name === "string" && name.trim() &&
        description && typeof description === "string" && description.trim()) {
      next();
    } else {
      next({ status: 400, message: "Please provide both a name and a description for the project." });
    }
  }
  
  function editProject(req, res, next) {
    const { name, description , completed } = req.body;
      if (name && typeof name === "string" && name.trim() &&
        description && typeof description === "string" && description.trim() && completed !== undefined) {
      next();
    } else {
      next({ status: 400, message: "Please provide both a name and a description for the project." });
    }
  }

module.exports = {
    checkProjectId,
    checkNewProject,
    editProject,
};
