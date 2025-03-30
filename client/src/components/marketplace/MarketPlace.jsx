"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Award,
  BookOpen,
  Calendar,
  ChevronDown,
  Check,
  ExternalLink,
  Filter,
  Globe,
  Grid,
  Heart,
  Info,
  List,
  MapPin,
  MessageSquare,
  Search,
  Share2,
  ShoppingBag,
  Star,
  Ticket,
  TrendingUp,
  Users,
} from "lucide-react"
import { Link } from "react-router-dom"

export default function MarketplacePage() {
  const [viewMode, setViewMode] = useState("grid")
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [priceFilter, setPriceFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  // Mock events data
  const events = [
    {
      id: "EVENT-001",
      title: "Blockchain Innovation Summit 2023",
      organizer: "Global Blockchain Association",
      date: "2023-12-15",
      endDate: "2023-12-17",
      location: "New York, NY",
      price: 299,
      category: "conference",
      tags: ["Blockchain", "Innovation", "Networking"],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj8xnh1AXYbYtP2jzST7waLi8wkWl9_KrhUPf6wdMHDdkt2f9qYySfNbeZR9rJxsU20I8&usqp=CAU",
      featured: true,
      trending: true,
      rating: 4.8,
      reviewCount: 124,
      attendees: 1200,
      description:
        "Join the largest blockchain conference of the year featuring keynote speakers, workshops, and networking opportunities with industry leaders.",
      virtual: false,
    },
    {
      id: "EVENT-002",
      title: "DeFi Development Workshop",
      organizer: "Ethereum Developers Guild",
      date: "2023-12-10",
      endDate: "2023-12-10",
      location: "Online",
      price: 149,
      category: "workshop",
      tags: ["DeFi", "Development", "Ethereum"],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnkHcngP6nDLUpX93WSPyEPhVCFAJAlmlejqnXRBmZmMpPdR20xfiMbAobp4BqBINjQaU&usqp=CAU",
      featured: false,
      trending: true,
      rating: 4.6,
      reviewCount: 89,
      attendees: 500,
      description:
        "A hands-on workshop for developers looking to build decentralized finance applications on Ethereum.",
      virtual: true,
    },
    {
      id: "EVENT-003",
      title: "Cryptocurrency Trading Masterclass",
      organizer: "Crypto Trading Academy",
      date: "2023-12-05",
      endDate: "2023-12-06",
      location: "Miami, FL",
      price: 199,
      category: "course",
      tags: ["Trading", "Cryptocurrency", "Investment"],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCD-kD2mWLrBYgvy68ElIRC2DuPPi1QYYCyTZP_vxsc3rMyzN0fMNNaxQTdv_Nd_IzNuQ&usqp=CAU",
      featured: true,
      trending: false,
      rating: 4.5,
      reviewCount: 76,
      attendees: 150,
      description:
        "Learn advanced trading strategies from professional traders with years of experience in cryptocurrency markets.",
      virtual: false,
    },
    {
      id: "EVENT-004",
      title: "NFT Art Exhibition",
      organizer: "Digital Art Collective",
      date: "2023-12-20",
      endDate: "2023-12-22",
      location: "Los Angeles, CA",
      price: 0,
      category: "exhibition",
      tags: ["NFT", "Art", "Digital"],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRowM38Yjzf2jSILJEeY6MBLsrg1zVPanJ0-w&s",
      featured: false,
      trending: true,
      rating: 4.7,
      reviewCount: 52,
      attendees: 800,
      description:
        "Explore the intersection of blockchain technology and art at this immersive NFT exhibition featuring works from renowned digital artists.",
      virtual: false,
    },
    {
      id: "EVENT-005",
      title: "Web3 Developer Bootcamp",
      organizer: "Blockchain Education Network",
      date: "2024-01-10",
      endDate: "2024-01-31",
      location: "Online",
      price: 499,
      category: "course",
      tags: ["Web3", "Development", "Bootcamp"],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRAMzVo8hmmDwJL7F9snIGiZ-HcIseoRunmlFPxkefsvV_ttK3RoDvlPJIjYo5ZuCarow&usqp=CAU",
      featured: true,
      trending: true,
      rating: 4.9,
      reviewCount: 112,
      attendees: 300,
      description:
        "A comprehensive 3-week bootcamp covering everything you need to know to become a proficient Web3 developer.",
      virtual: true,
    },
    {
      id: "EVENT-006",
      title: "Crypto Regulation Forum",
      organizer: "Blockchain Policy Institute",
      date: "2023-12-12",
      endDate: "2023-12-13",
      location: "Washington, DC",
      price: 249,
      category: "conference",
      tags: ["Regulation", "Policy", "Compliance"],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN61xD01isxumMTf3DoIeC_waIpTtFCjKuKA&s",
      featured: false,
      trending: false,
      rating: 4.4,
      reviewCount: 38,
      attendees: 400,
      description:
        "A forum discussing the latest regulatory developments affecting the cryptocurrency and blockchain industry.",
      virtual: false,
    },
  ]

  // Filter events based on active tab, search term, and filters
  const filteredEvents = events.filter((event) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "featured" && event.featured) ||
      (activeTab === "trending" && event.trending) ||
      (activeTab === "virtual" && event.virtual)

    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter

    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "free" && event.price === 0) ||
      (priceFilter === "paid" && event.price > 0) ||
      (priceFilter === "under100" && event.price < 100) ||
      (priceFilter === "100to500" && event.price >= 100 && event.price <= 500)

    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "upcoming" && new Date(event.date) > new Date()) ||
      (dateFilter === "thisMonth" &&
        new Date(event.date).getMonth() === new Date().getMonth() &&
        new Date(event.date).getFullYear() === new Date().getFullYear())

    return matchesTab && matchesSearch && matchesCategory && matchesPrice && matchesDate
  })

  const handleEventClick = (event) => {
    setSelectedEvent(event)
  }

  const handleCloseDetails = () => {
    setSelectedEvent(null)
  }

  return (
    <div className="p-6">
      {selectedEvent ? (
        <EventDetails event={selectedEvent} onClose={handleCloseDetails} />
      ) : (












        <div className="space-y-6 text-white">

        {/* Partner Promotions */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Partner Promotions</h2>
              <button className="text-blue-400 hover:text-blue-300 text-sm">View All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                <h3 className="text-xl font-bold mb-2 relative z-10">Special Discount: 20% Off</h3>
                <p className="text-slate-300 mb-4 relative z-10">
                  Use code <span className="font-mono bg-white/20 px-2 py-1 rounded">BLOCKCHAIN20</span> for 20% off any
                  course
                </p>
                <button className="bg-white text-blue-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors relative z-10">
                  Claim Offer
                </button>
              </div>
              <div className="bg-gradient-to-r from-green-900 to-teal-900 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                <h3 className="text-xl font-bold mb-2 relative z-10">Early Bird: Conference Pass</h3>
                <p className="text-slate-300 mb-4 relative z-10">
                  Save $100 on Blockchain Summit tickets before December 1st
                </p>
                <button className="bg-white text-green-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors relative z-10">
                  Register Now
                </button>
              </div>
            </div>
          </div>









        {/* Event Categories */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <h2 className="text-lg font-bold mb-4">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-700 rounded-xl p-4 cursor-pointer"
                onClick={() => setCategoryFilter("conference")}
              >
                <div className="h-12 w-12 rounded-full bg-blue-600/20 flex items-center justify-center mb-3">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="font-bold">Conferences</h3>
                <p className="text-sm text-slate-400">
                  {events.filter((e) => e.category === "conference").length} events
                </p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-700 rounded-xl p-4 cursor-pointer"
                onClick={() => setCategoryFilter("workshop")}
              >
                <div className="h-12 w-12 rounded-full bg-green-600/20 flex items-center justify-center mb-3">
                  <BookOpen className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="font-bold">Workshops</h3>
                <p className="text-sm text-slate-400">
                  {events.filter((e) => e.category === "workshop").length} events
                </p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-700 rounded-xl p-4 cursor-pointer"
                onClick={() => setCategoryFilter("course")}
              >
                <div className="h-12 w-12 rounded-full bg-purple-600/20 flex items-center justify-center mb-3">
                  <BookOpen className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="font-bold">Courses</h3>
                <p className="text-sm text-slate-400">{events.filter((e) => e.category === "course").length} events</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-700 rounded-xl p-4 cursor-pointer"
                onClick={() => setCategoryFilter("exhibition")}
              >
                <div className="h-12 w-12 rounded-full bg-yellow-600/20 flex items-center justify-center mb-3">
                  <Globe className="h-6 w-6 text-yellow-400" />
                </div>
                <h3 className="font-bold">Exhibitions</h3>
                <p className="text-sm text-slate-400">
                  {events.filter((e) => e.category === "exhibition").length} events
                </p>
              </motion.div>
            </div>
          </div>

          









          

          {/* Featured Events Carousel */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <h2 className="text-lg font-bold mb-4">Featured Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {events
                .filter((event) => event.featured)
                .slice(0, 3)
                .map((event) => (
                  <motion.div
                    key={event.id}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="relative rounded-xl overflow-hidden cursor-pointer h-64"
                    onClick={() => handleEventClick(event)}
                  >
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                      <div className="flex items-center mb-2">
                        <Calendar className="h-4 w-4 text-slate-300 mr-1" />
                        <span className="text-xs text-slate-300">{new Date(event.date).toLocaleDateString()}</span>
                        {event.virtual && (
                          <span className="ml-2 bg-blue-500/80 text-white text-xs px-2 py-0.5 rounded-full">
                            Virtual
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-white text-lg mb-1">{event.title}</h3>
                      <p className="text-sm text-slate-300 mb-2">By {event.organizer}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-white text-sm">{event.rating}</span>
                          <span className="text-slate-400 text-xs ml-1">({event.reviewCount})</span>
                        </div>
                        <span className="text-white font-bold">{event.price === 0 ? "Free" : `$${event.price}`}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="flex space-x-1 bg-slate-700 p-1 rounded-lg">
                <button
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "all" ? "bg-slate-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("all")}
                >
                  All
                </button>
                <button
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "featured" ? "bg-slate-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("featured")}
                >
                  Featured
                </button>
                <button
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "trending" ? "bg-slate-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("trending")}
                >
                  Trending
                </button>
                <button
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "virtual" ? "bg-slate-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("virtual")}
                >
                  Virtual
                </button>
              </div>

              <div className="flex items-center space-x-3 w-full md:w-auto">
                <div className="relative flex-grow md:flex-grow-0">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
                  />
                </div>
                <div className="flex space-x-2">
                  <div className="relative">
                    <button
                      className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors flex items-center"
                      onClick={() => setFilterOpen(!filterOpen)}
                    >
                      <Filter className="h-4 w-4" />
                    </button>
                    {filterOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-slate-700 rounded-lg shadow-lg z-10 p-4">
                        <h3 className="text-sm font-medium mb-2">Category</h3>
                        <div className="space-y-1 mb-4">
                          <button
                            className={`w-full text-left px-2 py-1 text-sm rounded-md ${
                              categoryFilter === "all" ? "bg-slate-600" : "hover:bg-slate-600"
                            }`}
                            onClick={() => setCategoryFilter("all")}
                          >
                            All Categories
                          </button>
                          <button
                            className={`w-full text-left px-2 py-1 text-sm rounded-md ${
                              categoryFilter === "conference" ? "bg-slate-600" : "hover:bg-slate-600"
                            }`}
                            onClick={() => setCategoryFilter("conference")}
                          >
                            Conferences
                          </button>
                          <button
                            className={`w-full text-left px-2 py-1 text-sm rounded-md ${
                              categoryFilter === "workshop" ? "bg-slate-600" : "hover:bg-slate-600"
                            }`}
                            onClick={() => setCategoryFilter("workshop")}
                          >
                            Workshops
                          </button>
                          <button
                            className={`w-full text-left px-2 py-1 text-sm rounded-md ${
                              categoryFilter === "course" ? "bg-slate-600" : "hover:bg-slate-600"
                            }`}
                            onClick={() => setCategoryFilter("course")}
                          >
                            Courses
                          </button>
                          <button
                            className={`w-full text-left px-2 py-1 text-sm rounded-md ${
                              categoryFilter === "exhibition" ? "bg-slate-600" : "hover:bg-slate-600"
                            }`}
                            onClick={() => setCategoryFilter("exhibition")}
                          >
                            Exhibitions
                          </button>
                        </div>

                        <h3 className="text-sm font-medium mb-2">Price</h3>
                        <div className="space-y-1 mb-4">
                          <button
                            className={`w-full text-left px-2 py-1 text-sm rounded-md ${
                              priceFilter === "all" ? "bg-slate-600" : "hover:bg-slate-600"
                            }`}
                            onClick={() => setPriceFilter("all")}
                          >
                            All Prices
                          </button>
                          <button
                            className={`w-full text-left px-2 py-1 text-sm rounded-md ${
                              priceFilter === "free" ? "bg-slate-600" : "hover:bg-slate-600"
                            }`}
                            onClick={() => setPriceFilter("free")}
                          >
                            Free
                          </button>
                          <button
                            className={`w-full text-left px-2 py-1 text-sm rounded-md ${
                              priceFilter === "under100" ? "bg-slate-600" : "hover:bg-slate-600"
                            }`}
                            onClick={() => setPriceFilter("under100")}
                          >
                            Under $100
                          </button>
                          <button
                            className={`w-full text-left px-2 py-1 text-sm rounded-md ${
                              priceFilter === "100to500" ? "bg-slate-600" : "hover:bg-slate-600"
                            }`}
                            onClick={() => setPriceFilter("100to500")}
                          >
                            $100 - $500
                          </button>
                        </div>

                        <h3 className="text-sm font-medium mb-2">Date</h3>
                        <div className="space-y-1">
                          <button
                            className={`w-full text-left px-2 py-1 text-sm rounded-md ${
                              dateFilter === "all" ? "bg-slate-600" : "hover:bg-slate-600"
                            }`}
                            onClick={() => setDateFilter("all")}
                          >
                            All Dates
                          </button>
                          <button
                            className={`w-full text-left px-2 py-1 text-sm rounded-md ${
                              dateFilter === "upcoming" ? "bg-slate-600" : "hover:bg-slate-600"
                            }`}
                            onClick={() => setDateFilter("upcoming")}
                          >
                            Upcoming
                          </button>
                          <button
                            className={`w-full text-left px-2 py-1 text-sm rounded-md ${
                              dateFilter === "thisMonth" ? "bg-slate-600" : "hover:bg-slate-600"
                            }`}
                            onClick={() => setDateFilter("thisMonth")}
                          >
                            This Month
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex bg-slate-700 p-1 rounded-lg">
                    <button
                      className={`p-1.5 rounded-md transition-colors ${
                        viewMode === "grid" ? "bg-slate-600 text-white" : "text-slate-400 hover:text-white"
                      }`}
                      onClick={() => setViewMode("grid")}
                      title="Grid View"
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      className={`p-1.5 rounded-md transition-colors ${
                        viewMode === "list" ? "bg-slate-600 text-white" : "text-slate-400 hover:text-white"
                      }`}
                      onClick={() => setViewMode("list")}
                      title="List View"
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {filteredEvents.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto text-slate-600 mb-4" />
                <h3 className="text-lg font-medium mb-2">No events found</h3>
                <p className="text-slate-400 mb-6">Try adjusting your search or filters</p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} onClick={() => handleEventClick(event)} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <EventListItem key={event.id} event={event} onClick={() => handleEventClick(event)} />
                ))}
              </div>
            )}
          </div>

          
        </div>
      )}
    </div>
  )
}

function EventCard({ event, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-slate-700 rounded-xl overflow-hidden border border-slate-600 flex flex-col"
      onClick={onClick}
    >
      <div className="relative h-40 bg-slate-600">
        <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
        {event.trending && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            Trending
          </div>
        )}
        {event.virtual && (
          <div className="absolute top-2 left-2 bg-blue-500/80 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            Virtual
          </div>
        )}
      </div>

      <div className="p-4 flex-grow">
        <div className="flex items-center text-xs text-slate-400 mb-2">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{new Date(event.date).toLocaleDateString()}</span>
          {event.endDate && event.endDate !== event.date && (
            <span> - {new Date(event.endDate).toLocaleDateString()}</span>
          )}
        </div>

        <h3 className="font-bold text-white mb-1">{event.title}</h3>
        <p className="text-sm text-slate-400 mb-2">By {event.organizer}</p>

        <div className="flex items-center text-xs text-slate-400 mb-2">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{event.location}</span>
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
          {event.tags.slice(0, 2).map((tag, index) => (
            <span key={index} className="bg-slate-600 text-slate-300 text-xs px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
          {event.tags.length > 2 && (
            <span className="bg-slate-600 text-slate-300 text-xs px-2 py-0.5 rounded-full">
              +{event.tags.length - 2}
            </span>
          )}
        </div>
      </div>

      <div className="p-4 pt-0 flex items-center justify-between text-xs border-t border-slate-600 mt-2">
        <div className="flex items-center">
          <Star className="h-3 w-3 text-yellow-400 mr-1" />
          <span className="text-white">{event.rating}</span>
          <span className="text-slate-400 ml-1">({event.reviewCount})</span>
        </div>
        <span className="font-bold text-white">{event.price === 0 ? "Free" : `$${event.price}`}</span>
      </div>
    </motion.div>
  )
}

function EventListItem({ event, onClick }) {
  return (
    <motion.div
      whileHover={{ backgroundColor: "rgba(51, 65, 85, 0.5)" }}
      className="bg-slate-700 rounded-lg border border-slate-600 p-4 flex items-center cursor-pointer"
      onClick={onClick}
    >
      <div className="h-16 w-16 rounded-lg mr-4 flex-shrink-0 relative overflow-hidden">
        <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
        {event.virtual && (
          <div className="absolute bottom-0 right-0 bg-blue-500/80 rounded-tl-lg p-0.5">
            <Globe className="h-3 w-3 text-white" />
          </div>
        )}
      </div>

      <div className="flex-grow min-w-0">
        <div className="flex items-center">
          <h3 className="font-bold text-white">{event.title}</h3>
          {event.trending && (
            <span className="ml-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full flex items-center">
              <TrendingUp className="h-2 w-2 mr-0.5" />
              Trending
            </span>
          )}
        </div>
        <p className="text-sm text-slate-400">By {event.organizer}</p>
        <div className="flex items-center mt-1 text-xs text-slate-500">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{new Date(event.date).toLocaleDateString()}</span>
          <span className="mx-2">•</span>
          <MapPin className="h-3 w-3 mr-1" />
          <span>{event.location}</span>
          <span className="mx-2">•</span>
          <div className="flex items-center">
            <Star className="h-3 w-3 text-yellow-400 mr-1" />
            <span>{event.rating}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 ml-4">
        <span className="font-bold text-white">{event.price === 0 ? "Free" : `$${event.price}`}</span>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            // Handle registration
          }}
        >
          Register
        </button>
      </div>
    </motion.div>
  )
}

function EventDetails({ event, onClose }) {
  const [activeTab, setActiveTab] = useState("details")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <button
          onClick={onClose}
          className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
        >
          <ChevronDown className="h-4 w-4 mr-2 rotate-90" />
          Back to Marketplace
        </button>
        <div className="flex space-x-2">
          <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
            <Ticket className="h-4 w-4 mr-2" />
            Register Now
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="relative h-64">
            <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
              <div className="flex items-center mb-2">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium bg-${
                    event.category === "conference"
                      ? "blue"
                      : event.category === "workshop"
                        ? "green"
                        : event.category === "course"
                          ? "purple"
                          : "yellow"
                  }-500/80 text-white mr-2`}
                >
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </span>
                {event.virtual && (
                  <span className="bg-blue-500/80 text-white text-xs px-2 py-0.5 rounded-full">Virtual</span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">{event.title}</h1>
              <div className="flex items-center text-slate-300 text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
                {event.endDate && event.endDate !== event.date && (
                  <span> - {new Date(event.endDate).toLocaleDateString()}</span>
                )}
                <span className="mx-2">•</span>
                <MapPin className="h-4 w-4 mr-1" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>

          <div className="p-6 border-b border-slate-700">
            <div className="flex space-x-1 bg-slate-700 p-1 rounded-lg">
              <button
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "details" ? "bg-slate-600 text-white" : "text-slate-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("details")}
              >
                Details
              </button>
              <button
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "schedule" ? "bg-slate-600 text-white" : "text-slate-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("schedule")}
              >
                Schedule
              </button>
              <button
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "speakers" ? "bg-slate-600 text-white" : "text-slate-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("speakers")}
              >
                Speakers
              </button>
              <button
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "reviews" ? "bg-slate-600 text-white" : "text-slate-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews
              </button>
            </div>
          </div>

          <div className="p-6 text-white">
            {activeTab === "details" && (
              <div>
                <h2 className="text-lg font-bold mb-4">About This Event</h2>
                <p className="text-slate-400 mb-6">{event.description}</p>

                <h3 className="font-medium mb-2">What You'll Learn</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-green-600/20 flex items-center justify-center mr-2 mt-0.5">
                      <Check className="h-3 w-3 text-green-400" />
                    </div>
                    <span className="text-slate-300">In-depth knowledge of {event.tags[0]}</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-green-600/20 flex items-center justify-center mr-2 mt-0.5">
                      <Check className="h-3 w-3 text-green-400" />
                    </div>
                    <span className="text-slate-300">Practical skills in {event.tags[1]}</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-green-600/20 flex items-center justify-center mr-2 mt-0.5">
                      <Check className="h-3 w-3 text-green-400" />
                    </div>
                    <span className="text-slate-300">Networking opportunities with industry leaders</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-green-600/20 flex items-center justify-center mr-2 mt-0.5">
                      <Check className="h-3 w-3 text-green-400" />
                    </div>
                    <span className="text-slate-300">Certificate of completion (for eligible events)</span>
                  </li>
                </ul>

                <h3 className="font-medium mb-2">Event Tags</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {event.tags.map((tag, index) => (
                    <span key={index} className="bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="bg-slate-700 rounded-lg p-4 mb-6">
                  <h3 className="font-medium mb-2">Event Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-400">Date & Time</p>
                      <p className="text-white">
                        {new Date(event.date).toLocaleDateString()} -{" "}
                        {event.endDate && new Date(event.endDate).toLocaleDateString()}
                      </p>
                      <p className="text-white">9:00 AM - 5:00 PM</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Location</p>
                      <p className="text-white">{event.location}</p>
                      {!event.virtual && <p className="text-slate-400 text-sm">View on map</p>}
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Organizer</p>
                      <p className="text-white">{event.organizer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Attendees</p>
                      <p className="text-white">{event.attendees} registered</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "schedule" && (
              <div>
                <h2 className="text-lg font-bold mb-4">Event Schedule</h2>
                <div className="space-y-4">
                  <div className="bg-slate-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Day 1: Opening & Keynotes</h3>
                        <p className="text-sm text-slate-400">{new Date(event.date).toLocaleDateString()}</p>
                      </div>
                      <span className="text-sm text-slate-400">9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="space-y-3 mt-4">
                      <div className="flex">
                        <div className="text-sm text-slate-400 w-20">9:00 AM</div>
                        <div>
                          <p className="font-medium">Registration & Welcome Coffee</p>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-sm text-slate-400 w-20">10:00 AM</div>
                        <div>
                          <p className="font-medium">Opening Keynote: The Future of Blockchain</p>
                          <p className="text-sm text-slate-400">By John Smith, CEO of BlockTech</p>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-sm text-slate-400 w-20">12:00 PM</div>
                        <div>
                          <p className="font-medium">Lunch Break & Networking</p>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-sm text-slate-400 w-20">1:30 PM</div>
                        <div>
                          <p className="font-medium">Panel Discussion: Industry Trends</p>
                          <p className="text-sm text-slate-400">With industry experts</p>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-sm text-slate-400 w-20">3:30 PM</div>
                        <div>
                          <p className="font-medium">Workshop Sessions</p>
                          <p className="text-sm text-slate-400">Multiple tracks available</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {event.endDate && event.endDate !== event.date && (
                    <div className="bg-slate-700 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">Day 2: Deep Dives & Workshops</h3>
                          <p className="text-sm text-slate-400">{new Date(event.endDate).toLocaleDateString()}</p>
                        </div>
                        <span className="text-sm text-slate-400">9:00 AM - 5:00 PM</span>
                      </div>
                      <div className="space-y-3 mt-4">
                        <div className="flex">
                          <div className="text-sm text-slate-400 w-20">9:00 AM</div>
                          <div>
                            <p className="font-medium">Morning Sessions</p>
                          </div>
                        </div>
                        <div className="flex">
                          <div className="text-sm text-slate-400 w-20">11:00 AM</div>
                          <div>
                            <p className="font-medium">Technical Workshops</p>
                            <p className="text-sm text-slate-400">Hands-on learning</p>
                          </div>
                        </div>
                        <div className="flex">
                          <div className="text-sm text-slate-400 w-20">12:30 PM</div>
                          <div>
                            <p className="font-medium">Lunch Break</p>
                          </div>
                        </div>
                        <div className="flex">
                          <div className="text-sm text-slate-400 w-20">2:00 PM</div>
                          <div>
                            <p className="font-medium">Closing Keynote</p>
                            <p className="text-sm text-slate-400">Future directions and Q&A</p>
                          </div>
                        </div>
                        <div className="flex">
                          <div className="text-sm text-slate-400 w-20">4:00 PM</div>
                          <div>
                            <p className="font-medium">Networking Reception</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "speakers" && (
              <div>
                <h2 className="text-lg font-bold mb-4">Featured Speakers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-700 rounded-lg p-4 flex">
                    <div className="h-16 w-16 rounded-full bg-slate-600 mr-4"></div>
                    <div>
                      <h3 className="font-bold">John Smith</h3>
                      <p className="text-sm text-slate-400">CEO, BlockTech</p>
                      <p className="text-sm text-slate-300 mt-2">
                        Blockchain pioneer with 15+ years of experience in the industry.
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-700 rounded-lg p-4 flex">
                    <div className="h-16 w-16 rounded-full bg-slate-600 mr-4"></div>
                    <div>
                      <h3 className="font-bold">Sarah Johnson</h3>
                      <p className="text-sm text-slate-400">CTO, CryptoInnovate</p>
                      <p className="text-sm text-slate-300 mt-2">
                        Leading expert in cryptocurrency and blockchain security.
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-700 rounded-lg p-4 flex">
                    <div className="h-16 w-16 rounded-full bg-slate-600 mr-4"></div>
                    <div>
                      <h3 className="font-bold">Michael Chen</h3>
                      <p className="text-sm text-slate-400">Founder, DeFi Alliance</p>
                      <p className="text-sm text-slate-300 mt-2">
                        Visionary in decentralized finance and Web3 applications.
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-700 rounded-lg p-4 flex">
                    <div className="h-16 w-16 rounded-full bg-slate-600 mr-4"></div>
                    <div>
                      <h3 className="font-bold">Emily Rodriguez</h3>
                      <p className="text-sm text-slate-400">Lead Developer, Ethereum Foundation</p>
                      <p className="text-sm text-slate-300 mt-2">
                        Smart contract specialist and open-source contributor.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Reviews & Ratings</h2>
                  <button className="text-blue-400 hover:text-blue-300 text-sm">Write a Review</button>
                </div>

                <div className="bg-slate-700 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <div className="text-4xl font-bold mr-4">{event.rating}</div>
                    <div>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${star <= Math.round(event.rating) ? "text-yellow-400" : "text-slate-600"}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-slate-400">{event.reviewCount} reviews</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-slate-600 mr-3"></div>
                        <div>
                          <h3 className="font-medium">Alex Thompson</h3>
                          <p className="text-xs text-slate-400">2 days ago</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className={`h-4 w-4 ${star <= 5 ? "text-yellow-400" : "text-slate-600"}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-300">
                      Excellent event! The speakers were knowledgeable and the networking opportunities were invaluable.
                      I learned so much about the latest trends in blockchain technology.
                    </p>
                  </div>

                  <div className="bg-slate-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-slate-600 mr-3"></div>
                        <div>
                          <h3 className="font-medium">Jamie Wilson</h3>
                          <p className="text-xs text-slate-400">1 week ago</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className={`h-4 w-4 ${star <= 4 ? "text-yellow-400" : "text-slate-600"}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-300">
                      Great content and well-organized event. Would have liked more time for Q&A sessions, but overall
                      it was a valuable experience.
                    </p>
                  </div>

                  <div className="bg-slate-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-slate-600 mr-3"></div>
                        <div>
                          <h3 className="font-medium">Taylor Reed</h3>
                          <p className="text-xs text-slate-400">2 weeks ago</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className={`h-4 w-4 ${star <= 5 ? "text-yellow-400" : "text-slate-600"}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-300">
                      One of the best blockchain events I've attended. The workshops were practical and I made some
                      great connections. Looking forward to next year's event!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden text-white">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-lg font-bold">Registration</h2>
          </div>
          <div className="p-6">
            <div className="bg-slate-700 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Ticket Price</h3>
                <span className="text-xl font-bold">{event.price === 0 ? "Free" : `$${event.price}`}</span>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Registration Fee</span>
                  <span>{event.price === 0 ? "Free" : `$${event.price}`}</span>
                </div>
                {event.price > 0 && (
                  <>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Processing Fee</span>
                      <span>${(event.price * 0.05).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm font-medium pt-2 border-t border-slate-600">
                      <span>Total</span>
                      <span>${(event.price * 1.05).toFixed(2)}</span>
                    </div>
                  </>
                )}
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center">
                <Ticket className="h-4 w-4 mr-2" />
                Register Now
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-blue-600/20 flex items-center justify-center mr-3 mt-0.5">
                  <Users className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">Limited Capacity</p>
                  <p className="text-sm text-slate-400">Only {Math.floor(event.attendees * 0.2)} spots remaining</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-green-600/20 flex items-center justify-center mr-3 mt-0.5">
                  <ShoppingBag className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <p className="font-medium">What's Included</p>
                  <ul className="text-sm text-slate-400 space-y-1 mt-1">
                    <li className="flex items-center">
                      <Check className="h-3 w-3 mr-1 text-green-400" />
                      Full event access
                    </li>
                    <li className="flex items-center">
                      <Check className="h-3 w-3 mr-1 text-green-400" />
                      Event materials
                    </li>
                    <li className="flex items-center">
                      <Check className="h-3 w-3 mr-1 text-green-400" />
                      Certificate of attendance
                    </li>
                    {event.price > 100 && (
                      <li className="flex items-center">
                        <Check className="h-3 w-3 mr-1 text-green-400" />
                        Lunch and refreshments
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-yellow-600/20 flex items-center justify-center mr-3 mt-0.5">
                  <Info className="h-4 w-4 text-yellow-400" />
                </div>
                <div>
                  <p className="font-medium">Cancellation Policy</p>
                  <p className="text-sm text-slate-400">Free cancellation up to 7 days before the event</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-700">
              <h3 className="font-medium mb-3">Share This Event</h3>
              <div className="flex space-x-2">
                <button className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-full">
                  <ExternalLink className="h-4 w-4" />
                </button>
                <button className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-full">
                  <MessageSquare className="h-4 w-4" />
                </button>
                <button className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-full">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-slate-700">
            <h2 className="text-lg font-bold mb-4">Similar Events</h2>
            <div className="space-y-3">
              <div className="bg-slate-700 rounded-lg p-3 flex items-center">
                <div className="h-12 w-12 rounded-lg bg-slate-600 mr-3"></div>
                <div className="flex-grow min-w-0">
                  <h3 className="font-medium text-sm truncate">Web3 Developer Conference</h3>
                  <p className="text-xs text-slate-400">Jan 15, 2024 • San Francisco</p>
                </div>
                <span className="text-sm font-bold">$249</span>
              </div>
              <div className="bg-slate-700 rounded-lg p-3 flex items-center">
                <div className="h-12 w-12 rounded-lg bg-slate-600 mr-3"></div>
                <div className="flex-grow min-w-0">
                  <h3 className="font-medium text-sm truncate">DeFi Summit 2024</h3>
                  <p className="text-xs text-slate-400">Feb 10, 2024 • Online</p>
                </div>
                <span className="text-sm font-bold">$199</span>
              </div>
              <div className="bg-slate-700 rounded-lg p-3 flex items-center">
                <div className="h-12 w-12 rounded-lg bg-slate-600 mr-3"></div>
                <div className="flex-grow min-w-0">
                  <h3 className="font-medium text-sm truncate">NFT Art Exhibition</h3>
                  <p className="text-xs text-slate-400">Dec 20, 2023 • Los Angeles</p>
                </div>
                <span className="text-sm font-bold">Free</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

