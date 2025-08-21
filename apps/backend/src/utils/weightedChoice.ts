export const weightedChoice = (weights: Record<string, number>, seed: number) => {
    let sum = 0;
    for (const key of Object.keys(weights).sort()) {
        sum += weights[key];
        if (seed < sum) {
            return Number(key);
        }
    }
    return Number(Object.keys(weights).pop());
}