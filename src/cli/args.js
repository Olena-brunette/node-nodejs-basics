const parseArgs = () => {
    const args = process.argv.slice(2);

    const result = args.reduce((acc, curr, index) => {
        if (index % 2 === 0) {
            const key = curr.slice(2);
            const value = args[index + 1];
            acc.push(`${key} is ${value}`);
        }
        return acc;
    }, []);

    console.log(result.join(', '));
};

parseArgs();
