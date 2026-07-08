import { Loading } from "@/shared/components/Loading";

export default function LoadingPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-background p-6">
      <Loading label="页面加载中" />
    </main>
  );
}
