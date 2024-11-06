import data from "./fileExplorerData";
import FileExplorer from "./components/FileExplorer";
import { useFileExplorer } from "./hooks/useFileExplorer";
import "./App.css";

function App() {
  const {
    explorerData,
    expandedFolders,
    selectedFile,
    contextMenu,
    toggleFolder,
    handleLeftClick,
    handleRightClick,
    handleContextMenuAction,
  } = useFileExplorer({ initialData: data });

  return (
    <FileExplorer
      explorerData={explorerData}
      expandedFolders={expandedFolders}
      selectedFile={selectedFile}
      contextMenu={contextMenu}
      toggleFolder={toggleFolder}
      handleLeftClick={handleLeftClick}
      handleRightClick={handleRightClick}
      handleContextMenuAction={handleContextMenuAction}
    />
  );
}

export default App;
