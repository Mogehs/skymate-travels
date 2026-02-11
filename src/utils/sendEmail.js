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
  const formAction = 'https://formsubmit.co/ajax/skymatetravels@skymate.com';

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
      console.log('Success:', data);
      toast.success('Message Sent Successfully!', {
        icon: '🎉',
        style: {
          backgroundColor: '#FFF8F5',
          color: '#333',
          border: '1px solid #EB662B',
          borderLeft: '4px solid #EB662B',
        },
      });
      form.reset();
    })
    .catch((error) => {
      console.error('Error:', error);
      toast.error('Failed to send message. Please try again.', {
        icon: '❌',
        style: {
          backgroundColor: '#FFF8F5',
          color: '#333',
          border: '1px solid #EB662B',
          borderLeft: '4px solid #EB662B',
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
  // Using ajax in the URL ensures no confirmation page
  const formAction = 'https://formsubmit.co/ajax/skymatetravels@skymate.com';

  // Add a hidden field for email subject
  formData.append('_subject', 'New Booking Request from Website');

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
      console.log('Success:', data);
      toast.success('Booking Request Submitted Successfully!', {
        icon: '✈️',
        style: {
          backgroundColor: '#FFF8F5',
          color: '#333',
          border: '1px solid #EB662B',
          borderLeft: '4px solid #EB662B',
        },
      });
      form.reset();
    })
    .catch((error) => {
      console.error('Error:', error);
      toast.error('Failed to submit booking request. Please try again later.', {
        icon: '❌',
        style: {
          backgroundColor: '#FFF8F5',
          color: '#333',
          border: '1px solid #EB662B',
          borderLeft: '4px solid #EB662B',
        },
      });
    });
};
