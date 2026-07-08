import { Loader2 } from "lucide-react";

export function Loading({ label = "加载中" }: { label?: string }) {
  return (
    <div className="panel" role="status" aria-live="polite">
      <div className="panel-body toolbar">
        <Loader2 size={18} aria-hidden="true" className="animate-spin" />
        <span>{label}</span>
      </div>
    </div>
  );
}
