import Link from "next/link";
import SearchCompanies from "@/components/SearchCompanies";

export default function NotFound() {
  return (
    <main className="notfound-hero">
      <p className="big-404">404</p>
      <h1>Page not found</h1>
      <p>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Try searching for a company instead.
      </p>
      <div style={{ maxWidth: 520, margin: "0 auto 34px" }}>
        <SearchCompanies size="md" />
      </div>
      <div className="center-links">
        <Link href="/" className="btn btn-primary">
          Go back home
        </Link>
        <Link href="/research" className="btn btn-outline">
          Browse all research
        </Link>
      </div>
    </main>
  );
}