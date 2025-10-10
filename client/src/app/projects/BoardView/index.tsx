import { useGetTasksQuery, useUpdateTaskStatusMutation } from "../../../state/api";
import React, { memo, useCallback, useMemo } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Task as TaskType } from "../../../state/api";
import { EllipsisVertical, MessageSquareMore, Plus } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import Loading from "../../../components/Loading";
import ErrorDisplay from "../../../components/ErrorDisplay";

type BoardProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];

const BoardView = memo(({ id, setIsModalNewTaskOpen }: BoardProps) => {
  const {
    data: tasks,
    isLoading,
    error,
    refetch
  } = useGetTasksQuery(
    { projectId: Number(id) },
    { 
      // Only fetch if id is valid to prevent unnecessary calls
      skip: !id || isNaN(Number(id))
    }
  );
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  // Memoize the move task function to prevent re-creation on each render
  const moveTask = useCallback((taskId: number, toStatus: string) => {
    updateTaskStatus({ taskId, status: toStatus });
  }, [updateTaskStatus]);

  // Memoize tasks grouped by status for better performance
  const tasksByStatus = useMemo(() => {
    if (!tasks) return {};
    return tasks.reduce((acc, task) => {
      if (!acc[task.status || 'To Do']) {
        acc[task.status || 'To Do'] = [];
      }
      acc[task.status || 'To Do'].push(task);
      return acc;
    }, {} as Record<string, TaskType[]>);
  }, [tasks]);

  if (isLoading) return <Loading variant="pulse" text="Loading tasks..." size="md" />;
  if (error) return (
    <ErrorDisplay 
      message="Failed to load tasks. Please check your connection and try again."
      onRetry={() => refetch()}
      size="md"
    />
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div 
        className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4"
        style={{ contain: 'layout style paint' }} // CSS containment for better performance
      >
        {taskStatus.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasksByStatus[status] || []}
            moveTask={moveTask}
            setIsModalNewTaskOpen={setIsModalNewTaskOpen}
          />
        ))}
      </div>
    </DndProvider>
  );
});

BoardView.displayName = 'BoardView';

type TaskColumnProps = {
  status: string;
  tasks: TaskType[];
  moveTask: (taskId: number, toStatus: string) => void;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const TaskColumn = memo(({
  status,
  tasks,
  moveTask,
  setIsModalNewTaskOpen,
}: TaskColumnProps) => {
  // Memoize the drop handler to prevent recreation
  const handleDrop = useCallback((item: { id: number }) => {
    moveTask(item.id, status);
  }, [moveTask, status]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: handleDrop,
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [handleDrop]);

  // Tasks are already filtered by status from parent component
  const tasksCount = tasks.length;

  const statusColor: any = {
    "To Do": "#2563EB",
    "Work In Progress": "#059669",
    "Under Review": "#D97706",
    Completed: "#FFC0CB",
  };

  return (
    <div
      ref={(instance) => {
        drop(instance);
      }}
      className={`sl:py-4 rounded-lg py-2 xl:px-2 transition-all duration-200 ${
        isOver ? "bg-blue-100 dark:bg-blue-900/20 ring-2 ring-blue-300 dark:ring-blue-600" : ""
      }`}
      style={{
        willChange: 'background-color, box-shadow',
      }}
    >
      <div className="mb-3 flex w-full">
        <div
          className={`w-2 !bg-[${statusColor[status]}] rounded-s-lg`}
          style={{ backgroundColor: statusColor[status] }}
        />
        <div className="flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-gray-800">
          <h3 className="flex items-center text-lg font-semibold text-gray-800 dark:text-white">
            {status}{" "}
            <span
              className="ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none text-gray-700 dark:bg-gray-700 dark:text-gray-200"
              style={{ width: "1.5rem", height: "1.5rem" }}
            >
              {tasksCount}
            </span>
          </h3>
          <div className="flex items-center gap-1">
            <button className="flex h-6 w-5 items-center justify-center text-gray-500 dark:text-gray-400">
              <EllipsisVertical size={26} />
            </button>
            <button
              className="flex h-6 w-6 items-center justify-center rounded bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
});

TaskColumn.displayName = 'TaskColumn';

type TaskProps = {
  task: TaskType;
};

const Task = memo(({ task }: TaskProps) => {
  // Memoize drag item to prevent recreation
  const dragItem = useMemo(() => ({ id: task.id }), [task.id]);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: dragItem,
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [dragItem]);

  // Memoize heavy computations to prevent recalculation on every render
  const taskTagsSplit = useMemo(() => 
    task.tags ? task.tags.split(",") : [], 
    [task.tags]
  );

  const formattedStartDate = useMemo(() => 
    task.startDate ? format(new Date(task.startDate), "P") : "",
    [task.startDate]
  );
  
  const formattedDueDate = useMemo(() => 
    task.dueDate ? format(new Date(task.dueDate), "P") : "",
    [task.dueDate]
  );

  const numberOfComments = useMemo(() => 
    (task.comments && task.comments.length) || 0,
    [task.comments]
  );

  // Memoized priority tag component
  const PriorityTag = useMemo(() => {
    if (!task.priority) return null;
    return (
      <div
        className={`rounded-full px-2 py-1 text-xs font-semibold ${
          task.priority === "Urgent"
            ? "bg-red-200 text-red-700 dark:bg-red-900 dark:text-red-300"
            : task.priority === "High"
              ? "bg-yellow-200 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
              : task.priority === "Medium"
                ? "bg-green-200 text-green-700 dark:bg-green-900 dark:text-green-300"
                : task.priority === "Low"
                  ? "bg-blue-200 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
        }`}
      >
        {task.priority}
      </div>
    );
  }, [task.priority]);

  return (
    <div
      ref={(instance) => {
        drag(instance);
      }}
      className={`mb-4 rounded-md bg-white shadow dark:bg-gray-800 transition-all duration-150 ${
        isDragging ? "opacity-50 scale-105 rotate-1" : "opacity-100 scale-100 rotate-0"
      }`}
      style={{
        willChange: 'transform, opacity',
        transform: isDragging ? 'translateZ(0)' : undefined, // GPU acceleration
      }}
    >
      {task.attachments && task.attachments.length > 0 ? (
        <Image
          src={`/${task.id % 10 === 0 ? 'i10' : 'i' + (task.id % 10)}.jpg`}
          alt={task.attachments[0]?.fileName || 'Task image'}
          width={400}
          height={200}
          className="h-auto w-full rounded-t-md"
        />
      ) : (
        <Image
          src={`/i${(task.id % 10) + 1}.jpg`}
          alt="Task image"
          width={400}
          height={200}
          className="h-auto w-full rounded-t-md"
        />
      )}
      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {PriorityTag}
            <div className="flex gap-2">
              {taskTagsSplit.map((tag) => (
                <div
                  key={tag}
                  className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                >
                  {" "}
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <button className="flex h-6 w-4 flex-shrink-0 items-center justify-center text-gray-500 dark:text-gray-400">
            <EllipsisVertical size={26} />
          </button>
        </div>

        <div className="my-3 flex justify-between">
          <h4 className="text-md font-bold dark:text-white">{task.title}</h4>
          {typeof task.points === "number" && (
            <div className="text-xs font-semibold dark:text-white">
              {task.points} pts
            </div>
          )}
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400">
          {formattedStartDate && <span>{formattedStartDate} - </span>}
          {formattedDueDate && <span>{formattedDueDate}</span>}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {task.description}
        </p>
        <div className="mt-4 border-t border-gray-200 dark:border-gray-700" />

        {/* Users */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex -space-x-[6px] overflow-hidden">
            {task.assignee && (
              <Image
                key={task.assignee.userId}
                src={`/p${(task.assignee.userId || 1) % 13 === 0 ? 13 : (task.assignee.userId || 1) % 13}.jpeg`}
                alt={task.assignee.username || 'User'}
                width={30}
                height={30}
                className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-gray-800"
              />
            )}
            {task.author && (
              <Image
                key={task.author.userId}
                src={`/p${(task.author.userId || 1) % 13 === 0 ? 13 : (task.author.userId || 1) % 13}.jpeg`}
                alt={task.author.username || 'User'}
                width={30}
                height={30}
                className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-gray-800"
              />
            )}
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <MessageSquareMore size={20} />
            <span className="ml-1 text-sm dark:text-gray-300">
              {numberOfComments}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

Task.displayName = 'Task';

export default BoardView;