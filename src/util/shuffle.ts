function randomBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function exchange(arr: any[], i: number, j: number): void {
    const v = arr[i]

    arr[i] = arr[j]
    arr[j] = v
}

/**
 * Fisher-Yates shuffle
 * 
 * @param input the array to shuffle in-place
 */
 export function shuffle<T>(input: T[]): T[] {
    const copy = [...input]

    const length = input.length

    for (let i = 0; i < length - 2; i++) {
        const j = randomBetween(i, length - 1)

        exchange(input, i, j)
    }

    return copy
}
