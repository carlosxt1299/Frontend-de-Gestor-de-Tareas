import { v4 as uuid } from 'uuid';

export function useBoard(project, updateProject) {
  const columns = project.columns;
  const tasks = project.tasks;

  const createTask = (columnId, title, description, assignees=[]) => {
    updateProject(project.id, p => ({
      ...p,
      tasks: [...p.tasks, { id: uuid(), title, description, assignees, columnId, projectId: p.id }]
    }));
  };

  const moveTask = (taskId, targetColumnId) => {
    updateProject(project.id, p => ({
      ...p,
      tasks: p.tasks.map(t => t.id === taskId ? { ...t, columnId: targetColumnId } : t)
    }));
  };

  const updateTask = (taskId, fields) => {
    updateProject(project.id, p => ({
      ...p,
      tasks: p.tasks.map(t => t.id === taskId ? { ...t, ...fields } : t)
    }));
  };
  const deleteTask = (taskId) => {
    updateProject(project.id, p => ({
      ...p,
      tasks: p.tasks.filter(t => t.id !== taskId)
    }));
  };
  return { columns, tasks, createTask, moveTask, updateTask, deleteTask };
}
