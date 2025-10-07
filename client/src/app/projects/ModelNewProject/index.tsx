import Modal from "../../../components/Modal";
import { useCreateProjectMutation } from "../../../state/api";
import React, { useState } from "react";
import { formatISO } from "date-fns";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

interface CreateProjectPayload {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

const ModalNewProject = ({ isOpen, onClose }: Props) => {
  const [createProject, { isLoading }] = useCreateProjectMutation();

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const resetForm = () => {
    setProjectName("");
    setDescription("");
    setStartDate("");
    setEndDate("");
  };

  const isFormValid = () => projectName && description && startDate && endDate;

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    if (new Date(endDate) < new Date(startDate)) {
      alert("End date cannot be earlier than start date");
      return;
    }

    const payload: CreateProjectPayload = {
      name: projectName,
      description,
      startDate: formatISO(new Date(startDate), { representation: "complete" }),
      endDate: formatISO(new Date(endDate), { representation: "complete" }),
    };

    try {
      await createProject(payload).unwrap();
      resetForm();
      onClose();
    } catch (error) {
      console.error("Failed to create project:", error);
      alert("Something went wrong while creating the project!");
    }
  };

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm transition focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Project">
      <form
        className="mt-4 space-y-4 sm:space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className={inputStyles}
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          disabled={isLoading}
        />

        <textarea
          className={`${inputStyles} min-h-[100px] resize-none`}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="date"
            className={inputStyles}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            disabled={isLoading}
          />
          <input
            type="date"
            className={inputStyles}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={!isFormValid() || isLoading}
          className={`mt-4 flex w-full justify-center rounded-md bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            !isFormValid() || isLoading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewProject;
