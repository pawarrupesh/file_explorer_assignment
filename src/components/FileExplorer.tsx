import React from "react";
import { FolderItem, FileExplorerProps } from "../types/FileExplorerTypes";

const FileExplorer: React.FC<FileExplorerProps> = ({
  explorerData,
  expandedFolders,
  selectedFile,
  contextMenu,
  toggleFolder,
  handleLeftClick,
  handleRightClick,
  handleContextMenuAction,
}) => {
  const renderFileTree = (items: FolderItem["data"]) => {
    return items.map((item) => {
      const { name, type, data } = item;

      return (
        <div key={`${type}-${name}`} className="file-item">
          {type === "folder" ? (
            <>
              <div onClick={() => toggleFolder(name)}>
                <span
                  className="folder-icon"
                  role="button"
                  aria-label={`Toggle folder ${name}`}
                >
                  📂
                </span>
                <span role="heading" aria-level={3}>
                  {name}
                </span>
              </div>

              {expandedFolders[name] && data && (
                <div className="folder-contents">{renderFileTree(data)}</div>
              )}
            </>
          ) : (
            <>
              <span className="file-icon">📄</span>
              <span
                onClick={() => handleLeftClick(name)}
                onContextMenu={(e) => handleRightClick(e, name)}
                className={selectedFile === name ? "selected" : ""}
                role="button"
                aria-label={`Select file ${name}`}
              >
                {name}
              </span>
            </>
          )}
        </div>
      );
    });
  };

  return (
    <div className="file-explorer-container">
      <h2 className="file-explorer-header">File Explorer</h2>
      <div className="file-explorer">
        {renderFileTree(explorerData.data)}
        {contextMenu && (
          <div
            className="context-menu"
            style={{ top: contextMenu.y, left: contextMenu.x }}
            role="menu"
          >
            <button
              onClick={() =>
                handleContextMenuAction("copy", contextMenu.fileName)
              }
              role="menuitem"
            >
              Copy
            </button>
            <button
              onClick={() =>
                handleContextMenuAction("delete", contextMenu.fileName)
              }
              role="menuitem"
            >
              Delete
            </button>
            <button
              onClick={() =>
                handleContextMenuAction("rename", contextMenu.fileName)
              }
              role="menuitem"
            >
              Rename
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileExplorer;
