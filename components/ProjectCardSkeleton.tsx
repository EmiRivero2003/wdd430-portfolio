
export default function ProjectCardSkeleton() {
  return (
    <div
      className="mt-6 grid animate-pulse gap-6 md:grid-cols-2"
      role="status"
      aria-label="Loading school projects"
    >
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="rounded-2xl border border-blue-900 bg-slate-900 p-6"
        >
          <div className="mb-5 h-6 w-2/3 rounded bg-slate-700" />
          <div className="mb-3 h-4 w-full rounded bg-slate-800" />
          <div className="mb-3 h-4 w-4/5 rounded bg-slate-800" />
          <div className="mb-6 h-4 w-1/2 rounded bg-slate-800" />
          <div className="h-10 w-32 rounded-lg bg-slate-700" />
        </div>
      ))}
      <span className="sr-only">Loading school projects...</span>
    </div>
  );
}
