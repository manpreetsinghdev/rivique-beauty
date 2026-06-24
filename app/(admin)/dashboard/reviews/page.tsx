"use client";
import { useEffect, useState } from 'react';
import { fetchAdminReviews, moderateReview } from '@/lib/api-client';
import type { Review } from '@/types/admin';

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => { fetchAdminReviews().then(r => setReviews(r || [])); }, []);

  async function takeAction(id: string, action: 'approve'|'remove') {
    const updated = await moderateReview(id, action);
    setReviews(cur => cur.filter(x => x.id !== id));
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl">Reviews</h2>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {reviews.map(r => (
          <div key={r.id} className="card p-4">
            <div className="flex justify-between">
              <div>
                <p className="font-sans"><strong>{r.user?.firstName}</strong> — <span className="text-body-sm text-ivory-200/70">{r.rating}/5</span></p>
                <p className="mt-2 text-body-sm text-ivory-200/70">{r.comment}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button className="btn-secondary" onClick={() => takeAction(r.id, 'approve')}>Approve</button>
                <button className="btn-ghost" onClick={() => takeAction(r.id, 'remove')}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
