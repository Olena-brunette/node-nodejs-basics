import { promises as fs } from 'node:fs';
import { join } from 'node:path';

const create = async () => {
    const filePath = join('src', 'fs', 'files', 'fresh.txt');
    
    try {
        await fs.access(filePath);
        throw new Error('FS operation failed');
    } catch (err) {
        if (err.code === 'ENOENT') {
            await fs.writeFile(filePath, 'I am fresh and young');
        } else {
            throw new Error('FS operation failed');
        }
    }
};

await create();
