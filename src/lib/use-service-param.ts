import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

/**
 * The `?service=` value of the current URL, for client components.
 *
 * Read from window.location rather than useSearchParams, which would make
 * the prerendered Contact page render its forms on the client only. It is
 * null while prerendering and hydrating, then picks up the real value.
 */
export function useServiceParam(): string | null {
  const search = useSyncExternalStore(
    subscribe,
    () => window.location.search,
    () => "",
  );
  return new URLSearchParams(search).get("service");
}
