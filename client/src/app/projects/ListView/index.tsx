import Loading from "@/src/components/Loading";
import Header from "../../../components/Header";
import TaskCard from "../../../components/TaskCard";
import { Task, useGetTasksQuery } from "../../../state/api";
import React from "react";
import ErrorDisplay from "@/src/components/ErrorDisplay";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const ListView = ({ id, setIsModalNewTaskOpen }: Props) => {
  const {
    data: tasks,
    error,
    isLoading,
    refetch
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) return <Loading variant="pulse" text="Loading tasks..." size="md" />;
  if (error) return (
    <ErrorDisplay 
      message="Failed to load tasks. Please check your connection and try again."
      onRetry={() => refetch()}
      size="md"
    />
  )
  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="List"
          buttonComponent={
            <button
              className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              Add Task
            </button>
          }
          isSmallText
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {tasks?.map((task: Task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  );
};

export default ListView;