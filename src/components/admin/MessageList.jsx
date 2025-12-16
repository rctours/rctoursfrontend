import React from 'react';
import { Mail, MapPin, Calendar, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MessageList = ({ messages = [] }) => {

  // 1. Sort messages by Date (Newest First)
  // We use [...messages] to create a copy so we don't mutate the original prop
  const sortedMessages = [...messages].sort((a, b) => {
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  });

  // Helper to format date to "Time Ago"
  const formatTimeAgo = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  // Helper to get specific time
  const getExactTime = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <section className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 max-w-2xl w-full">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <div className="p-2 bg-red-100 rounded-lg">
              <Mail className="h-5 w-5 text-red-600" />
            </div>
            Latest Client Messages
          </h3>
          <p className="text-sm text-gray-500 mt-1 ml-11">
            You have {messages.length} total inquiries
          </p>
        </div>
        
        {messages.length > 3 && (
          <Link to="/admin/message">
            <button className="text-sm text-red-600 font-medium hover:text-red-700 flex items-center transition-colors">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </Link>
        )}
      </div>

      {/* Content Section */}
      <div className="space-y-4">
        {/* 2. Use sortedMessages here. 
            Change .slice(0, 3) to .slice(0, 1) if you strictly want ONLY the single most recent one. */}
        {sortedMessages?.slice(0, 3).map((message, index) => {
          
          const leadStatus = message?.leadStatus || "New";
          const name = message?.name || "Unknown Sender";
          const phoneNumber = message?.phoneNumber || "";
          const msg = message?.message || "";
          const travelDate = message?.date || "TBD";
          const destination = message?.destination || "Not specified";
          const rawDate = message?.createdAt;

          return (
            <div
              key={message?.id || index}
              className="group relative p-5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-red-100 hover:shadow-md transition-all duration-200"
            >
              {/* Top Row: Name, Status, and Time */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 text-base">{name}</span>
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-semibold border ${
                      leadStatus === 'New' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'
                    }`}>
                      {leadStatus}
                    </span>
                  </div>
                </div>

                {/* Time Display */}
                <div className="text-right" title={rawDate ? new Date(rawDate).toLocaleString() : ''}>
                  <span className="flex items-center text-xs font-medium text-gray-500">
                    {formatTimeAgo(rawDate)}
                  </span>
                  <span className="text-[10px] text-gray-400 block">
                    {getExactTime(rawDate)}
                  </span>
                </div>
              </div>

              {/* Middle Row: Metadata Grid */}
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-3 text-sm">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-3.5 w-3.5 mr-2 text-red-500" />
                  <span className="truncate font-medium">{destination}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <Calendar className="h-3.5 w-3.5 mr-2 text-blue-500" />
                  <span className="truncate">{travelDate}</span>
                </div>

                {phoneNumber && (
                  <div className="flex items-center text-gray-600 col-span-2 sm:col-span-1">
                    <Phone className="h-3.5 w-3.5 mr-2 text-green-600" />
                    <a
                      href={`tel:${phoneNumber}`}
                      className="hover:text-green-700 hover:underline transition-colors"
                    >
                      {phoneNumber}
                    </a>
                  </div>
                )}
              </div>

              {/* Bottom Row: Message content */}
              {msg && (
                <div className="mt-3 pt-3 border-t border-gray-200/60">
                  <p className="text-sm text-gray-600 italic line-clamp-2 leading-relaxed">
                    "{msg}"
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {/* Empty State */}
        {messages?.length === 0 && (
          <div className="py-12 flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
            <div className="bg-white p-3 rounded-full shadow-sm mb-3">
              <Mail className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-gray-900 font-medium">No new messages</p>
            <p className="text-gray-500 text-sm mt-1">Check back later for new inquiries.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MessageList;