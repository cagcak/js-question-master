type Files = {
  id: string;
  name: string;
};

type Folder = {
  files: Files[];
} & Files;

export type List = (Files & Folder)[];

export default function move(list: List, source: string, destination: string): List | string {
  if (!Array.isArray(list) || list.length < 1) {
    throw new Error('Directory not found!');
  }

  const files = list
    .map((folder) => folder.files.find((_file) => _file.id === source))
    .filter(Boolean) as Files[];

  if (!list.some((folder) => folder.id === destination)) {
    throw Error('You cannot specify a file as the destination');
  } else if (!files.length) {
    throw Error('You cannot move a folder');
  }

  const newStructure = list.map((folder) => {
    return {
      ...folder,
      files: [
        ...folder.files.filter((file) => file.id !== source),
        ...(folder.id === destination ? [...files] : []),
      ],
    };
  });

  return newStructure;
}
