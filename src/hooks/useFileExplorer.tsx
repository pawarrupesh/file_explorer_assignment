import { useState } from "react";
import { FileExplorerProps, FileSystemItem, FolderItem, UseFileExplorerProps } from "../types/FileExplorerTypes";

export const useFileExplorer = ({
  initialData,
}: UseFileExplorerProps): FileExplorerProps => {
  const [explorerData, setExplorerData] = useState<FolderItem>(initialData);
  const [expandedFolders, setExpandedFolders] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    fileName: string;
  } | null>(null);

  const toggleFolder = (name: string) => {
    setExpandedFolders((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleLeftClick = (name: string) => {
    setSelectedFile(name);
    setContextMenu(null);
  };

  const handleRightClick = (event: React.MouseEvent, fileName: string) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY, fileName });
  };

  const handleContextMenuAction = (
    action: "copy" | "delete" | "rename",
    fileName: string
  ) => {
    console.log(`${action} action on file: ${fileName}`);

    switch (action) {
      case "copy":
        console.log(`Copied: ${fileName}`);
        break;
      case "delete":
        deleteFile(explorerData, fileName);
        break;
      case "rename":
        renameFile(explorerData, fileName);
        break;
    }
    setContextMenu(null);
  };

  const deleteFile = (folder: FolderItem, fileName: string) => {
    const updatedData = { ...folder };
    const recurseDelete = (data: FileSystemItem[]): FileSystemItem[] => {
      return data.filter((item) => {
        if (item.type === "folder") {
          item.data = recurseDelete(item.data);
        }
        return item.name !== fileName;
      });
    };
    updatedData.data = recurseDelete(updatedData.data);
    setExplorerData(updatedData);
  };

  const renameFile = (folder: FolderItem, fileName: string) => {
    const newFileName = prompt("Enter new name:", fileName);
    if (!newFileName || newFileName.trim() === "") {
      alert("File name cannot be empty.");
      return;
    }

    const updatedData = { ...folder };
    const recurseRename = (data: FileSystemItem[]) => {
      data.forEach((item) => {
        if (item.name === fileName) {
          item.name = newFileName;
        } else if (item.type === "folder") {
          recurseRename(item.data);
        }
      });
    };

    recurseRename(updatedData.data);
    setExplorerData((prevData) => ({ ...prevData, ...updatedData }));
  };

  return {
    explorerData,
    expandedFolders,
    selectedFile,
    contextMenu,
    toggleFolder,
    handleLeftClick,
    handleRightClick,
    handleContextMenuAction,
  };
};
