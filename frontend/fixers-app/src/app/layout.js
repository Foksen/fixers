import { Provider } from "@/components/ui/provider";

export default function RootLayout({ children }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <Provider forcedTheme="light">{children}</Provider>
      </body>
    </html>
  );
}
