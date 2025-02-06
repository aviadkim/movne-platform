import React, { useState } from 'react';

const AddClientForm = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    status: 'פעיל'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...formData, id: Date.now().toString() });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">שם</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          dir="rtl"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">טלפון</label>
        <input
          type="tel"
          required
          value={formData.phone}
          onChange={e => setFormData({...formData, phone: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          dir="rtl"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">אימייל</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          dir="rtl"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">סטטוס</label>
        <select
          value={formData.status}
          onChange={e => setFormData({...formData, status: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          dir="rtl"
        >
          <option value="פעיל">פעיל</option>
          <option value="לא פעיל">לא פעיל</option>
        </select>
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          ביטול
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-finance-300 rounded-md hover:bg-finance-400"
        >
          הוסף לקוח
        </button>
      </div>
    </form>
  );
};

export default AddClientForm;
