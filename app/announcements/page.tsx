import { Calendar, MapPin, Bell, Users, Trophy, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface Announcement {
  id: number
  title: string
  description: string
  date: string
  category: "update" | "event" | "registration" | "achievement"
  icon: React.ReactNode
}

const announcements: Announcement[] = [
  {
    id: 1,
    title: "Route Map Released",
    description: "The official route map for The Silicon Mile 5K Fall Edition has been released. Check out the scenic path through Hyderabad Tech Park.",
    date: "September 15, 2024",
    category: "update",
    icon: <MapPin className="w-6 h-6" />,
  },
  {
    id: 2,
    title: "Registration Open",
    description: "Early bird registration is now open for The Silicon Mile 5K Fall Edition. Register before October 1st to get 20% off!",
    date: "September 10, 2024",
    category: "registration",
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: 3,
    title: "Corporate Wellness Summit - Save the Date",
    description: "Mark your calendars! The annual Corporate Wellness Summit will be held on December 15, 2024 at HITEC City Convention Center.",
    date: "September 5, 2024",
    category: "event",
    icon: <Calendar className="w-6 h-6" />,
  },
  {
    id: 4,
    title: "Record Participation Achieved",
    description: "We're thrilled to announce that our Spring Edition broke all previous records with over 2,000 participants! Thank you to everyone who made it possible.",
    date: "August 28, 2024",
    category: "achievement",
    icon: <Trophy className="w-6 h-6" />,
  },
  {
    id: 5,
    title: "Event Timing Update",
    description: "The Silicon Mile 5K will now start at 6:30 AM instead of 7:00 AM to avoid the heat. Please arrive 30 minutes early for warm-up.",
    date: "August 20, 2024",
    category: "update",
    icon: <Clock className="w-6 h-6" />,
  },
  {
    id: 6,
    title: "New Sponsor Announcement",
    description: "We're excited to welcome TechCorp as our platinum sponsor for the Fall Edition. Their support helps us make this event bigger and better!",
    date: "August 15, 2024",
    category: "update",
    icon: <Bell className="w-6 h-6" />,
  },
]

const categoryStyles = {
  update: "bg-blue-50 border-blue-200 text-blue-700",
  event: "bg-orange/10 border-orange text-orange",
  registration: "bg-green-50 border-green-200 text-green-700",
  achievement: "bg-yellow-50 border-yellow-200 text-yellow-700",
}

const categoryLabels = {
  update: "Update",
  event: "Event",
  registration: "Registration",
  achievement: "Achievement",
}

export default function Announcements() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
          Announcements
        </h1>
        <div className="w-24 h-1 bg-orange mx-auto mb-6" />
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Stay updated with the latest news, events, and updates from Corporate Wellness
        </p>
      </div>

      <div className="space-y-6">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className={cn(
              "bg-white rounded-lg shadow-md border-l-4 p-6 hover:shadow-lg transition-all duration-300",
              categoryStyles[announcement.category]
            )}
          >
            <div className="flex items-start space-x-4">
              <div
                className={cn(
                  "flex-shrink-0 p-3 rounded-lg",
                  categoryStyles[announcement.category]
                )}
              >
                {announcement.icon}
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-xl font-bold text-navy mb-1">
                    {announcement.title}
                  </h3>
                  <span
                    className={cn(
                      "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-2 sm:mb-0",
                      categoryStyles[announcement.category]
                    )}
                  >
                    {categoryLabels[announcement.category]}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {announcement.description}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{announcement.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}



