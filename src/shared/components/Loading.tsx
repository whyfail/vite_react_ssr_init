import { Loader2 } from "lucide-react";

export function Loading({ label = "加载中" }: { label?: string }) {
  return (
    <div className="rounded-lg border border-border bg-card" role="status" aria-live="polite">
      <div className="flex items-center gap-2.5 p-5">
        <Loader2 size={18} aria-hidden="true" className="animate-spin" />
        <span>{label}</span>
      </div>
    </div>
  );
}
