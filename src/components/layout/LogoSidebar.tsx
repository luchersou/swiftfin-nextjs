import { Zap } from "lucide-react";

export const LogoSidebar = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-sidebar-primary text-sidebar-primary-foreground flex size-8 items-center justify-center rounded-lg shrink-0">
        <Zap className="size-4" />
      </div>

      <div
        className="
          grid text-left text-sm leading-tight
          transition-all duration-200
          group-data-[collapsed=true]/sidebar:opacity-0
          group-data-[collapsed=true]/sidebar:translate-x-[-8px]
          group-data-[collapsed=true]/sidebar:pointer-events-none
        "
      >
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
