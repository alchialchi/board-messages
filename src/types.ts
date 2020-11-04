export interface Message {
    id: string
    message: string
    parentId: number | null
    author: string
}

export interface User {
    id: string
    name: string
}
