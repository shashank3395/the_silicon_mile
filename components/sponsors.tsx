/**
 * Sponsors Component
 * 
 * Displays event sponsors in a tiered layout (Platinum, Gold, Silver, Bronze).
 * Includes placeholder data structure and a call-to-action for new sponsors.
 * 
 * Features:
 * - Tiered sponsor display with different styling per tier
 * - Placeholder for sponsor logos
 * - Call-to-action section for potential sponsors
 * 
 * Used on the home page to showcase event sponsors.
 * 
 * @module components/sponsors
 */

import Image from "next/image"

/**
 * Sponsor data structure
 * 
 * Defines the shape of sponsor data
 */
interface Sponsor {
  /** Sponsor name */
  name: string
  /** URL to sponsor logo image (optional) */
  logo?: string
  /** Sponsor tier level (optional) */
  tier?: "platinum" | "gold" | "silver" | "bronze"
}

/**
 * Sponsors data
 * 
 * Placeholder sponsor data. Replace with actual sponsor information
 * when sponsors are confirmed.
 * 
 * TODO: Update with real sponsor data and logos
 */
const sponsors: Sponsor[] = [
  {
    name: "Tech Sponsor",
    tier: "platinum",
  },
  {
    name: "Wellness Partner",
    tier: "gold",
  },
  {
    name: "Community Sponsor",
    tier: "gold",
  },
  {
    name: "Supporting Partner",
    tier: "silver",
  },
  {
    name: "Community Friend",
    tier: "silver",
  },
]

/**
 * Gets CSS classes for sponsor tier styling
 * 
 * Returns different border and background styles based on sponsor tier.
 * 
 * @param {string | undefined} tier - The sponsor tier (platinum, gold, silver, bronze)
 * @returns {string} Tailwind CSS classes for the tier
 */
const getTierStyles = (tier?: string) => {
  switch (tier) {
    case "platinum":
      return "border-4 border-gray-300 bg-gray-50"
    case "gold":
      return "border-2 border-yellow-400 bg-yellow-50/30"
    case "silver":
      return "border-2 border-gray-400 bg-gray-100/50"
    case "bronze":
      return "border border-orange-300 bg-orange-50/30"
    default:
      return "border border-gray-200 bg-white"
  }
}

/**
 * Gets display label for sponsor tier
 * 
 * Returns a human-readable label for the sponsor tier.
 * 
 * @param {string | undefined} tier - The sponsor tier
 * @returns {string} Display label for the tier
 */
const getTierLabel = (tier?: string) => {
  switch (tier) {
    case "platinum":
      return "Platinum Sponsor"
    case "gold":
      return "Gold Sponsor"
    case "silver":
      return "Silver Sponsor"
    case "bronze":
      return "Bronze Sponsor"
    default:
      return "Sponsor"
  }
}

/**
 * Sponsors component
 * 
 * Renders sponsor information grouped by tier levels.
 * Displays sponsors in a grid layout with tier-specific styling.
 * Includes a call-to-action section for potential sponsors.
 * 
 * @returns {JSX.Element} The rendered sponsors component
 * 
 * @example
 * // Used on the home page
 * <Sponsors />
 */
export default function Sponsors() {
  return (
    <div className="space-y-12">
      {/* Sponsor Tiers */}
      {["platinum", "gold", "silver", "bronze"].map((tier) => {
        const tierSponsors = sponsors.filter((s) => s.tier === tier)
        if (tierSponsors.length === 0) return null

        return (
          <div key={tier} className="space-y-6">
            <h3 className="text-2xl font-bold text-navy text-center capitalize">
              {tier} Sponsors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tierSponsors.map((sponsor, index) => (
                <div
                  key={index}
                  className={`${getTierStyles(sponsor.tier)} rounded-lg p-8 flex items-center justify-center min-h-[200px] hover:shadow-lg transition-all`}
                >
                  {sponsor.logo ? (
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={200}
                      height={100}
                      className="object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="text-gray-400 mb-2">
                        <svg
                          className="w-16 h-16 mx-auto"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                      <p className="font-semibold text-navy text-lg">
                        {sponsor.name}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {getTierLabel(sponsor.tier)}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      })}

      {/* Call to Action for Sponsors */}
      <div className="bg-gradient-to-r from-navy to-navy/90 rounded-lg p-8 md:p-12 text-center text-white mt-16">
        <h3 className="text-3xl font-bold mb-4">
          Become a Sponsor
        </h3>
        <p className="text-xl mb-6 text-white/90 max-w-2xl mx-auto">
          Join us in promoting corporate wellness and connect with Hyderabad's tech community. 
          Multiple sponsorship tiers available.
        </p>
        <a
          href="mailto:sponsors@thesiliconmile.com"
          className="inline-block bg-orange hover:bg-orange-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Contact Us
        </a>
      </div>
    </div>
  )
}

