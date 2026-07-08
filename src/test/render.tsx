import type { ReactElement } from "react";
import { render } from "@testing-library/react";

export function renderWithApp(ui: ReactElement) {
  return render(ui);
}
