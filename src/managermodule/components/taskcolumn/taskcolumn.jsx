import { useDroppable } from "@dnd-kit/core";
import TaskCard from '../taskcard/taskcard'

const Column = ({ status, tasks }) => {
  const { setNodeRef } = useDroppable({
     id: status,
    data: {
      type: "COLUMN",
      status,
    },
  });

  return (
    <div ref={setNodeRef} className="column">
      <h3>{status}</h3>

      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};
export default Column;