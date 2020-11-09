export interface Message {
    id: number
    message: string
    parentId: number | null
    author: number
}

export interface User {
    id: number
    name: string
    imageUrl: string
}
