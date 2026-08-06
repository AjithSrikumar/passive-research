import type { Company } from "@/lib/companies";

export default function RatingBadge({
  rating,
  size = "md",
}: {
  rating: Company["recommendation"];
  size?: "sm" | "md" | "lg";
}) {
  return (
    <span className={`rating-badge rating-${rating.toLowerCase().replace(" ", "-")} badge-${size}`}>
      {rating}
    </span>
  );
}