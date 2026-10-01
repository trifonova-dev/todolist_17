import {
  createAppSlice,
  handleServerAppError,
  handleServerNetworkError,
} from "@/common/utils"
import type { LoginInputs } from "@/features/auth/lib/schemas"
import { authApi } from "@/features/auth/api/authApi"
import { ResultCode } from "@/common/enums"
import { setAppStatusAC } from "@/app/app-slice"

export const authSlice = createAppSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
  reducers: (create) => ({
    loginTC: create.asyncThunk(
      async (data: LoginInputs, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await authApi.login(data)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return { isLoggedIn: true }
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error: any) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),
  }),
})

export const { loginTC } = authSlice.actions
export const authReducer = authSlice.reducer
export const { selectIsLoggedIn } = authSlice.selectors
