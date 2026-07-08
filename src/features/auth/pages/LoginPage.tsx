import { LoginForm } from "@/features/auth/components/LoginForm";
import { LoginPrism } from "./LoginPrism";

export function LoginPage() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden p-6">
      <LoginPrism />
      <section
        className="relative z-10 w-full max-w-[520px] rounded-[32px] bg-[#ecf0f350] p-8 shadow-[1px_1px_3px_#cbced1,-1px_-1px_3px_white] backdrop-blur-md"
        aria-labelledby="login-title"
      >
        <h1
          id="login-title"
          className="text-center text-[32px] leading-tight font-bold text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]"
        >
          登录
        </h1>
        <LoginForm />
      </section>
    </main>
  );
}
