"use client";

import { useState } from "react";
import type { Service } from "@/types";

interface BookingFormProps {
  services: Service[];
}


export function BookingForm({ services }: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    weddingDate: "",
    preferredDate: "",
    preferredTime: "",
    serviceId: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit booking");
      }

      setSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        weddingDate: "",
        preferredDate: "",
        preferredTime: "",
        serviceId: "",
        notes: "",
      });

      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 card-glass p-6 md:p-8">
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium">✓ Booking submitted successfully! We will contact you within 24 hours.</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-medium">✗ {error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="label-luxury" htmlFor="firstName">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="input-luxury"
            placeholder="Evelyn"
            disabled={isSubmitting}
          />
        </div>
        <div className="space-y-1.5">
          <label className="label-luxury" htmlFor="lastName">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="input-luxury"
            placeholder="Monroe"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="label-luxury" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="input-luxury"
          placeholder="evelyn@example.com"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-1.5">
        <label className="label-luxury" htmlFor="phone">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          pattern="[0-9+\s\-()]*"
          value={formData.phone}
          onChange={handleChange}
          className="input-luxury"
          placeholder="+91 XXXXX XXXXX"
          disabled={isSubmitting}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="label-luxury" htmlFor="weddingDate">
            Wedding Date
          </label>
          <input
            id="weddingDate"
            name="weddingDate"
            type="date"
            required
            value={formData.weddingDate}
            onChange={handleChange}
            className="input-luxury"
            disabled={isSubmitting}
          />
        </div>
        <div className="space-y-1.5">
          <label className="label-luxury" htmlFor="preferredDate">
            Preferred Consult Date
          </label>
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            required
            value={formData.preferredDate}
            onChange={handleChange}
            className="input-luxury"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="label-luxury" htmlFor="preferredTime">
          Preferred Time
        </label>
        <input
          id="preferredTime"
          name="preferredTime"
          type="time"
          required
          value={formData.preferredTime}
          onChange={handleChange}
          className="input-luxury"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-1.5">
  <label className="label-luxury" htmlFor="serviceId">
    Service of Interest
  </label>

  <select
    id="serviceId"
    name="serviceId"
    required
    value={formData.serviceId}
    onChange={handleChange}
    className="input-luxury"
    disabled={isSubmitting}
  >
    <option value="">Select a service...</option>

    {services?.length > 0 ? (
      services.map((s: any) => (
        <option key={s.id} value={s.id}>
          {s.title || s.name || `Service ${s.id}`}
        </option>
      ))
    ) : (
      <option disabled>No services available</option>
    )}
  </select>
</div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-luxury w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Submit Consultation Request"}
      </button>
    </form>
  );
}
