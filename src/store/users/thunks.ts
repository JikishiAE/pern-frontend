import { createAsyncThunk } from "@reduxjs/toolkit"
import { httpClient, User } from "../../utils"

const api = httpClient.getInstance();

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
    const response = await api.get("/api/users") // Endpoint del backend
    return response.data
})

export const addUser = createAsyncThunk("user/addUser", async (user: Omit<User, "id">) => {
    const response = await api.post("/api/users", user)
    return response.data
})

export const updateUser = createAsyncThunk("user/updateUser", async (user: User) => {
    await api.put(`/api/users/${user.id}`, user)
    return user
})

export const deleteUser = createAsyncThunk("user/deleteUser", async (userId: number) => {
    await api.delete(`/api/users/${userId}`, {})
    return userId
})