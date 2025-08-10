import React, { useState, useMemo } from 'react';
import Column from './Column.jsx';
import TaskCard from './TaskCard.jsx';
import { DndContext, closestCenter, useDroppable } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useBoard } from '../hooks/useBoard.js';

const BUILDER_ID = 'BUILDER';

export default function Board({ project, updateProject, addColumn, removeColumnFromProject }) {
  const { columns, tasks, createTask, moveTask, updateTask, deleteTask } = useBoard(project, updateProject);
  const [newColumnName, setNewColumnName] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');

  const reorderColumns = (activeId, overId) => {
    if (activeId === overId) return;
    const oldIndex = columns.findIndex(c=>c.id===activeId);
    const newIndex = columns.findIndex(c=>c.id===overId);
    if (oldIndex < 0 || newIndex < 0) return;
    const newOrder = arrayMove(columns, oldIndex, newIndex);
    updateProject(project.id, p => ({ ...p, columns: newOrder }));
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;
    if (activeType === 'task') {
      const targetColumnId = over.data.current?.columnId || over.id;
      if (targetColumnId) moveTask(active.id, targetColumnId);
      return;
    }
    if (activeType === 'column' && overType === 'column') {
      reorderColumns(active.id, over.id);
    }
  };

  // Only real columns reorder; builder fixed on left
  const dndItems = useMemo(()=> columns.map(c=>c.id), [columns]);

  const builderTasks = tasks.filter(t=> t.columnId === BUILDER_ID);
  const { setNodeRef: setBuilderRef } = useDroppable({ id: BUILDER_ID, data:{ columnId: BUILDER_ID, type: 'task' } });

  const submitBuilderTask = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    createTask(BUILDER_ID, taskTitle.trim(), taskDesc.trim(), []);
    setTaskTitle('');
    setTaskDesc('');
    setShowTaskForm(false);
  };

  return (
    <div className="board">
      <div className="columns-wrapper">
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <div className="column builder-column" aria-label="Panel de creación" ref={setBuilderRef}>
              <h3>Constructor</h3>
              <form className="stack gap" onSubmit={e=>{e.preventDefault(); if(!newColumnName.trim()) return; addColumn(newColumnName.trim()); setNewColumnName('');}}>
                <input value={newColumnName} onChange={e=>setNewColumnName(e.target.value)} placeholder="Nombre nueva columna" />
                <button type="submit">Crear Columna</button>
              </form>
              <div className="info-box">
                <p>Crea columnas y tareas aquí. Arrastra las tareas a cualquier columna destino.</p>
              </div>
              <div className="builder-task-section">
                <div className="builder-task-header">
                  <h4 style={{margin:'0 0 .4rem'}}>Tareas Nuevas</h4>
                  {!showTaskForm && <button className="btn-small" onClick={()=> setShowTaskForm(true)}>Crear Tarea</button>}
                </div>
                {showTaskForm && (
                  <form onSubmit={submitBuilderTask} className="task-form" style={{marginBottom:'.6rem'}}>
                    <input value={taskTitle} onChange={e=>setTaskTitle(e.target.value)} placeholder="Título" />
                    <textarea value={taskDesc} onChange={e=>setTaskDesc(e.target.value)} placeholder="Descripción" />
                    <div className="row">
                      <button type="submit">Guardar</button>
                      <button type="button" onClick={()=> setShowTaskForm(false)}>Cancelar</button>
                    </div>
                  </form>
                )}
                <div className="tasks builder-tasks-list">
                  {builderTasks.map(t => (
                    <TaskCard key={t.id} task={t} onUpdate={updateTask} />
                  ))}
                  {builderTasks.length === 0 && <div className="empty">Sin tareas en constructor</div>}
                </div>
              </div>
            </div>
          <SortableContext items={dndItems} strategy={horizontalListSortingStrategy}>
              {columns.map(col => (
                <Column
                  key={col.id}
                  column={col}
                  tasks={tasks.filter(t=>t.columnId===col.id)}
                  createTask={(title, desc, assignees)=> createTask(col.id, title, desc, assignees)}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                  onDeleteColumn={()=> removeColumnFromProject(project.id, col.id)}
                />
              ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
