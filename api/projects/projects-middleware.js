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
  const { name } = req.body;
  if (name !== undefined && typeof name === "string" && name.length && name.trim()) {
    next();
  } else {
   next({ status: 422, message: "please provide a name for the hub" });
  }
}

module.exports = {
    checkProjectId,
    checkNewProject,
};
