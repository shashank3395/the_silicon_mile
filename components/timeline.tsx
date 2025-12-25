import { Calendar, MapPin, Clock } from "lucide-react"

interface TimelineEvent {
  date: string
  title: string
  description: string
  location?: string
  time?: string
}

const timelineEvents: TimelineEvent[] = [
  {
    date: "Registration Opens",
    title: "Early Bird Registration",
    description: "Register early to secure your spot and enjoy special pricing. Limited spots available!",
    time: "Now Open",
  },
  {
    date: "TBD",
    title: "Race Day",
    description: "Join us for The Silicon Mile 5K run. A day filled with running, networking, and community spirit.",
    location: "Hyderabad",
    time: "6:00 AM",
  },
  {
    date: "Post Event",
    title: "Networking & Celebration",
    description: "Celebrate your achievement with refreshments, awards ceremony, and networking opportunities.",
    location: "Event Venue",
    time: "After Race",
  },
]

export default function Timeline() {
  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-orange/30 hidden md:block" />
      
      <div className="space-y-12">
        {timelineEvents.map((event, index) => (
          <div key={index} className="relative flex gap-8">
            {/* Timeline Dot */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-orange flex items-center justify-center text-white font-bold text-lg shadow-lg z-10 relative">
                {index + 1}
              </div>
            </div>
            
            {/* Event Content */}
            <div className="flex-1 bg-white rounded-lg shadow-md p-6 md:p-8 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-navy mb-2">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-4 text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-orange" />
                      <span className="text-sm font-medium">{event.date}</span>
                    </div>
                    {event.time && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-orange" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-orange" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

