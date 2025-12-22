import { useState } from 'react';
import { Bell } from 'lucide-react';

type Notification = {
  id: number;
  timestamp: string;
  time: string;
  message: string;
  avatar: string;
  read: boolean;
};

type NotificationGroup = {
  timestamp: string;
  items: Notification[];
};

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      timestamp: 'Today',
      time: '3 hr ago',
      message: '3 new users registered today.',
      avatar: '👤',
      read: false
    },
    {
      id: 2,
      timestamp: 'Today',
      time: 'm hr ago',
      message: '3 new users registered today.',
      avatar: '👤',
      read: false
    },
    {
      id: 3,
      timestamp: 'Today',
      time: '1 hr ago',
      message: '3 new users registered today.',
      avatar: '👤',
      read: true
    },
    {
      id: 4,
      timestamp: 'Today',
      time: '1 hr ago',
      message: '3 new users registered today.',
      avatar: '👤',
      read: true
    },
    {
      id: 5,
      timestamp: 'Yesterday',
      time: '1 d ago',
      message: '3 new users registered today.',
      avatar: '👤',
      read: true
    },
    {
      id: 6,
      timestamp: 'Yesterday',
      time: '1 hr ago',
      message: '3 new users registered today.',
      avatar: '👤',
      read: true
    },
    {
      id: 7,
      timestamp: 'Yesterday',
      time: '1 hr ago',
      message: '3 new users registered today.',
      avatar: '👤',
      read: true
    },
    {
      id: 8,
      timestamp: 'Yesterday',
      time: '1 hr ago',
      message: '3 new users registered today.',
      avatar: '👤',
      read: true
    }
  ]);

  // Group notifications by timestamp
  const groupedNotifications: NotificationGroup[] = notifications.reduce<NotificationGroup[]>((acc, notif) => {
    const group = acc.find(g => g.timestamp === notif.timestamp);
    if (group) {
      group.items.push(notif);
    } else {
      acc.push({ timestamp: notif.timestamp, items: [notif] });
    }
    return acc;
  }, []);

  // Read All Button Handler
  const handleReadAll = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Calculate if there are any unread notifications
  const hasUnread = notifications.some(n => !n.read);

  return (
    <div className=" bg-gray-50">
      <div>
        <div className="bg-white">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
            <button
              className={`flex items-center gap-2 px-5 py-2 rounded-lg bg-primary hover:bg-primary transition text-white text-sm font-semibold shadow-sm`}
              onClick={handleReadAll}
              disabled={!hasUnread}
              style={{
                opacity: hasUnread ? 1 : 0.6,
                cursor: hasUnread ? 'pointer' : 'not-allowed'
              }}
              type="button"
            >
              Mark all as read
            </button>
          </div>
          {groupedNotifications.map((group) => (
            <div key={group.timestamp}>
              {/* Group Header */}
              <div className="px-6 py-3 ">
                <p className="text-sm font-medium text-gray-600">{group.timestamp}</p>
              </div>

              {/* Notification Items */}
              {group.items.map((notif) => (
                <div
                  key={notif.id}
                  className={`px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer flex items-start gap-4 `}
                >
                  {/* Status Indicator */}
                  <div className={`w-2.5 h-2.5 mt-4 rounded-full flex-shrink-0 ${
                    !notif.read ? 'bg-primary' : 'bg-transparent'
                  }`} />

                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-[#2E4F3E26] flex-shrink-0 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">{notif.avatar}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <p className="text-gray-900 font-medium">{notif.message}</p>
                      <p className="text-sm text-gray-500 mt-1">{notif.time}</p>
                    </div>
                    {/* Remove the individual read/unread label */}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Empty State Fallback */}
        {groupedNotifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Bell className="w-12 h-12 text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">No notifications</p>
            <p className="text-sm text-gray-400">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
}