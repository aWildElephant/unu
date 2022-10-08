type Predicate<T> = (element: T) => boolean

/**
 * Not really a linked list :°)
 *
 * TODO: we don't need this, just use an array and let GameState/parent structure manage player order
 */
export class CircularDoubleLinkedList<T> {

    backingArray: T[] = []
    private position = 0

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
