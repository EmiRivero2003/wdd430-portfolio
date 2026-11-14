
export default function Loading() {
  return (
    <main
      className="mx-auto w-full max-w-5xl px-6 py-16"
      role="status"
      aria-label="Loading open source projects"
    >
      <div className="animate-pulse">
        <div className="mb-4 h-4 w-24 rounded bg-slate-700" />

        <div className="mb-6 h-10 w-80 max-w-full rounded bg-slate-700" />

        <div className="mb-3 h-5 w-full max-w-2xl rounded bg-slate-800" />
        <div className="mb-10 h-5 w-3/4 rounded bg-slate-800" />

        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-blue-900 bg-slate-900 p-6"
            >
              <div className="mb-5 h-6 w-2/3 rounded bg-slate-700" />
              <div className="mb-3 h-4 w-full rounded bg-slate-800" />
              <div className="mb-6 h-4 w-4/5 rounded bg-slate-800" />
              <div className="h-10 w-32 rounded-lg bg-slate-700" />
            </div>
          ))}
        </div>
      </div>

      <span className="sr-only">Loading projects...</span>
    </main>
  );
}
