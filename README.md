# Gestor de Tareas (KanbanFlow)

Aplicación frontend simple tipo tablero Kanban construida con **React + Vite** que funciona 100% en el navegador (sin backend) y persiste datos usando `localStorage`.

## Características
- Creación y selección de proyectos.
- Columnas por defecto: Pendiente, En Proceso, Completado.
- Columna especial **Constructor** para crear nuevas columnas y tareas iniciales.
- Drag & Drop de tareas entre columnas (dnd-kit).
- Reordenar columnas (drag & drop) con *handle* dedicado.
- Crear, editar (inline) y eliminar tareas.
- Crear y eliminar columnas (tareas se mueven a Constructor al borrar una columna).
- Colores automáticos y distintivos en tarjetas con barra superior.
- Persistencia en `localStorage` (refrescas y se mantiene el estado).
- UI en español, tipografías personalizadas (Poppins, Nunito, Lato, Inter).

## Tecnologías
- **React 18**
- **Vite** (desarrollo rápido)
- **dnd-kit** (drag & drop de columnas y tarjetas)
- **uuid** (IDs únicos)
- CSS plano (sin frameworks pesados)

## Estructura Principal
```
/src
  App.jsx                # Entrada de la app (vista proyectos / tablero)
  /components            # Componentes UI (Board, Column, TaskCard, ProjectList)
  /hooks                 # Lógica de estado (useProjects, useBoard, useLocalStorage)
  /styles.css            # Estilos globales
/.github/copilot-instructions.md  # Guía interna (ignorada en git)
```

## Instalación y Ejecución
1. Clonar el repositorio:
   ```bash
   git clone <url-del-repo>
   cd Gestor-de-Tareas
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Ejecutar entorno de desarrollo:
   ```bash
   npm run dev
   ```
4. Abrir la URL que indica Vite (usualmente `http://localhost:5173`).

## Uso Básico
1. Crear un proyecto en la vista inicial.
2. Entrar al proyecto para ver el tablero.
3. En **Constructor**: agregar nuevas columnas y tareas iniciales.
4. Arrastrar tareas a la columna deseada.
5. Reordenar columnas usando el botón ⇅.
6. Editar una tarea con el botón "Editar" (se abre formulario inline).
7. Eliminar tarea con "Borrar".
8. Eliminar columna con "X" (sus tareas regresan a Constructor).

## Personalización
- Colores de tarjetas: definidos en `styles.css` (sección de `.task-card.color-*`).
- Fuentes: importadas vía Google Fonts al inicio de `styles.css`.
- Lógica de asignación de color: hash sobre `task.id` en `TaskCard.jsx`.
- Puedes permitir color manual añadiendo un campo `color` a la tarea y respetándolo si existe.

## Persistencia
Los datos se guardan bajo la clave `kanbanflow-projects` en `localStorage`. Para reiniciar el estado, borra esa clave desde las herramientas del navegador o limpia todo el almacenamiento.

## Archivo de Instrucciones Internas
`.github/copilot-instructions.md` contiene guía para asistentes (IA / colaboradores). Actualmente está en `.gitignore`; si quieres compartirlo solo quita esa línea del `.gitignore`.

## Próximas Mejores (Ideas)
- Filtros / buscador de tareas.
- Asignar miembros (ya existe estructura `assignees`).
- Modo oscuro.
- Selección manual de color / etiquetas.
- Reordenar tareas dentro de la misma columna (sortable list).
- Exportar / importar proyectos (JSON).

## Notas
- No hay backend: ideal para demostraciones y prácticas.
- Si agregas TypeScript, crea `tsconfig.json` y ajusta extensiones.
- Para producción, genera build:
  ```bash
  npm run build
  ```
  Salida en `dist/`.

## Licencia
Decide la licencia (MIT recomendada). Crea un archivo `LICENSE` si la defines.

---
¡Listo! Modifica este README según evolucione el proyecto.
