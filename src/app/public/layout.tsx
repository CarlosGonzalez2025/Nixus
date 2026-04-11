// Public routes don't need auth providers or sidebar.
// This layout is intentionally minimal.
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return children;
}
