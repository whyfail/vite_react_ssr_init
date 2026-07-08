"use client";

import { RefreshCw } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-background p-6">
      <Card className="w-full max-w-[420px] p-7" aria-labelledby="error-title">
        <CardHeader>
          <Badge variant="secondary">Error</Badge>
          <CardTitle asChild>
            <h1 id="error-title" className="text-2xl leading-tight font-semibold">
              页面加载失败
            </h1>
          </CardTitle>
          <CardDescription>{error.message || "请稍后重试。"}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="mt-5 w-full" type="button" onClick={reset}>
            <RefreshCw size={16} aria-hidden="true" />
            重试
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
