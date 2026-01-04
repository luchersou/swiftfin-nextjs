import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-2xl border border-slate-700/40 bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/60 p-4 md:p-6 backdrop-blur-xl transition-all duration-300 hover:border-slate-600/60 hover:shadow-xl hover:shadow-slate-900/30 hover:bg-gradient-to-br hover:from-slate-800/70 hover:via-slate-800/50 hover:to-slate-900/70",
        className
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-0.5">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700/60 to-slate-800/60 backdrop-blur-sm border border-slate-600/30 transition-all duration-300 group-hover/bento:border-slate-500/50 group-hover/bento:shadow-lg group-hover/bento:shadow-slate-900/20">
            {icon}
          </div>
        </div>
        <div className="mb-2 text-sm md:text-base font-semibold text-slate-100">
          {title}
        </div>
        <div className="text-xs md:text-sm font-normal text-slate-400 leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
};