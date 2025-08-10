import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';

export default function TaskCard({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: task.id, data: { taskId: task.id, type: 'task' }, disabled: editing });
  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.5 : 1
  };

  // Determinar color consistente según id (sin necesidad de almacenarlo en el modelo)
  const palette = ['yellow','green','orange','red','blue','purple'];
  let hash = 0; for (let i=0;i<task.id.length;i++){ hash = (hash + task.id.charCodeAt(i)*(i+1)) % 997; }
  const colorKey = palette[hash % palette.length];

  // editing state declared above
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.description || '');

  const save = (e) => {
    e?.preventDefault();
    if (onUpdate) onUpdate(task.id, { title: title.trim() || task.title, description: desc });
    setEditing(false);
  };

  return (
    <div className={`task-card color-${colorKey} ${editing ? 'is-editing' : ''}`} ref={setNodeRef} style={style}>
      <div className={`task-color-bar color-${colorKey}`}></div>
      {!editing && (
        <button type="button" className="task-drag-handle" aria-label="Mover tarea" {...listeners} {...attributes}>
          <span className="dots" aria-hidden="true">⋮⋮</span>
        </button>
      )}
      {!editing && (
        <>
          <strong>{task.title}</strong>
          {task.description && <p>{task.description}</p>}
          {task.assignees?.length > 0 && (
            <div className="assignees">{task.assignees.map(u=> <span key={u.id}>{u.name}</span>)}</div>
          )}
          <div style={{display:'flex', gap:'.4rem', marginTop:'.4rem'}}>
            <button type="button" className="btn-small" style={{padding:'4px 8px'}} onClick={()=> setEditing(true)}>Editar</button>
            {onDelete && <button type="button" className="btn-small" style={{padding:'4px 8px', background:'#ff6b6b', border:'1px solid #fa5252'}} onClick={()=> { if(confirm('¿Eliminar tarea?')) onDelete(); }}>Borrar</button>}
          </div>
        </>
      )}
      {editing && (
        <form onSubmit={save} className="task-edit-form" style={{marginTop:'0.2rem'}}>
          <input value={title} onChange={e=>setTitle(e.target.value)} autoFocus />
            <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Descripción" />
            <div className="task-edit-actions">
              <button type="submit" className="btn-small">Guardar</button>
              <button type="button" className="btn-small" onClick={()=> { setEditing(false); setTitle(task.title); setDesc(task.description||''); }}>Cancelar</button>
            </div>
        </form>
      )}
    </div>
  );
}
