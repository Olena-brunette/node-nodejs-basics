import { promises as fs } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const copy = async () => {
    const filesPath = (folderName) => join(__dirname, folderName);

    const sourceDir = filesPath('files');
    const destinationDir = filesPath('files_copy');
    

    try {
        await fs.access(sourceDir);
        try {
            await fs.access(destinationDir);
            throw new Error('FS operation failed');
        } catch (err) {
            if (err.code !== 'ENOENT') throw new Error('FS operation failed');
        }

        await fs.mkdir(destinationDir);

        await Promise.all(
            (await fs.readdir(sourceDir))
                .map(file => fs.copyFile(join(sourceDir, file), join(destinationDir, file)))
        );
    } catch {
        throw new Error('FS operation failed');
    }
};

await copy();
