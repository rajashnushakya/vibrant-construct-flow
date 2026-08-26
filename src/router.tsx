import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // Preload a route's chunks when a <Link> is hovered/touched so
    // navigating feels instant instead of waiting on a network fetch.
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
  });

  return router;
};
