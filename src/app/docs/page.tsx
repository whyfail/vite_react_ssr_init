import { DocsPage } from "@/features/docs/pages/DocsPage";
import { AppLayout } from "@/shared/components/AppLayout";

export const metadata = {
  title: "文档 - CWA React SSR",
};

export default function Page() {
  return (
    <AppLayout activePath="/docs" title="SSR 模板工作台" subtitle="Next.js App Router 企业级 SSR 模板基线">
      <DocsPage />
    </AppLayout>
  );
}
