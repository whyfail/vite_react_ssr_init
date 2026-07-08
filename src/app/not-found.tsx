import Link from "next/link";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-background p-6">
      <Card className="w-full max-w-[420px] p-7" aria-labelledby="not-found-title">
        <CardHeader>
          <Badge variant="secondary">404</Badge>
          <CardTitle asChild>
            <h1 id="not-found-title" className="text-2xl leading-tight font-semibold">
              页面不存在
            </h1>
          </CardTitle>
          <CardDescription>当前地址没有匹配到模板路由。</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="mt-5 w-full">
            <Link href="/docs">返回文档页</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
