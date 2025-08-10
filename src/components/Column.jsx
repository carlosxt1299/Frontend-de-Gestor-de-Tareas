import React, { useState } from 'react';
import TaskCard from './TaskCard.jsx';
import { useDroppable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function Column({ column, tasks, createTask, updateTask, deleteTask, onDeleteColumn }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const { setNodeRef: droppableRef } = useDroppable({ id: column.id, data: { columnId: column.id, type:'column' } });
  const { setNodeRef: sortableRef, attributes, listeners, transform, transition, isDragging } = useSortable({ id: column.id, data:{ columnId: column.id, type:'column' } });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1
  };

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
  createTask(title.trim(), desc.trim(), []);
    setTitle('');
    setDesc('');
    setShowForm(false);
  };

  return (
  <div className="column" ref={(el)=>{ sortableRef(el); droppableRef(el); }} style={style}>
      <div className="column-header">
        <h3>{column.name}</h3>
        <div style={{display:'flex', gap:'.35rem', alignItems:'center'}}>
          <button className="btn-small" onClick={()=> setShowForm(s=>!s)}>+ Tarea</button>
          <button type="button" className="btn-small" style={{background:'#ff6b6b', border:'1px solid #fa5252'}} onClick={()=> { if(confirm('¿Eliminar columna?')) onDeleteColumn?.(); }}>X</button>
          <button type="button" className="column-drag-handle" aria-label="Mover columna" {...attributes} {...listeners}>⇅</button>
        </div>
      </div>
      {showForm && (
        <form onSubmit={submit} className="task-form">
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Título" />
          <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Descripción" />
          <div className="row">
            <button type="submit">Crear</button>
            <button type="button" onClick={()=>setShowForm(false)}>Cancelar</button>
          </div>
        </form>
      )}
      <div className="tasks">
  {tasks.map(t => <TaskCard key={t.id} task={t} onUpdate={updateTask} onDelete={()=> deleteTask(t.id)} />)}
        {tasks.length === 0 && <div className="empty">Sin tareas</div>}
      </div>
    </div>
  );
}
