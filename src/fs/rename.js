import { promises as fs } from 'node:fs';
import { join } from 'node:path';

const rename = async () => {
    const oldPath = join('src', 'fs', 'files', 'wrongFilename.txt');
    const newPath = join('src', 'fs', 'files', 'properFilename.md');

    try {
        await fs.access(oldPath);

        try {
            await fs.access(newPath);
            throw new Error('FS operation failed');
        } catch (err) {
            if (err.code !== 'ENOENT') {
                throw new Error('FS operation failed');
            }
        }

        await fs.rename(oldPath, newPath);
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

await rename();
