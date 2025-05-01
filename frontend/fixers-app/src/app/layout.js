import { Provider } from "@/components/ui/provider";
import { Toaster } from "@chakra-ui/react";

export default function RootLayout({ children }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
