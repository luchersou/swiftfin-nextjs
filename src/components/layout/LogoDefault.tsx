import { TrendingUp } from "lucide-react";

export const LogoDefault = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 flex size-8 items-center justify-center rounded-lg shrink-0 shadow-lg shadow-emerald-500/25">
        <TrendingUp className="size-4 text-white" />
      </div>

      <div className="grid text-left text-sm leading-tight">
        <span className="truncate font-semibold tracking-tight">
          Swift<span className="text-emerald-500">Fin</span>
        </span>
        <span className="truncate text-xs text-muted-foreground">
          Financial Control
        </span>
      </div>
    </div>
  );
};