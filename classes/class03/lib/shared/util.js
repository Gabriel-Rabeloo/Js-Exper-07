function supportsWorkerType() {
    let supports = false;
    const tester = {
        get type() {
            supports = true;
            return '';
        },
    };
    try {
        new Worker('blob://', tester);
    } finally {
        // eslint-disable-next-line no-unsafe-finally
        return supports;
    }
}

function prepareRunChecker({ timerDelay }) {
    let lastEvent = Date.now();
    return {
        shouldRun() {
            const result = Date.now() - lastEvent > timerDelay;
            if (result) lastEvent = Date.now();

            return result;
        },
    };
}

export { supportsWorkerType, prepareRunChecker };
