import Link from "next/link";
import { LayoutDashboard, ListTodo, PanelsTopLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const navigation = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects", label: "Projects", icon: PanelsTopLeft },
  { href: "/tickets", label: "Tickets", icon: ListTodo },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen md:grid md:grid-cols-4">
      <aside className="border-b bg-card md:col-span-1 md:border-r md:border-b-0">
        <div className="flex h-16 items-center px-6">
          <Link href="/" className="font-semibold">
            Issue Tracker Lite
          </Link>
        </div>
        <Separator />
        <nav aria-label="Main navigation" className="flex gap-1 p-3 md:flex-col">
          {navigation.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Icon aria-hidden="true" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="min-w-0 md:col-span-3">
        <header className="flex h-16 items-center border-b bg-card px-6">
          <p className="text-sm text-muted-foreground">
            Devin Hands-on Base Repository
          </p>
        </header>
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
