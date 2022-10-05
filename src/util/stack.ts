export class Stack<T> {

    private backingArray: T[]

    push(element: T): void {
        this.backingArray.push(element)
    }
 
    pop(): T | undefined {
        return this.backingArray.pop()
    }
    
    size(): number {
        return this.backingArray.length
    }
}
