import React from 'react';
import { Service } from '../../../lib/types';
import Button from '../../ui/button';

interface ServicesPageProps {
  services: Service[];
  isEditingService: boolean;
  currentService: Partial<Service>;
  setCurrentService: React.Dispatch<React.SetStateAction<Partial<Service>>>;
  setIsEditingService: React.Dispatch<React.SetStateAction<boolean>>;
  serviceSearch: string;
  onServiceSearchChange: (value: string) => void;
  serviceCategoryFilter: string;
  onServiceCategoryChange: (value: string) => void;
  categories: string[];
  onSaveService: (service: Partial<Service>) => void;
  onDeleteService: (id: string) => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({
  services,
  isEditingService,
  currentService,
  setCurrentService,
  setIsEditingService,
  serviceSearch,
  onServiceSearchChange,
  serviceCategoryFilter,
  onServiceCategoryChange,
  categories,
  onSaveService,
  onDeleteService,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Services</h2>
        <div className="flex flex-wrap gap-2">
          <input
            value={serviceSearch}
            onChange={(e) => onServiceSearchChange(e.target.value)}
            placeholder="Search services..."
            className="bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary text-gray-900 dark:text-white"
          />
          <select
            value={serviceCategoryFilter}
            onChange={(e) => onServiceCategoryChange(e.target.value)}
            className="bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary h-10 text-gray-900 dark:text-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <Button
          className="gap-2"
          onClick={() => {
            setCurrentService({ title: '', shortDesc: '', category: '', price: undefined });
            setIsEditingService(true);
          }}
        >
          + Add Service
        </Button>
      </div>

      {isEditingService ? (
        <div className="p-8 rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 shadow-sm">
          <h3 className="font-bold mb-6 text-gray-900 dark:text-white">Edit Service</h3>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-gray-500">Service Title</label>
                <input
                  type="text"
                  value={currentService.title || ''}
                  onChange={(e) => setCurrentService({ ...currentService, title: e.target.value })}
                  className="w-full bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-gray-500">Price ($)</label>
                <input
                  type="number"
                  value={currentService.price || ''}
                  onChange={(e) => setCurrentService({ ...currentService, price: Number(e.target.value) })}
                  className="w-full bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-gray-500">Category</label>
                <input
                  type="text"
                  value={currentService.category || ''}
                  onChange={(e) => setCurrentService({ ...currentService, category: e.target.value })}
                  className="w-full bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-gray-500">Duration (mins)</label>
                <input
                  type="number"
                  value={currentService.duration || ''}
                  onChange={(e) => setCurrentService({ ...currentService, duration: Number(e.target.value) })}
                  className="w-full bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase font-bold text-gray-500">Description</label>
              <textarea
                value={currentService.shortDesc || ''}
                onChange={(e) => setCurrentService({ ...currentService, shortDesc: e.target.value })}
                className="w-full h-32 bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none resize-none"
              />
            </div>
            <div className="flex justify-end gap-4">
              {currentService.id && (
                <Button type="button" variant="outline" onClick={() => onDeleteService(currentService.id as string)}>
                  Delete
                </Button>
              )}
              <Button type="button" variant="outline" onClick={() => setIsEditingService(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={() => onSaveService(currentService)} disabled={!currentService.title || !currentService.shortDesc || !currentService.category}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div key={service.id} className="p-6 rounded-3xl bg-white dark:bg-[#13161C] border border-gray-200 dark:border-white/5 group shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="font-bold text-xs">{service.category.substring(0, 3)}</span>
                </div>
                <button
                  onClick={() => {
                    setCurrentService(service);
                    setIsEditingService(true);
                  }}
                  className="px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-xs font-bold hover:bg-gray-200 dark:hover:bg-white/10"
                >
                  Edit
                </button>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{service.title}</h3>
              <p className="text-gray-500 text-sm line-clamp-2 mb-4">{service.shortDesc}</p>
              <p className="font-bold text-primary">${service.price || 'Custom'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
