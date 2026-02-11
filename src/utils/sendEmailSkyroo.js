import { toast } from 'react-toastify';

const FORM_ENDPOINT =
  'https://formsubmit.co/ajax/skyroointernational@gmail.com';
const WHATSAPP_NUMBER = '923268282115';

const openWhatsApp = (details) => {
  if (typeof window === 'undefined') return;

  const message = [
    `New ${details.context || 'Skyroo International Pvt Ltd'} enquiry`,
    details.name ? `Name: ${details.name}` : null,
    details.email ? `Email: ${details.email}` : null,
    details.phone ? `Phone: ${details.phone}` : null,
    details.package ? `Package: ${details.package}` : null,
    details.destination ? `Destination: ${details.destination}` : null,
    details.departure ? `Departure: ${details.departure}` : null,
    details.arrival ? `Return: ${details.arrival}` : null,
    details.adults ? `Adults: ${details.adults}` : null,
    details.children ? `Children: ${details.children}` : null,
    details.message ? `Message: ${details.message}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;
  window.open(url, '_blank');
};

const submitForm = (formData, context, form, successMessage, errorMessage) => {
  fetch(FORM_ENDPOINT, {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then((data) => {
      console.log('Success:', data);
      toast.success(successMessage, {
        icon: context === 'booking' ? '✈️' : '🎉',
        style: {
          backgroundColor: '#0b1220',
          color: '#f4f7fb',
          border: '1px solid rgba(11, 162, 224, 0.35)',
          borderLeft: '4px solid #0ba2e0',
        },
      });
      form.reset();
      const payload = Object.fromEntries(formData.entries());
      openWhatsApp({ ...payload, context });
    })
    .catch((error) => {
      console.error('Error:', error);
      toast.error(errorMessage, {
        icon: '❌',
        style: {
          backgroundColor: '#0b1220',
          color: '#f4f7fb',
          border: '1px solid rgba(118, 247, 191, 0.35)',
          borderLeft: '4px solid #76f7bf',
        },
      });
    });
};

/**
 * Send a contact form email using FormSubmit
 * @param {Event} e - Form submit event
 */
export const sendEmail = (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  submitForm(
    formData,
    'contact form',
    form,
    'Message Sent Successfully!',
    'Failed to send message. Please try again.'
  );
};

/**
 * Send a booking form email using FormSubmit
 * @param {Event} e - Form submit event
 */
export const sendBookingEmail = (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  formData.append('_subject', 'New Booking Request from Website');

  submitForm(
    formData,
    'booking request',
    form,
    'Booking Request Submitted Successfully!',
    'Failed to submit booking request. Please try again later.'
  );
};
