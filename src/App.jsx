import React, { useState } from 'react';
import ProjectList from './components/ProjectList.jsx';
import Board from './components/Board.jsx';
import { useProjects } from './hooks/useProjects.js';

export default function App() {
  const { projects, createProject, updateProject, selectProjectId, selectedProject, addColumnToProject, removeColumnFromProject } = useProjects();
  const [view, setView] = useState('projects');

  const openProject = (id) => {
    selectProjectId(id);
    setView('board');
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 onClick={() => setView('projects')} style={{cursor:'pointer'}}>KanbanFlow</h1>
        {view === 'board' && selectedProject && (
          <button onClick={() => setView('projects')}>Volver a Proyectos</button>
        )}
      </header>
      <main>
        {view === 'projects' && (
          <ProjectList
            projects={projects}
            onCreate={createProject}
            onOpen={openProject}
          />
        )}
        {view === 'board' && selectedProject && (
          <Board
            project={selectedProject}
            updateProject={updateProject}
            addColumn={(name)=> addColumnToProject(selectedProject.id, name)}
            removeColumnFromProject={removeColumnFromProject}
          />
        )}
      </main>
      <footer className="app-footer">Estado en memoria + localStorage. Arrastra tareas para cambiar estado.</footer>
    </div>
  );
}
