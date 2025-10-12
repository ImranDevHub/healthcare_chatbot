import concurrently from 'concurrently';

concurrently([
    {
        name: 'server',
        command: 'bun run dev',
        cwd: './packages/server/src',
        prefixColor: 'cyan',
    },
    {
        name: 'client',
        command: 'bun run dev',
        cwd: './packages/client',
        prefixColor: 'green',
    },
]);
