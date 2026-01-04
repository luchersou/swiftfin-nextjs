export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-950 to-gray-800 ">
      
      <div className="relative mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <span className="text-sm font-semibold bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 bg-clip-text text-transparent">
            Financial Intelligence
          </span>
          <nav className="flex items-center gap-6">
            <span className="text-sm text-slate-400">Privacy</span>
            <span className="text-sm text-slate-400">Terms</span>
            <span className="text-sm text-slate-400">Contact</span>
          </nav>
          <span className="text-sm text-slate-500">
            © {new Date().getFullYear()} All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
