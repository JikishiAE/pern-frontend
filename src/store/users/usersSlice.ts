import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../../utils"
import { addUser, deleteUser, fetchUsers, updateUser } from "./thunks"

interface UserState {
  users: User[]
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Error al obtener usuarios"
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.push(action.payload)
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        )
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.users = state.users.filter((user) => user.id !== action.payload)
      })
  },
})

export default userSlice.reducer
