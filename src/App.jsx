import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import { useContext, useState } from "react";
import SelectedProject from "./components/SelectedProject";
import { ManagementContext } from "./store/management-app-store";

function App() {
  const { projectsState } = useContext(ManagementContext);

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content = <SelectedProject project={selectedProject} />;

  if (projectsState.selectedProjectId === null) {
    content = <NewProject />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar />
      {content}
    </main>
  );
}

export default App;
