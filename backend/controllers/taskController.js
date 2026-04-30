const Task = require('../models/Task');
const Project = require('../models/Project');

exports.createTask = async (req, res) => {
  try {
    const { title, description, project, assignedTo, status, priority, dueDate } = req.body;
    if (!title || !project) return res.status(400).json({ message: 'Title and project required' });

    const task = await Task.create({
      title, description, project, assignedTo, status, priority, dueDate,
      createdBy: req.user.id
    });
    res.status(201).json(task);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getTasks = async (req, res) => {
  try {
    const { project, status, assignedTo } = req.query;
    const filter = {};
    if (project) filter.project = project;
    if (status) filter.status = status;
    if (assignedTo) filter.assignedTo = assignedTo;

    // Members see only their tasks or tasks in their projects
    if (req.user.role !== 'Admin') {
      const myProjects = await Project.find({
        $or: [{ createdBy: req.user.id }, { members: req.user.id }]
      }).select('_id');
      const ids = myProjects.map(p => p._id);
      filter.$or = [{ assignedTo: req.user.id }, { project: { $in: ids } }];
    }

    const tasks = await Task.find(filter)
      .populate('assignedTo', 'name email')
      .populate('project', 'name')
      .populate('createdBy', 'name')
      .sort('-createdAt');
    res.json(tasks);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const filter = req.user.role === 'Admin' ? {} : { assignedTo: req.user.id };
    const total = await Task.countDocuments(filter);
    const pending = await Task.countDocuments({ ...filter, status: 'Pending' });
    const inProgress = await Task.countDocuments({ ...filter, status: 'In Progress' });
    const completed = await Task.countDocuments({ ...filter, status: 'Completed' });
    const overdue = await Task.countDocuments({
      ...filter, dueDate: { $lt: new Date() }, status: { $ne: 'Completed' }
    });
    res.json({ total, pending, inProgress, completed, overdue });
  } catch (err) { res.status(500).json({ message: err.message }); }
};