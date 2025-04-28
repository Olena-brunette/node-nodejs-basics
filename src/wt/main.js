import { Worker } from 'node:worker_threads';
import { cpus } from 'node:os';
import { join } from 'node:path';

const performCalculations = async () => {
    const numberOfCores = cpus().length;
    const workerPath = join('src', 'wt', 'worker.js');

    const tasks = Array.from({ length: numberOfCores }, (_, index) => {
        const worker = new Worker(workerPath);

        return new Promise((resolve) => {
            worker.once('message', (data) => {
                resolve({ status: 'resolved', data });
            });
            worker.once('error', () => {
                resolve({ status: 'error', data: null });
            });
            worker.once('exit', (code) => {
                if (code !== 0) {
                    resolve({ status: 'error', data: null });
                }
            });

            worker.postMessage(10 + index);
        });
    });

    const results = await Promise.all(tasks);
    console.log(results);
};

await performCalculations();
