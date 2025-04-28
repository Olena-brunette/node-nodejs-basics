import { promises as fs } from 'node:fs';
import { join } from 'node:path';

const read = async () => {
    const filePath = join('files', 'fileToRead.txt');

    try {
        await fs.access(filePath);
        const content = await fs.readFile(filePath, 'utf-8');
        console.log(content);
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

await read();
