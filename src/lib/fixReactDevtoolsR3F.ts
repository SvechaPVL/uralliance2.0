"use client";

// Some builds of React DevTools expect renderers to provide a semver string.
// React Three Fiber doesn't, which causes warnings/errors in dev.
// We patch the global hook once to ensure a fallback version exists.
if (typeof window !== "undefined") {
  const hook = (window as typeof window & {
    __REACT_DEVTOOLS_GLOBAL_HOOK__?: {
      registerRenderer?: (renderer: { version?: string }) => void;
      __patchedForR3F?: boolean;
    };
  }).__REACT_DEVTOOLS_GLOBAL_HOOK__;

  if (hook && !hook.__patchedForR3F) {
    const original = hook.registerRenderer;
    hook.registerRenderer = (renderer) => {
      if (renderer && !renderer.version) {
        renderer.version = "0.0.0";
      }
      original?.(renderer);
    };
    hook.__patchedForR3F = true;
  }
}
