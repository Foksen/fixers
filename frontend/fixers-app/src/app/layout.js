import { Provider } from "@/components/ui/provider";

export default function RootLayout({ children }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
