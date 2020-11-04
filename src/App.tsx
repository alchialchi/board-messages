import React, { useState, useEffect, ChangeEvent } from 'react'
import styled from '@emotion/styled'
import { Message, User } from './types'

const Wrapper = styled.div`
    display: flex;
    background: black;
    color: hotpink;
    margin: 0 auto;
`

const WrapperBoard = styled.div`
    max-width: 600px;
    padding: 16px;
`

const MessageItem = styled.div`
    border: 2px lime solid;
    color: lime;
    width: 300px;
    min-height: 200px;
    margin: 10px;
    padding: 16px;
`

const App = () => {
    const [messages, setMessages] = useState<Message[]>([])
    const [users, setUsers] = useState<User[]>([])
    const [messageInput, setMessageInput] = useState('')
    const [userSelected, setUserSelected] = useState<string>('1')

    const fetchData = async () => {
        const response = await fetch('http://localhost:3000/messages')
        const newMessages = await response.json()
        setMessages(newMessages)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const fetchUsers = async () => {
        const response = await fetch('http://localhost:3000/users')
        const getUsers = await response.json()
        setUsers(getUsers)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const sendMessage = async () => {
        const requestMessage = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: messageInput,
                author: userSelected,
                parentId: null,
            }),
        }
        await fetch('http://localhost:3000/messages', requestMessage)
    }

    const deleteMessage = async (id: string) => {
        await fetch(`http://localhost:3000/messages/${id}`, {
            method: 'DELETE',
        })
    }

    const createMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setMessageInput(event.target.value)
    }

    const selectUser = (event: ChangeEvent<HTMLSelectElement>) => {
        setUserSelected(event.target.value)
    }

    const addMessage = async () => {
        await sendMessage()
        fetchData()
    }

    const removeItem = async (id: string) => {
        await deleteMessage(id)
        fetchData()
    }

    return (
        <Wrapper>
            <WrapperBoard>
                {messages.map((message: Message) => (
                    <MessageItem key={message.id}>
                        <div>
                            {message.message}, {message.author}
                        </div>
                        <button>reply</button>
                        {message.author === userSelected ? (
                            <>
                                <button>edit</button>
                                <button onClick={() => removeItem(message.id)}>
                                    DELETE
                                </button>
                            </>
                        ) : null}
                    </MessageItem>
                ))}
            </WrapperBoard>
            <div>
                <h1>users</h1>
                <select onChange={selectUser} value={userSelected}>
                    {users.map((user: User) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
                <br />
                <textarea onChange={createMessage} value={messageInput} />
                <button onClick={addMessage}>add message</button>
            </div>
        </Wrapper>
    )
}

export default App
