"use client";
import { useEffect, useState } from 'react';
import { fetchAdminUsers, updateUserRole } from '@/lib/api-client';
import type { User } from '@/types/admin';

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => { fetchAdminUsers().then(u => setUsers(u || [])); }, []);

  async function changeRole(id: string, role: string) {
    const updated = await updateUserRole(id, role);
    setUsers(cur => cur.map(x => x.id === id ? updated : x));
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl">Users</h2>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {users.map(u => (
          <div key={u.id} className="card p-4 flex justify-between items-center">
            <div>
              <p className="font-sans">{u.firstName} {u.lastName} — <span className="text-body-sm text-ivory-200/70">{u.email}</span></p>
            </div>
            <div className="flex gap-2">
              <select value={u.role} onChange={(e)=>changeRole(u.id, e.target.value)} className="input-luxury">
                <option value="USER">User</option>
                <option value="VENDOR">Vendor</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
