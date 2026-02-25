import React from 'react';
import Button from '../../ui/button';

const SettingsPage: React.FC = () => {
  return (
    <div className="max-w-2xl space-y-8 animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Business Settings</h2>
      <div className="p-8 rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 shadow-sm space-y-6">
        <h3 className="font-bold text-lg">General Information</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-500">Business Name</label>
            <input
              type="text"
              className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5"
              defaultValue="NEXORA Systems"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-500">Contact Email</label>
            <input
              type="email"
              className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5"
              defaultValue="admin@nexora.com"
            />
          </div>
        </div>

        <h3 className="font-bold text-lg pt-4 border-t border-gray-100 dark:border-white/5">Working Hours</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-white/5">
            <span className="text-sm font-medium">Weekdays</span>
            <span className="text-xs text-gray-500">09:00 - 18:00</span>
          </div>
          <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-white/5">
            <span className="text-sm font-medium">Weekends</span>
            <span className="text-xs text-gray-500">Closed</span>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button>Save Settings</Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

