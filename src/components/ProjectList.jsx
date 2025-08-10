import React, { useState } from 'react';

export default function ProjectList({ projects, onCreate, onOpen }) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate(name.trim());
    setName('');
    setShowForm(false);
  };

  return (
    <div className="project-list">
      <div className="list-header">
        <h2>Proyectos</h2>
        <button onClick={() => setShowForm(s=>!s)}>Nuevo Proyecto</button>
      </div>
      {showForm && (
        <form onSubmit={submit} className="inline-form">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nombre" />
          <button type="submit">Crear</button>
        </form>
      )}
      <ul>
        {projects.map(p => (
          <li key={p.id} className="project-item" onClick={() => onOpen(p.id)}>
            <strong>{p.name}</strong> <small>({p.columns.length} columnas / {p.tasks.length} tareas)</small>
          </li>
        ))}
        {projects.length === 0 && <li>No hay proyectos todavía.</li>}
      </ul>
    </div>
  );
}
