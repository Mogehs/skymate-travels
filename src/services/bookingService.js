import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";

/**
 * Save booking data to Firebase
 * @param {Object} bookingData - The booking information
 * @returns {Promise<string>} - Document ID of the created booking
 */
export const saveBookingToFirebase = async (bookingData) => {
  try {
    const bookingsRef = collection(db, "bookings");

    const docRef = await addDoc(bookingsRef, {
      ...bookingData,
      createdAt: serverTimestamp(),
      status: "pending",
    });

    console.log("✅ Booking saved to Firebase with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Error saving booking to Firebase:", error);
    throw error;
  }
};

/**
 * Process booking form submission
 * Handles both regular (round-trip/one-way) and multi-city bookings
 * @param {FormData} formData - Form data from the submission
 * @param {string} tripType - Type of trip (Round trip, One way, Multi-city)
 * @param {Array} cityPairs - Array of city pairs for multi-city (optional)
 * @returns {Promise<Object>} - Booking data object
 */
export const processBookingData = (formData, tripType, cityPairs = []) => {
  const bookingData = {
    tripType,
    packageName: formData.get("package"),
    passengerCount: parseInt(formData.get("adults")) || 1,
    cabinClass: formData.get("class"),
    personalInfo: {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
    },
    message: formData.get("message"),
    submissionTime: formData.get("submission_time"),
  };

  // Handle multi-city bookings
  if (tripType === "Multi-city") {
    bookingData.flights = cityPairs.map((pair, index) => ({
      flightNumber: index + 1,
      from: pair.from,
      to: pair.to,
      date: pair.date,
    }));
  } else {
    // Handle regular bookings (Round trip / One way)
    bookingData.origin = formData.get("origin");
    bookingData.destination = formData.get("destination");
    bookingData.departureDate = formData.get("departure");

    if (tripType === "Round trip") {
      bookingData.returnDate = formData.get("arrival");
    }
  }

  return bookingData;
};

/**
 * Submit booking - saves to Firebase and sends email
 * @param {Event} e - Form submit event
 * @param {string} tripType - Type of trip
 * @param {Array} cityPairs - Array of city pairs for multi-city
 * @param {Function} onSuccess - Callback on successful submission
 */
export const submitBooking = async (
  e,
  tripType,
  cityPairs = [],
  onSuccess = null,
) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  try {
    // Process and save to Firebase
    const bookingData = processBookingData(formData, tripType, cityPairs);
    const bookingId = await saveBookingToFirebase(bookingData);

    // Send email notification
    const formAction = "https://formsubmit.co/ajax/skymatetravels@skymate.com";

    // Add booking ID to email
    formData.append("booking_id", bookingId);
    formData.append(
      "_subject",
      `New ${tripType} Booking Request - ID: ${bookingId}`,
    );

    const response = await fetch(formAction, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Email notification failed");
    }

    const emailResult = await response.json();
    console.log("✅ Email sent successfully:", emailResult);

    // Show success message
    toast.success("Booking Request Submitted Successfully!", {
      icon: "✈️",
      style: {
        backgroundColor: "#FFF8F5",
        color: "#333",
        border: "1px solid #EB662B",
        borderLeft: "4px solid #EB662B",
      },
    });

    // Reset form
    form.reset();

    // Call success callback if provided
    if (onSuccess) {
      onSuccess(bookingId);
    }

    return bookingId;
  } catch (error) {
    console.error("❌ Error submitting booking:", error);

    toast.error("Failed to submit booking request. Please try again later.", {
      icon: "❌",
      style: {
        backgroundColor: "#FFF8F5",
        color: "#333",
        border: "1px solid #EB662B",
        borderLeft: "4px solid #EB662B",
      },
    });

    throw error;
  }
};
