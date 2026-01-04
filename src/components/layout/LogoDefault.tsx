import { Zap } from "lucide-react";

export const LogoDefault = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-muted-foreground text-primary-foreground flex size-8 items-center justify-center rounded-lg shrink-0">
        <Zap className="size-4" />
      </div>

      <div className="grid text-left text-sm leading-tight">
        <span className="truncate font-medium">
          Swift<span className="text-primary">Fin</span>
        </span>
        <span className="truncate text-xs">
          Financial Control
        </span>
      </div>
    </div>
  );
};
