import React from 'react';

import { Ifolder } from '../../services/folderServices';

import '../../styles/ImageFolders.scss';

type foldersProps = {
    folders: Ifolder[];
    onClick: (e: React.MouseEvent<HTMLLIElement>) => void;
};

const LibraryFolders = ({ folders, onClick }: foldersProps): JSX.Element => {

    return (
        <ul className="folder-container">
            {folders.map(folder => 
                <li key={folder.id} id={folder.id} onClick={onClick}>
                    {folder.name}
                </li>)
            }
        </ul>
    );
};

export default LibraryFolders;