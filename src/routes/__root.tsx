import { Outlet, createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { Provider } from "jotai"

export const Route = createRootRoute({
  component: () => (
    <>
      <Provider>
        <Outlet />
      </Provider>
      <TanStackRouterDevtools />
    </>
  ),
})
