import { ReactNode } from "react";
import "./ui/global.css";
import { inter } from "@/app/ui/fonts";

export const metadata = {
    title: {
        template: "%s | Acme Dashboard",
        default: "Acme Dashboard"
    },
    description: "The official Next.js Course Dashboard, built with App Router.",
    metadataBase: new URL("https://next-learn-dashboard.vercel.sh")
};

export default function RootLayout({ children }: {
    children: ReactNode;
}) {
    return (
        <html lang="es">
        <body className={`${inter.className} antialiased`}>{children}</body>
        </html>
    );
}
