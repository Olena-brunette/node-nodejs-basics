import { promises as fs } from 'node:fs';
import { join } from 'node:path';

const list = async () => {
    const dirPath = join('src', 'fs', 'files');

    try {
        await fs.access(dirPath);
        const files = await fs.readdir(dirPath);
        console.log(files);
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

await list();
