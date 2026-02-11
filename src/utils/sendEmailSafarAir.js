import { toast } from 'react-toastify';

/**
 * Send a contact form email using FormSubmit
 * @param {Event} e - Form submit event
 */
export const sendEmail = (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  // FormSubmit endpoint with AJAX to bypass captcha page
  // Replace with your email address
  const formAction = 'https://formsubmit.co/ajax/your-email@example.com';

  fetch(formAction, {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      toast.success('Message Sent Successfully!', {
        icon: '🎉',
        style: {
          backgroundColor: '#F8FAFC',
          color: '#1E3A8A',
          border: '2px solid #1E40AF',
          borderLeft: '4px solid #F59E0B',
        },
      });
      form.reset();
    })
    .catch((error) => {
      console.error('Error:', error);
      toast.error('Failed to send message. Please try again.', {
        icon: '❌',
        style: {
          backgroundColor: '#F8FAFC',
          color: '#1E3A8A',
          border: '2px solid #1E40AF',
          borderLeft: '4px solid #F59E0B',
        },
      });
    });
};

/**
 * Send a booking form email using FormSubmit
 * @param {Event} e - Form submit event
 */
export const sendBookingEmail = (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  // FormSubmit endpoint with AJAX to bypass captcha page
  // Replace with your email address
  const formAction = 'https://formsubmit.co/ajax/your-email@example.com';

  // Add a hidden field for email subject
  formData.append('_subject', 'New Booking Request - Safar Air International');

  fetch(formAction, {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      toast.success('Booking Request Submitted Successfully!', {
        icon: '✈️',
        style: {
          backgroundColor: '#F8FAFC',
          color: '#1E3A8A',
          border: '2px solid #1E40AF',
          borderLeft: '4px solid #F59E0B',
        },
      });
      form.reset();
    })
    .catch((error) => {
      console.error('Error:', error);
      toast.error('Failed to submit booking request. Please try again later.', {
        icon: '❌',
        style: {
          backgroundColor: '#F8FAFC',
          color: '#1E3A8A',
          border: '2px solid #1E40AF',
          borderLeft: '4px solid #F59E0B',
        },
      });
    });
};

