import './Toast.css'

export const notifications = document.querySelector(".notifications");
// Object containing details for different types of toasts

export const toastDetails = {
    timer: 5000,
    Submit: {
        icon: 'fa-circle-check',
        text: 'Car Created Successfully',
    },
    Deny: {
        icon: 'fa-circle-check',
        text: 'Request Denied Successfully',
    },

    error: {
        icon: 'fa-circle-xmark',
        text: 'Error: Delete Unsuccessful',
    },
    Expired: {
        icon: 'fa-circle-xmark',
        text: 'Error: CAr Request Expired | Deny and Request Again!',
    },
    offline: {
        icon: 'fa-solid fa-wifi',
        text: 'You are offline. reconnecting...',
    },
    online: {
        icon: 'fa-solid fa-wifi',
        text: 'You are Online',
    },
}

export const createToast = (id) => {
    // Getting the icon and text for the toast based on the id passed
    const { icon, text } = toastDetails[id];
    const toast = document.createElement("li"); // Creating a new 'li' element for the toast
    toast.className = `toast ${id}`; // Setting the classes for the toast
    // Setting the inner HTML for the toast
    toast.innerHTML = `<div class="column">
                            <i class="fa-solid ${icon}"></i>
                            <span>${text}</span>
                        </div>
                        <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
    notifications.appendChild(toast); // Append the toast to the notification ul
    // Setting a timeout to remove the toast after the specified duration
    toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
}

const removeToast = (toast) => {
    toast.classList.add("hide");
    if(toast.timeoutId) clearTimeout(toast.timeoutId); // Clearing the timeout for the toast
    setTimeout(() => toast.remove(), 500); // Removing the toast after 500ms
}
