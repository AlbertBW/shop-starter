export default function LoadingSpinner() {
  return (
    <div
      className="flex h-64 items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading...</span>
      <div className="h-24 w-24 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
    </div>
  );
}
