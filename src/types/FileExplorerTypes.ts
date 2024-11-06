export interface FileItem {
  type: "file";
  meta: string;
  name: string;
}

export interface FolderItem {
  type: "folder";
  name: string;
  data: FileSystemItem[];
}

export type FileSystemItem = FileItem | FolderItem;

export interface UseFileExplorerProps {
  initialData: FolderItem;
}

export interface FileExplorerProps {
  explorerData: FolderItem;
  expandedFolders: { [key: string]: boolean };
  selectedFile: string | null;
  contextMenu: { x: number; y: number; fileName: string } | null;
  toggleFolder: (name: string) => void;
  handleLeftClick: (name: string) => void;
  handleRightClick: (event: React.MouseEvent, fileName: string) => void;
  handleContextMenuAction: (
    action: "copy" | "delete" | "rename",
    fileName: string
  ) => void;
}
