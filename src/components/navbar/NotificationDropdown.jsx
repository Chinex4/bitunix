import { useRef } from "react";
import { Bell, ChevronLeft, ChevronRight } from "lucide-react";

const NotificationDropdown = ({
  unread,
  dropdowns,
  setDropdowns,
  activeTab,
  setActiveTab,
  filteredNotifications,
  markAllAsRead,
}) => {
  const dropdownRef = useRef(null);

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        className='btn btn-ghost btn-sm relative'
        onClick={() =>
          setDropdowns({
            notifications: !dropdowns.notifications,
            assets: false,
            user: false,
          })
        }
      >
        <Bell size={15} />
        {unread > 0 && (
          <span className='absolute -top-1 -right-1 bg-red-500 text-[10px] text-white rounded-full w-4 h-4 flex items-center justify-center'>
            {unread}
          </span>
        )}
      </button>

      {dropdowns.notifications && (
        <div className='absolute -right-20 md:right-0 mt-3 w-[400px] md:w-[500px] bg-[#121212] text-white rounded-lg border border-neutral/20 shadow-xl p-4 z-50 max-h-[400px] overflow-y-auto no-scrollbar'>
          <div className='flex justify-between items-center mb-3'>
            <h3 className='text-lg font-semibold border-b border-gray-600 w-full pb-2'>
              Messages
            </h3>
            <button
              onClick={markAllAsRead}
              className='text-[12px] text-lime-400 underline ml-2'
            >
              Mark all as read
            </button>
          </div>

          {/* Scrollable Tabs */}
          <div className='relative mb-4'>
            <button
              onClick={() => {
                document.getElementById("tabScroll").scrollLeft -= 100;
              }}
              className='absolute left-0 top-0 h-full z-10 px-2 bg-gradient-to-r from-[#121212] to-transparent'
            >
              <ChevronLeft size={16} className='text-white' />
            </button>

            <div
              id='tabScroll'
              className='flex gap-2 overflow-x-auto no-scrollbar text-xs font-medium px-6'
            >
              {["All", "Price Alert", "New Listings", "Latest"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 whitespace-nowrap rounded-full border ${
                    activeTab === tab ?
                      "bg-lime-400 text-black"
                    : "border-gray-600 text-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                document.getElementById("tabScroll").scrollLeft += 100;
              }}
              className='absolute right-0 top-0 h-full z-10 px-2 bg-gradient-to-l from-[#121212] to-transparent'
            >
              <ChevronRight size={16} className='text-white' />
            </button>
          </div>

          {filteredNotifications.length === 0 ?
            <p className='text-sm text-gray-400'>
              No notifications for "{activeTab}"
            </p>
          : filteredNotifications.map((item) => (
              <div key={item.id} className='pb-2 mb-3 border-b border-gray-700'>
                <p className='font-semibold'>{item.title}</p>
                <p className='text-xs text-white/50'>{item.content}</p>
                <p className='text-[10px] text-gray-500 mt-1'>{item.date}</p>
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
