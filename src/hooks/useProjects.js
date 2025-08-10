import { useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import { useLocalStorage } from './useLocalStorage.js';

const DEFAULT_COLUMNS = ["Pendiente", "En Proceso", "Completado"];

export function useProjects() {
  const [state, setState] = useLocalStorage('kanbanflow-projects', {
    projects: [],
    selectedProjectId: null,
  });

  const createProject = (name) => {
    setState(s => ({
      ...s,
      projects: [...s.projects, {
        id: uuid(),
        name,
        columns: DEFAULT_COLUMNS.map(c => ({ id: uuid(), name: c })),
        tasks: [],
        members: [ { id: 'u1', name: 'Ana'}, { id: 'u2', name: 'Luis'} ],
      }]
    }));
  };

  const updateProject = (projectId, updater) => {
    setState(s => ({
      ...s,
      projects: s.projects.map(p => p.id === projectId ? updater(p) : p)
    }));
  };

  const addColumnToProject = (projectId, columnName) => {
    updateProject(projectId, p => ({
      ...p,
      columns: [...p.columns, { id: uuid(), name: columnName }]
    }));
  };

  const removeColumnFromProject = (projectId, columnId) => {
    updateProject(projectId, p => ({
      ...p,
      columns: p.columns.filter(c=>c.id!==columnId),
      tasks: p.tasks.map(t => t.columnId === columnId ? { ...t, columnId: 'BUILDER' } : t)
    }));
  };

  const selectProjectId = (id) => setState(s=> ({...s, selectedProjectId: id}));

  const selectedProject = useMemo(() => state.projects.find(p=>p.id===state.selectedProjectId) || null, [state.projects, state.selectedProjectId]);

  return { projects: state.projects, createProject, updateProject, addColumnToProject, removeColumnFromProject, selectProjectId, selectedProject };
}
