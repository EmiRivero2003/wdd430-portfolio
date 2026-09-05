export default function Footer() {
  return (
    <footer className="border-t border-blue-900/60 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-5xl px-6 py-6 text-center text-sm">
        <p>
          Copyright &copy; {new Date().getFullYear()} | Emiliano Rivero | All
          rights reserved
        </p>
      </div>
    </footer>
  );
}

