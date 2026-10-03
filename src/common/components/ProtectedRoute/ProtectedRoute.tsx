import { Navigate, Outlet } from "react-router"
import type { ReactNode } from "react"
import { Path } from "@/common/routing"

type Props = {
  children?: ReactNode
  isAllowed: boolean
  redirectPath?: string
}

export const ProtectedRoute = ({
  children,
  isAllowed,
  redirectPath = Path.Login,
}: Props) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} />
  }
  return children || <Outlet />
}
