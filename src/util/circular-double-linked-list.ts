type Predicate<T> = (element: T) => boolean

export class CircularDoubleLinkedList<T> {

    private backingArray: T[] = []
    private position: number = 0

    submit(element: T): void {
        this.backingArray.push(element)
    }

    head(): T | undefined {
        if (this.position < this.backingArray.length) {
            return this.backingArray[this.position]
        } else {
            return undefined
        }
    }

    findFirst(predicate: Predicate<T>): T | undefined {
        return this.backingArray.find(predicate)
    }

    size(): number {
        return this.backingArray.length
    }

    next(): void {
        if (this.backingArray.length > 0) {
            if (this.position >= this.backingArray.length - 1) {
                this.position = 0
            } else {
                this.position++
            }
        }
    }

    previous(): void {
        if (this.backingArray.length > 0) {
            if (this.position <= 0) {
                this.position = this.backingArray.length - 1
            } else {
                this.position--
            }
        }
    }
}
