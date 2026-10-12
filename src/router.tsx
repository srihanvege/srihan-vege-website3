import React from "react";

/**
 * Minimal two route router. The site has exactly two pages, so this is a
 * history.pushState wrapper rather than a dependency.
 */
export function usePath(): [string, (to: string) => void] {
  const [path, setPath] = React.useState(() => window.location.pathname);

  React.useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = React.useCallback((to: string) => {
    if (to === window.location.pathname) return;
    window.history.pushState({}, "", to);
    setPath(to);
    window.scrollTo(0, 0);
  }, []);

  return [path, navigate];
}

/** Anchor that routes client side but stays a real link for middle click and SEO. */
export function Link({
  to,
  navigate,
  className,
  children,
}: {
  to: string;
  navigate: (to: string) => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}
