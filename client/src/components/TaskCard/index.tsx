import { Task, Status } from "../../state/api";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  return (
    <div className="group relative rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-lg dark:border-dark-border dark:bg-dark-secondary dark:text-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {task.title}
        </h3>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            task.status === Status.Completed
              ? "bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-400"
              : task.status === Status.WorkInProgress
              ? "bg-blue-100 text-blue-700 dark:bg-blue-700/30 dark:text-blue-400"
              : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          {task.status}
        </span>
      </div>

      {/* Image */}
      {task.attachments && task.attachments.length > 0 && (
        <div className="mb-3">
          <div className="overflow-hidden rounded-lg">
            <Image
              // src={`https://pm-s3-images.s3.us-east-2.amazonaws.com/${task.attachments[0].fileURL}`}
              alt={task.attachments[0].fileName}
              width={400}
              height={200}
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
      )}

      {/* Description */}
      <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">
        {task.description || "No description provided"}
      </p>

      {/* Details grid */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <strong className="text-gray-700 dark:text-gray-200">Priority:</strong>{" "}
          <span>{task.priority}</span>
        </div>
        <div>
          <strong className="text-gray-700 dark:text-gray-200">Tags:</strong>{" "}
          <span>{task.tags || "No tags"}</span>
        </div>
        <div>
          <strong className="text-gray-700 dark:text-gray-200">Start:</strong>{" "}
          <span>
            {task.startDate ? format(new Date(task.startDate), "PP") : "Not set"}
          </span>
        </div>
        <div>
          <strong className="text-gray-700 dark:text-gray-200">Due:</strong>{" "}
          <span>
            {task.dueDate ? format(new Date(task.dueDate), "PP") : "Not set"}
          </span>
        </div>
        <div>
          <strong className="text-gray-700 dark:text-gray-200">Author:</strong>{" "}
          <span>{task.author ? task.author.username : "Unknown"}</span>
        </div>
        <div>
          <strong className="text-gray-700 dark:text-gray-200">Assignee:</strong>{" "}
          <span>{task.assignee ? task.assignee.username : "Unassigned"}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex justify-between items-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Task ID: {task.id}
        </p>
        <button className="rounded-lg border border-gray-300 px-3 py-1 text-xs text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
          View Details
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
