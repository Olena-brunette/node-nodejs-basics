import { spawn } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const spawnChildProcess = async (args) => {
    const childPath = join(__dirname, 'files', 'script.js');

    const child = spawn('node', [childPath, ...args], {
        stdio: ['pipe', 'pipe', 'pipe', 'ipc']
    });

    process.stdin.pipe(child.stdin);

    child.stdout.pipe(process.stdout);

    child.stderr.pipe(process.stderr);

    child.on('error', (err) => {
        console.error('Failed to start child process:', err);
    });

    child.on('exit', (code) => {
        console.log(`Child process exited with code ${code}`);
    });
};

await spawnChildProcess(['arg1', 'arg2']);
