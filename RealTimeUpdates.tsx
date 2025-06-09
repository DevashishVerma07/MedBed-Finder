import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Bed, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { notificationService } from '../services/apiService';

interface Update {
  id: string;
  type: 'bed_update' | 'emergency' | 'info';
  hospitalId: string;
  hospitalName: string;
  message: string;
  timestamp: string;
  change?: number;
  bedType?: string;
}

export function RealTimeUpdates() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleUpdate = (data: any) => {
      const hospitalNames = [
        'AIIMS Delhi', 'Safdarjung Hospital', 'KEM Hospital', 'Victoria Hospital',
        'Medical College Kolkata', 'Rajiv Gandhi GH', 'Gandhi Hospital', 'SMS Hospital'
      ];
      
      const hospitalName = hospitalNames[parseInt(data.hospitalId) - 1] || 'Unknown Hospital';
      
      const newUpdate: Update = {
        id: Date.now().toString(),
        type: data.type,
        hospitalId: data.hospitalId,
        hospitalName,
        message: `${data.change > 0 ? 'New' : 'Occupied'} ${data.bedType} bed at ${hospitalName}`,
        timestamp: data.timestamp,
        change: data.change,
        bedType: data.bedType
      };

      setUpdates(prev => [newUpdate, ...prev.slice(0, 4)]); // Keep only 5 latest updates
    };

    notificationService.subscribe(handleUpdate);
    notificationService.connect();

    return () => {
      notificationService.unsubscribe(handleUpdate);
    };
  }, []);

  const removeUpdate = (id: string) => {
    setUpdates(prev => prev.filter(update => update.id !== id));
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isVisible || updates.length === 0) {
    return (
      <motion.button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-6 right-6 bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors duration-200 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Bell className="h-6 w-6" />
        {updates.length > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {updates.length}
          </div>
        )}
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed bottom-6 right-6 w-80 max-h-96 overflow-hidden bg-white rounded-xl shadow-xl border border-secondary-200 z-50"
    >
      <div className="bg-primary-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Bell className="h-5 w-5 mr-2" />
          <h3 className="font-semibold">Live Updates</h3>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-primary-700 rounded transition-colors duration-200"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      <div className="max-h-80 overflow-y-auto">
        <AnimatePresence>
          {updates.map((update) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 border-b border-secondary-100 hover:bg-secondary-50 transition-colors duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`p-2 rounded-lg ${
                    update.change && update.change > 0 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-orange-100 text-orange-600'
                  }`}>
                    {update.change && update.change > 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-secondary-900 mb-1">
                      {update.message}
                    </p>
                    <div className="flex items-center text-xs text-secondary-500">
                      <span>{formatTime(update.timestamp)}</span>
                      {update.bedType && (
                        <>
                          <span className="mx-1">•</span>
                          <span className="capitalize">{update.bedType}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeUpdate(update.id)}
                  className="p-1 text-secondary-400 hover:text-secondary-600 transition-colors duration-200"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {updates.length === 0 && (
        <div className="p-8 text-center text-secondary-500">
          <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No recent updates</p>
        </div>
      )}
    </motion.div>
  );
}