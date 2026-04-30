const Project = require('../models/Project');
const Task = require('../models/Task');

exports.createProject = async (req, res) => {
  try {
    const { name, description, members } = req.body;
    if (!name) return res.status(400).json({ message: 'Project name required' });

    const project = await Project.create({
      name, description, members: members || [], createdBy: req.user.id
    });
    res.status(201).json(project);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getProjects = async (req, res) => {
  try {
    const filter = req.user.role === 'Admin'
      ? {}
      : { $or: [{ createdBy: req.user.id }, { members: req.user.id }] };

    const projects = await Project.find(filter)
      .populate('members', 'name email role')
      .populate('createdBy', 'name email')
      .sort('-createdAt');
    res.json(projects);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('members', 'name email role')
      .populate('createdBy', 'name email');
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    await Task.deleteMany({ project: req.params.id });
    res.json({ message: 'Project and related tasks deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};