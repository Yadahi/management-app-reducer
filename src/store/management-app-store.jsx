import { createContext, useReducer, useState } from "react";

export const ManagementContext = createContext({
  projectsState: {
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  },
  addTask: () => {},
  deleteTask: () => {},
  selectProject: () => {},
  startAddProject: () => {},
  addProject: () => {},
  cancelAddProject: () => {},
  deleteProject: () => {},
});

const managementReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      const newTask = {
        text: action.payload,
        projectId: state.selectedProjectId,
        id: Math.random(),
      };
      return {
        ...state,
        tasks: [...state.tasks, newTask],
      };

    case "DELTE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((tasks) => tasks.id !== action.payload),
      };

    case "SELECT_PROJECT":
      console.log(action);
      return {
        ...state,
        selectedProjectId: action.payload,
      };

    case "START_ADD_PROJECT":
      return {
        ...state,
        selectedProjectId: null,
      };

    case "ADD_PROJECT":
      console.log("test reducer");
      const newProject = {
        ...action.payload,
        id: Math.random(),
      };
      return {
        ...state,
        selectedProjectId: undefined,
        projects: [...state.projects, newProject],
      };

    case "CANCLE_ADD_PROJECT":
      return {
        ...state,
        selectedProjectId: undefined,
      };

    case "DELETE_PROJECT":
      return {
        ...state,
        selectedProjectId: undefined,
        projects: state.projects.filter(
          (project) => project.id !== state.selectedProjectId
        ),
      };
  }

  return state;
};

const ManagementContextProvider = ({ children }) => {
  const [projectsState, managementDispatch] = useReducer(managementReducer, {
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  const handleAddTask = (text) => {
    managementDispatch({
      type: "ADD_TASK",
      payload: text,
    });
  };

  const handleDeleteTask = (id) => {
    managementDispatch({
      type: "DELTE_TASK",
      payload: id,
    });
  };

  const handleSelectProject = (id) => {
    console.log(id);
    managementDispatch({
      type: "SELECT_PROJECT",
      payload: id,
    });
  };

  const handleStartAddProject = () => {
    managementDispatch({
      type: "START_ADD_PROJECT",
    });
  };

  const handleAddProject = (projectData) => {
    managementDispatch({
      type: "ADD_PROJECT",
      payload: projectData,
    });
  };

  const handleCancelAddProject = () => {
    managementDispatch({
      type: "CANCLE_ADD_PROJECT",
    });
  };

  const handleDeleteProject = () => {
    managementDispatch({
      type: "DELETE_PROJECT",
    });
  };

  console.log(projectsState);
  const ctxValue = {
    projectsState: projectsState,
    addTask: handleAddTask,
    deleteTask: handleDeleteTask,
    selectProject: handleSelectProject,
    startAddProject: handleStartAddProject,
    addProject: handleAddProject,
    cancelAddProject: handleCancelAddProject,
    deleteProject: handleDeleteProject,
  };

  return (
    <ManagementContext.Provider value={ctxValue}>
      {children}
    </ManagementContext.Provider>
  );
};

export default ManagementContextProvider;
