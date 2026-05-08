export function isMobileViewport() {
  return typeof window !== "undefined" && window.innerWidth < 768;
}
