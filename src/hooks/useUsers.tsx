import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { AppDispatch, RootState } from "../store"
import { addUser, deleteUser, fetchUsers, updateUser } from "../store/users"
import { User } from "../utils"

export function useUsers() {
  const dispatch = useDispatch<AppDispatch>()
  const { users, loading, error } = useSelector((state: RootState) => state.users)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return {
    users,
    loading,
    error,
    addUser: (user: Omit<User, "id">) => dispatch(addUser(user)),
    updateUser: (user: User) => dispatch(updateUser(user)),
    deleteUser: (userId: number) => dispatch(deleteUser(userId)),
    // changeRole: (userId: number, newRole: "Negocio" | "Cliente") =>
    //   dispatch(changeRole({ userId, newRole })),
  }
}
