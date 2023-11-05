import { createContext, useState } from "react";

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

const ManagementContextProvider = ({ children }) => {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  const handleAddTask = (text) => {
    setProjectsState((prevState) => {
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: Math.random(),
      };

      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });
  };
  const handleDeleteTask = (id) => {
    console.log("delete task", id);
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((tasks) => tasks.id !== id),
      };
    });
  };

  const handleSelectProject = (id) => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  };

  const handleStartAddProject = () => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  };

  const handleAddProject = (projectData) => {
    setProjectsState((prevState) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  };

  const handleCancelAddProject = () => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  };

  const handleDeleteProject = () => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  };

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
