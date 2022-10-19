export class Stack<T> {

    private backingArray: T[]

    constructor(arr?: T[]) {
        if (arr) {
            this.backingArray = arr
        } else {
            this.backingArray = []
        }
    }

    push(element: T): void {
        this.backingArray.push(element)
    }

    peek(): T {
        const size = this.size()

        return this.backingArray[size - 1]
    }

    pop(): T | undefined {
        return this.backingArray.pop()
    }

    size(): number {
        return this.backingArray.length
    }
}
