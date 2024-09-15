import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
const firebaseConfig = {
    apiKey: "AIzaSyCuuVrV0PTEr5X_zTmuQpe_IWpHTV_ekb0",
    authDomain: "pharmaparadise-16cd4.firebaseapp.com",
    projectId: "pharmaparadise-16cd4",
    storageBucket: "pharmaparadise-16cd4.appspot.com",
    messagingSenderId: "981211920419",
    appId: "1:981211920419:web:521c4246bb520ecc1c9996",
    measurementId: "G-0VXH155SJZ"
};
const app = initializeApp(firebaseConfig);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch((err) => {
            console.log('Service Worker registration failed:', err);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const loginEl = document.getElementById("login");
    if (loginEl) {
        loginEl.addEventListener('submit', async e => {
            e.preventDefault();

            const formData = new FormData(loginEl);
            const data = Object.fromEntries(formData.entries());
            console.log('Form data:', data);

            try {
                const response = await fetch('https://pharmaparadise.in/back-end/public/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error:', errorData);
                    alert('Login failed: ' + (errorData.message || 'Unknown error'));
                } else {
                    const responseData = await response.json();
                    console.log('Success:', responseData);
                    var accessToken = responseData.data.original.access_token;
                    alert('Login successful: ' + (accessToken || 'Unknown error'));

                    // Save the token in localStorage
                    localStorage.setItem('accessToken', accessToken);

                    // Redirect after setting the token
                    location.replace('index7.html');
                }
            } catch (error) {
                console.error('Network error:', error);
                alert('Network error: ' + error.message);
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    accessToken = localStorage.getItem('accessToken');
    const pathname = window.location.pathname;
    console.log("Current pathname:", pathname);

    if (!accessToken) {
        alert('No access token found, redirecting to login.');
        if (!pathname.includes('login.html')) {
            location.replace('login.html');
        }
    } else {
        if (!pathname.includes('login.html')) {
            console.log('Access token:', accessToken);

            async function refreshToken() {
                console.log('Refreshing token...');
                try {
                    const response = await fetch('https://pharmaparadise.in/back-end/public/api/auth/refresh', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        console.error('Error refreshing token:', errorData);

                        if (response.status === 401) {
                            alert('Session expired, please log in again.');
                            location.replace('login.html');
                        } else {
                            alert('Error refreshing token: ' + (errorData.message || 'Unknown error'));
                        }
                    } else {
                        const responseData = await response.json();
                        console.log('Token refreshed:', responseData);

                        // Update and save the new access token
                        accessToken = responseData.access_token;
                        localStorage.setItem('accessToken', accessToken);
                    }
                } catch (error) {
                    console.error('Network error:', error);
                    alert('Network error: ' + error.message);
                }
            }



            // Start token refresh interval
            setInterval(refreshToken, 3000000);
        }
    }
    initializeFCM();
    if (pathname.includes('index7.html')) {
        fetchDataOrdersCount();
        fetchTotalClients();
        fetchTotalProducts();
        fetchDataF();
        getDays();
        fetchDataAndPopulateCheckboxes();
        fetchDataP5();
        fetchDataOrders5();
    } else if (
        pathname.includes('accounts-list.html') ||
        pathname.includes('pharmacists.html') ||
        pathname.includes('pharmacists-rejected.html')
    ) {
        fetchTotalClients();
        fetchData();
    } else if (pathname.includes('order-track.html')) {
        fetchDataOrders();
        getDrivers();
    } else if (pathname.includes('products-list.html')) {
        fetchDataP();
        fetchLowQuantityProducts();
        fetchLZeroQuantityProducts();
        fetchTotalProducts();
        getFactories();
        getFactoriesE();
    } else if (pathname.includes('factories-list%20.html')) {
        fetchDataF();
    } else if (pathname.includes('offer%20list.html')) {
        fetchDataO();
        getFactories();
        getFactoriesE();
    } else if (pathname.includes('drivers.html')) {
        fetchDataDrivers();
    }


    // fetchDataOactive();


    const productsForm = document.getElementById('productsForm');
    if (productsForm) {
        productsForm.addEventListener('submit', addProduct);
    }
    const factoryForm = document.getElementById('factoryForm');
    if (factoryForm) {
        factoryForm.addEventListener('submit', addFactory);
    }
    const offerForm = document.getElementById('offerForm');
    if (offerForm) {
        offerForm.addEventListener('submit', addOffer);
    }
    const packageForm = document.getElementById('packageForm');
    if (packageForm) {
        packageForm.addEventListener('submit', addPackage);
    }
    const cityForm = document.getElementById('cityForm');
    if (cityForm) {
        cityForm.addEventListener('submit', addCity);
    }
    const chooseForm = document.getElementById('chooseForm');
    if (chooseForm) {
        chooseForm.addEventListener('submit', addDTime);
    }
    const uploadForm = document.getElementById('uploadForm');
    if (uploadForm) {
        uploadForm.addEventListener('submit', activateOffer);
    }
    const driversForm = document.getElementById('DriversForm');
    if (driversForm) {
        driversForm.addEventListener('submit', addDrivers);
    }



}

);

function initializeFCM() {
    const messaging = getMessaging(app);

    async function requestPermission() {
        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                console.log('Notification permission granted.');
                const token = await getToken(messaging, { vapidKey: 'YOUR_PUBLIC_VAPID_KEY' });
                console.log('FCM Registration Token:', token);
                // You can store the token on your server or use it for targeting
            } else {
                console.log('Notification permission denied.');
            }
        } catch (error) {
            console.error('Unable to get permission to notify.', error);
        }
    }

    requestPermission();

    // Handle incoming messages when the web app is in the foreground
    onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
        // Handle the foreground message (e.g., show a custom notification)
    });
}
async function addProduct(event) {
    try {
        event.preventDefault(); // Prevent default form submission
        console.log('Form submission prevented'); // Debugging statement

        const form = document.getElementById('productsForm');
        const formData = new FormData(form);
        console.log('Form Data:', formData); // Debugging statement

        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('https://pharmaparadise.in/back-end/public/api/products/store', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error:', errorData);
            alert('Error: Failed to add product.');
            return;
        }

        const responseData = await response.json();
        console.log('Response Data:', responseData);
        alert('Success: Product added successfully.');

        // Optionally, reset the form after successful submission
        location.reload();

    } catch (error) {
        console.error('Error:', error);
        alert('Error: Something went wrong.');
    }
}
async function addDTime(event) {
    try {
        event.preventDefault(); // Prevent default form submission
        console.log('Form submission prevented'); // Debugging statement

        const form = document.getElementById('chooseForm');
        const formData = new FormData(form);
        const payload = {
            "day_id": formData.get('day_id'), // Get the single value for day_id
            "cities_ids": [] // Initialize cities_ids as an empty array
        };
        formData.forEach((value, key) => {
            if (key === 'cities_ids') {
                payload.cities_ids.push(value);
            }
        });

        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('https://pharmaparadise.in/back-end/public/api/distribution-schedule/process', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error:', errorData);
            alert('Error: Failed to add product.');
            return;
        }

        const responseData = await response.json();
        console.log('Response Data:', responseData);
        alert('Success: Product added successfully.');

        // Optionally, reset the form after successful submission
        location.reload();

    } catch (error) {
        console.error('Error:', error);
        alert('Error: Something went wrong.');
    }
}
async function addFactory(event) {
    try {
        event.preventDefault();
        const form = document.getElementById('factoryForm');
        const formData = new FormData(form); // This already includes the file


        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('https://pharmaparadise.in/back-end/public/api/labs/store', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error data:', errorData);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Response Data:", responseData);
        location.reload();

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
async function addPackage(event) {
    try {
        event.preventDefault(); // Prevent default form submission
        console.log('Form submission prevented'); // Debugging statement

        const form = document.getElementById('packageForm');
        const formData = new FormData(form);
        console.log('Form Data:', formData);

        formData.append('type', '1');

        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('https://pharmaparadise.in/back-end/public/api/offers/store', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error:', errorData);
            alert('Error: Failed to add product.');
            return;
        }

        const responseData = await response.json();
        console.log('Response Data:', responseData);
        alert('Success: Product added successfully.');

        // Optionally, reset the form after successful submission
        location.reload();

    } catch (error) {
        console.error('Error:', error);
        alert('Error: Something went wrong.');
    }
}
async function addOffer(event) {
    try {
        event.preventDefault(); // Prevent default form submission
        console.log('Form submission prevented'); // Debugging statement

        const form = document.getElementById('offerForm');
        const formData = new FormData(form);
        console.log('Form Data:', formData);

        formData.append('type', '2');

        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('https://pharmaparadise.in/back-end/public/api/offers/store', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error:', errorData);
            alert('Error: Failed to add product.');
            return;
        }

        const responseData = await response.json();
        console.log('Response Data:', responseData);
        alert('Success: Product added successfully.');

        // Optionally, reset the form after successful submission
        location.reload();

    } catch (error) {
        console.error('Error:', error);
        alert('Error: Something went wrong.');
    }
}

async function fetchTotalClients() {
    try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error('No access token found');
        }

        const response = await fetch('https://pharmaparadise.in/back-end/public/api/pharmacists-accounts/counts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Data:', data);

        const totalClientsElement = document.getElementById('totalclients');
        const pendingClientsElement = document.getElementById('pendingClients');
        const acClientsElement = document.getElementById('acClients');
        const rejClientsElement = document.getElementById('rejClients');

        if (totalClientsElement) totalClientsElement.textContent = data.data.all;
        if (pendingClientsElement) pendingClientsElement.textContent = data.data.in_review;
        if (acClientsElement) acClientsElement.textContent = data.data.accepted;
        if (rejClientsElement) rejClientsElement.textContent = data.data.rejected;

    } catch (error) {
        console.error('Error fetching total clients:', error);
        // Handle error (e.g., show an error message)
        const totalClientsElement = document.getElementById('totalclients');
        const pendingClientsElement = document.getElementById('pendingClients');
        const acClientsElement = document.getElementById('acClients');
        const rejClientsElement = document.getElementById('rejClients');
        if (totalClientsElement) totalClientsElement.textContent = 'Error fetching data';
        if (pendingClientsElement) pendingClientsElement.textContent = 'Error fetching data';
        if (acClientsElement) acClientsElement.textContent = 'Error fetching data';
        if (rejClientsElement) rejClientsElement.textContent = 'Error fetching data';
    }
}

// Function to fetch data from API and populate the table
async function fetchData() {
    console.log("fetching data");
    try {
        let postData = {
            name: '',
            in_review: '1',
            accepted: '',
            rejected: '',
        };
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('https://pharmaparadise.in/back-end/public/api/pharmacists-accounts/all', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(postData)
        });
        const data = await response.json();
        console.log("mmm", data);
        const dataArray = data.data.pharmacists;

        const tableBody = document.querySelector('#myTable tbody');

        dataArray.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.mobile}</td>
                    <td>${item.location !== null ? item.location : 'N/A'}</td>
                    <td><i class="feather feather-eye text-primary icon-btn" onclick="showImage('https://pharmaparadise.in/back-end/public/images/${item.image}')"></i></td>
                    <td>
                        <i class="feather feather-check text-primary icon-btn" onclick="approve(${item.id})"></i>
                        <i class="feather feather-trash-2 icon-btn" onclick="reject(${item.id})"></i>
                    </td>
                `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    try {
        let postData = {
            name: '',
            in_review: '',
            accepted: '1',
            rejected: '',
        };
        const response = await fetch('https://pharmaparadise.in/back-end/public/api/pharmacists-accounts/all', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(postData)
        });
        const data = await response.json();
        console.log("mmm", data);
        const dataArray = data.data.pharmacists;

        const tableBody = document.querySelector('#myTable1 tbody');

        dataArray.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.mobile}</td>
                    <td>${item.location !== null ? item.location : 'N/A'}</td>
                    <td><i class="feather feather-eye text-primary icon-btn" onclick="showImage('https://pharmaparadise.in/back-end/public/images/${item.image}')"></i></td>
                    <td>
                       
                        <i class="feather feather-trash-2 icon-btn" onclick="reject(${item.id})"></i>
                    </td>
                `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }



    try {
        let postData = {
            name: '',
            in_review: '',
            accepted: '',
            rejected: '1',
        };
        const response = await fetch('https://pharmaparadise.in/back-end/public/api/pharmacists-accounts/all', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(postData)
        });
        const data = await response.json();
        console.log("mmm", data);
        const dataArray = data.data.pharmacists;


        const tableBody = document.querySelector('#myTable2 tbody');

        dataArray.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.mobile}</td>
                    <td>${item.location !== null ? item.location : 'N/A'}</td>
                    <td><i class="feather feather-eye text-primary icon-btn" onclick="showImage('https://pharmaparadise.in/back-end/public/images/${item.image}')"></i></td>
                    
                `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }


}

async function fetchDataF() {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('https://pharmaparadise.in/back-end/public/api/labs/index', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },

        });
        const data = await response.json();
        console.log("fact", data);
        const dataArray = data.data.labsData.labs;
        const factoryCountElement = document.getElementById('factoryCount');

        if (factoryCountElement) factoryCountElement.textContent = data.data.count;

        const tableBody = document.querySelector('#myTableF tbody');

        dataArray.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.mobile}</td>
                    <td><img src="https://pharmaparadise.in/back-end/public/images/${item.image}" alt="Certificate" width="50"></td>
                    <td>
                        <a href="#" class="btn btn-primary " data-toggle="modal"
										data-target="#editFactoryModal" onclick="openEditModal(${item.id})"><i
											class="fa fa-pencil icon-btn"></i></a>
                    </td>
                    <td>
                        <i class="feather feather-trash-2 icon-btn" onclick="deleteF(${item.id})"></i>
                    </td>
                    
                `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
async function fetchDataAndPopulateCheckboxes() {
    const apiUrl = 'https://pharmaparadise.in/back-end/public/api/cities/index';

    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },

        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        var data = await response.json();
        data = data.data;
        console.log(data);
        populateCheckboxCity(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function populateCheckboxCity(data) {
    const container = document.getElementById('cityCheckbox');

    // Assuming data is an array of objects with `id` and `name` properties
    data.forEach((item, index) => {
        const checkboxWrapper = document.createElement('div');
        checkboxWrapper.classList.add('checkbox-wrapper');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `checkbox-${item.id}`;
        checkbox.value = item.id;
        checkbox.name = 'cities_ids';

        const label = document.createElement('label');
        label.htmlFor = `checkbox-${item.id}`;
        label.textContent = item.name;
        label.classList.add('checkbox-label'); // Adding class for styling

        checkboxWrapper.appendChild(checkbox);
        checkboxWrapper.appendChild(label);
        container.appendChild(checkboxWrapper);

        // Add a <br> element after every 6 items
        if ((index + 1) % 6 === 0) {
            container.appendChild(document.createElement('br'));
        }
    });
}
async function fetchDataP() {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('https://pharmaparadise.in/back-end/public/api/products/index', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },

        });
        console.log(response);
        const data = await response.json();
        console.log("pp", data);
        const dataArray = data.data.products;

        const tableBody = document.querySelector('#Productstable tbody');

        dataArray.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${item.price}</td>
                <td>${item.lab ? item.lab.name : ''}</td>
                <td>${item.dose}</td>
                <td>${item.pills}</td>
                <td>${item.max_quantity}</td>
                <td>${item.description}</td>
                <td>${item.barcode}</td>
                <td><img src="https://pharmaparadise.in/back-end/public/images/${item.image}" alt="Certificate" width="50"></td>

                <td>
                <i class="feather feather-trash-2 icon-btn" onclick="deleteP(${item.id})"></i>

                <a href="#" class="btn btn-primary " data-toggle="modal"
                data-target="#editProductModal" onclick="openEditModalP(${item.id})"><i
                class="fa fa-pencil icon-btn"></i></a>

                </td>
                `;
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
async function fetchDataP5() {
    try {

        const response = await fetch('https://pharmaparadise.in/back-end/public/api/products/index', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },

        });
        const data = await response.json();
        const dataArray = data.data.products;
        dataArray.sort((a, b) => new Date(b.id) - new Date(a.id));

        // Get the last 5 products
        const lastFiveProducts = dataArray.slice(0, 5);

        const lastFiveContainer = document.querySelector('.l5p');

        // Clear the existing content
        lastFiveContainer.innerHTML = '';

        lastFiveProducts.forEach(item => {
            const productHTML = `
                <div class="mb-5">
                    <div class="list-group-item d-flex p-0 align-items-center border-0">
                        <div class="d-flex">
                            <span class="avatar avatar-lg bradius ml-3" style="background-image: url(https://pharmaparadise.in/back-end/public/images/${item.image})"></span>
                            <div class="mt-1">
                                <h6 class="mb-1 font-weight-semibold fs-16">${item.name}</h6>
                                <span class="clearfix"></span>
                                <span class="fs-14 text-muted">${timeSince(new Date(item.created_at))}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            lastFiveContainer.insertAdjacentHTML('beforeend', productHTML);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
function timeSince(date) {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 }
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
        }
    }
    return 'just now';
}

async function fetchDataO() {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('https://pharmaparadise.in/back-end/public/api/offers/index', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },

        });
        console.log(response);
        const data = await response.json();
        console.log("pp", data);
        const dataArray = data.data.offers;
        const tableBody = document.querySelector('#myTableO tbody');

        dataArray.forEach(item => {
            const row = document.createElement('tr');
            let typeDescription = '';
            if (item.type === '1') {
                typeDescription = 'بكج';
            } else if (item.type === '2') {
                typeDescription = 'منتج';
            } else {
                typeDescription = item.type; // Keep the original value if it's not 1 or 2
            }
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${typeDescription}</td>
                <td>${item.details}</td>
                <td>${item.price}</td>
                <td>${item.lab ? item.lab.name : ''}</td>
                
                <td><img src="https://pharmaparadise.in/back-end/public/images/${item.image}" alt="Certificate" width="50"></td>
                
                <td>

                
                <a href="#" class="btn btn-success " data-toggle="modal"
                data-target="#uploadOffer" onclick="openUploadModal(${item.id})"><i
                class="fa fa-arrow-up icon-btn"></i></a>
                <a href="#" class="btn btn-primary" onclick="openEditModalO(${item.id}, ${item.type})"><i class="fa fa-pencil icon-btn"></i></a>
                <a href="#" class="btn btn-danger " onclick="deleteO(${item.id})"><i
                class="fa fa-trash icon-btn"></i></a>
                
                </td>
                `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
async function fetchDataDrivers() {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('https://pharmaparadise.in/back-end/public/api/orders/shufirs', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },

        });
        console.log(response);
        const data = await response.json();
        console.log("drivers", data);
        const dataArray = data.data;

        const tableBody = document.querySelector('#Driverstable tbody');

        dataArray.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.mobile}</td>
                <td>${item.vehicle}</td>
                <td>${item.created_at}</td>
                <td><img src="https://pharmaparadise.in/back-end/public/images/${item.image}" alt="Certificate" width="50"></td>
                <td>
                <i class="feather feather-trash-2 icon-btn" onclick="deleteD(${item.id})"></i>
                </td>
                
                `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
async function fetchDataOrdersCount() {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('https://pharmaparadise.in/back-end/public/api/orders/counts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        });

        const data = await response.json();
        console.log(data);

        const totalOrders = document.getElementById('total_orders');
        totalOrders.textContent = data.data.all;


    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
async function fetchDataOrders() {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('https://pharmaparadise.in/back-end/public/api/orders/index', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        });

        const data = await response.json();
        const dataArray = data.data.orders;
        const tableBody = document.querySelector('#OrdersTable tbody');

        dataArray.forEach(item => {
            const createdAtShort = item.created_at.substring(0, 10);
            const row = document.createElement('tr');
            let statusButtonClass = '';
            let statusButtonIcon = '';
            switch (item.status) {
                case '1':
                    statusButtonClass = 'btn btn-warning';
                    statusButtonIcon = 'fa fa-hourglass-start';
                    break;
                case '2':
                    statusButtonClass = 'btn btn-success';
                    statusButtonIcon = 'fa fa-check';
                    break;
                case '3':
                    statusButtonClass = 'btn btn-danger';
                    statusButtonIcon = 'fa fa-times';
                    break;
                default:
                    statusButtonClass = 'btn btn-secondary';
                    statusButtonIcon = 'fa fa-info-circle';
            }
            let shufirButtonClass = '';
            let shufirButtonIcon = '';
            if (item.shufir === null) {
                shufirButtonClass = 'btn btn-dark';
                shufirButtonIcon = 'fa fa-user-plus';
            } else {
                shufirButtonClass = 'btn btn-primary';
                shufirButtonIcon = 'fa fa-user';
            }
            let deliveredButtonClass = '';
            let deliveredButtonIcon = '';
            if (item.delivered === 1) {
                deliveredButtonClass = 'btn btn-success';
                deliveredButtonIcon = 'fa fa-check';
            } else {
                deliveredButtonClass = 'btn btn-danger';
                deliveredButtonIcon = 'fa fa-times';
            }
            row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.pharmacist.name}</td>
                    <td>${item.order_location}</td>
                    <td>${createdAtShort}</td>  
                    <td>${item.total}</td>  
                    <td>
                        <button class="btn btn-primary preview-order-btn" data-order-id="${item.id}">Preview Order</button>
                    </td>
                    <td>
                        <a href="#" class="${statusButtonClass}" data-toggle="modal" data-target="#presentmodal" onclick="openYNModal(${item.id})" ><i class="${statusButtonIcon} icon-btn"></i></a>
                    </td>
                    <td>
                        <a href="#" class="${shufirButtonClass} " data-toggle="modal" data-target="#drivermodal" onclick="openDriverModal(${item.id})" ><i class="${shufirButtonIcon} icon-btn"></i></a>
                    </td>
                    <td>
                        <a href="#" class="${deliveredButtonClass} " data-toggle="modal" ><i class="${deliveredButtonIcon} icon-btn"></i></a>
                    </td>
                `;
            tableBody.appendChild(row);
        });

        // Add event listeners to preview order buttons
        const previewOrderButtons = document.querySelectorAll('.preview-order-btn');
        previewOrderButtons.forEach(button => {
            button.addEventListener('click', async () => {
                const orderId = button.dataset.orderId;
                try {
                    const response = await fetch(`https://pharmaparadise.in/back-end/public/api/orders/show/${orderId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`
                        },
                    });

                    const orderData = await response.json();

                    // Store order data in localStorage or sessionStorage
                    localStorage.setItem('orderData', JSON.stringify(orderData));

                    // Redirect to cart.html
                    window.location.href = 'cart.html';

                } catch (error) {
                    console.error('Error fetching order details:', error);
                }
            });
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
async function fetchDataOrders5() {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('https://pharmaparadise.in/back-end/public/api/orders/index', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        });

        const data = await response.json();
        const dataArray = data.data.orders;
        dataArray.sort((a, b) => new Date(b.id) - new Date(a.id));
        const lastFiveOrders = dataArray.slice(0, 5);

        const tableBody = document.querySelector('#l5o tbody');

        lastFiveOrders.forEach(item => {
            const createdAtShort = item.created_at.substring(0, 10);
            const row = document.createElement('tr');
            row.innerHTML = `
                    <tr class="border-bottom">
						<td>
							<div class="d-flex">
								<span class="avatar avatar-md bradius fs-20 bg-success-transparent text-success">
								    <span class="feather feather-check"></span>
								</span>
								<div class="mr-3 d-block mt-0 mt-sm-1">
									<h6 class="mb-0 fs-14 font-weight-semibold">${item.id}</h6>
								    <div class="clearfix"></div>
								    <small class="text-muted fs-11">${createdAtShort}</small>
								</div>
							</div>
						</td>
						<td class="text-right">
							<h6 class="mb-0 fs-14 font-weight-semibold">${item.pharmacist.name}</h6>
						</td>
						<td class="text-right fs-13">
							<h6 class="mb-0 fs-14 font-weight-semibold">${item.total}</h6>
						</td>
						<td class="text-right">
							<div class="d-flex">
								<a href="#" class="action-btns1 btnl5" data-toggle="tooltip"
									data-placement="top" title="View Invoice" data-order-id="${item.id}">
                                    <i class="feather feather-file-text primary text-primary"></i>
                                </a>
							</div>
						</td>
					</tr>
                `;
            tableBody.appendChild(row);
        });

        // Add event listeners to preview order buttons
        const previewOrderButtons = document.querySelectorAll('.btnl5');
        previewOrderButtons.forEach(button => {
            button.addEventListener('click', async () => {
                const orderId = button.dataset.orderId;
                try {
                    const response = await fetch(`https://pharmaparadise.in/back-end/public/api/orders/show/${orderId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`
                        },
                    });

                    const orderData = await response.json();

                    // Store order data in localStorage or sessionStorage
                    localStorage.setItem('orderData', JSON.stringify(orderData));

                    // Redirect to cart.html
                    window.location.href = 'cart.html';

                } catch (error) {
                    console.error('Error fetching order details:', error);
                }
            });
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
async function getDrivers() {
    const driver = document.getElementById('allDrivers');

    if (!allDrivers) {
        console.error('No select element found with id "allDrivers"');
        return;
    }

    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('https://pharmaparadise.in/back-end/public/api/orders/shufirs', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const dataArray = data.data;
        if (!Array.isArray(dataArray)) {
            console.error('data.data is not an array');
            return;
        }

        dataArray.forEach(Drivers => {
            const option = document.createElement('option');
            option.value = Drivers.id; // assuming factory objects have an id property
            option.textContent = Drivers.name; // assuming factory objects have a name property
            driver.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching category options:', error);
    }
}

async function getFactories() {
    const productF = document.getElementById('productF');

    if (!productF) {
        console.error('No select element found with id "productF"');
        return;
    }

    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('https://pharmaparadise.in/back-end/public/api/labs/index', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const dataArray = data.data.labsData.labs;
        if (!Array.isArray(dataArray)) {
            console.error('labsData.labs is not an array');
            return;
        }

        dataArray.forEach(factory => {
            const option = document.createElement('option');
            option.value = factory.id; // assuming factory objects have an `id` property
            option.textContent = factory.name; // assuming factory objects have a `name` property
            productF.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching category options:', error);
    }
}
async function getDays() {
    const productF = document.getElementById('days');

    if (!productF) {
        console.error('No select element found with id "productF"');
        return;
    }

    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('https://pharmaparadise.in/back-end/public/api/distribution-schedule/index', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const dataArray = data.data;
        if (!Array.isArray(dataArray)) {
            console.error('labsData.labs is not an array');
            return;
        }

        dataArray.forEach(factory => {
            const option = document.createElement('option');
            option.value = factory.id; // assuming factory objects have an `id` property
            option.textContent = factory.name; // assuming factory objects have a `name` property
            productF.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching category options:', error);
    }
}


async function getFactoriesE() {
    const productF = document.getElementById('editProductF');

    if (!productF) {
        console.error('No select element found with id "productF"');
        return;
    }

    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('https://pharmaparadise.in/back-end/public/api/labs/index', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const dataArray = data.data.labsData.labs;
        if (!Array.isArray(dataArray)) {
            console.error('labsData.labs is not an array');
            return;
        }

        dataArray.forEach(factory => {
            const option = document.createElement('option');
            option.value = factory.id; // assuming factory objects have an `id` property
            option.textContent = factory.name; // assuming factory objects have a `name` property
            productF.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching category options:', error);
    }
}

async function fetchTotalProducts() {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('https://pharmaparadise.in/back-end/public/api/products/count-all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const textData = await response.text();
        document.getElementById('TotalProducts').textContent = textData;

    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('TotalProducts').textContent = 'Error fetching data';

    }
}


async function fetchLowQuantityProducts() {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('https://pharmaparadise.in/back-end/public/api/products/count-low-quantity-products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const textData = await response.text();
        document.getElementById('LowQuantityProducts').textContent = textData;

    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('LowQuantityProducts').textContent = 'Error fetching data';

    }
}


async function fetchLZeroQuantityProducts() {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('https://pharmaparadise.in/back-end/public/api/products/count-zero-quantity-products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const textData = await response.text();
        document.getElementById('ZeroQuantityProducts').textContent = textData;

    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('ZeroQuantityProducts').textContent = 'Error fetching data';

    }
}
async function fetchDataOactive() {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('https://pharmaparadise.in/back-end/public/api/offers/index', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },

        });
        console.log(response);
        const data = await response.json();
        console.log("pp", data);
        const dataArray = data.data.offers;


        const tableBody = document.querySelector('#offerTable tbody');

        dataArray.forEach(item => {
            const row = document.createElement('tr');
            let typeDescription = '';
            if (item.type === '1') {
                typeDescription = 'بكج';
            } else if (item.type === '2') {
                typeDescription = 'منتج';
            } else {
                typeDescription = item.type; // Keep the original value if it's not 1 or 2
            }
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${typeDescription}</td>
                <td>${item.details}</td>
                <td>${item.price}</td>
                <td>${item.lab ? item.lab.name : ''}</td>
                
                <td><img src="https://pharmaparadise.in/back-end/public/images/${item.image}" alt="Certificate" width="50"></td>
                
                <td>

                
                
                <a href="#" class="btn btn-primary" onclick="openEditModalO(${item.id}, ${item.type})"><i class="fa fa-pencil icon-btn"></i></a>
                <a href="#" class="btn btn-danger " onclick="deleteO(${item.id})"><i
                class="fa fa-trash icon-btn"></i></a>
                
                </td>
                `; console.log(item.active)
            if (item.active === 1) {

                tableBody.appendChild(row);
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}



async function addDrivers(event) {
    try {
        console.log('Form submission intercepted'); // Debugging log
        event.preventDefault();
        console.log('Default action prevented');
        const form = document.getElementById('DriversForm');
        const formData = new FormData(form); // This already includes the file
        console.log(formData);
        formData.append('type', '3')
        formData.append('password', '11111111')
        formData.append('password_confirmation', '11111111')

        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('https://pharmaparadise.in/back-end/public/api/auth/register', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error data:', errorData);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Response Data:", responseData);
        location.reload();

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
async function addCity(event) {
    try {
        console.log('Form submission intercepted'); // Debugging log
        event.preventDefault();
        console.log('Default action prevented');
        const form = document.getElementById('cityForm');
        const formData = new FormData(form); // This already includes the file
        console.log(formData);
        formData.append('expected_delivery_time', '3')


        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('https://pharmaparadise.in/back-end/public/api/cities/store', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error data:', errorData);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Response Data:", responseData);
        alert("yes")
        location.reload();

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
async function activateOffer(event) {
    try {
        console.log('Form submission intercepted'); // Debugging log
        event.preventDefault();
        console.log('Default action prevented');
        const days = document.getElementById('daysInput').value;
        const hours = document.getElementById('hoursInput').value;
        const minutes = document.getElementById('minutesInput').value;
        const modal = document.querySelector('#uploadOffer');
        const offerId = modal.getAttribute('data-offer-id');

        const formattedDuration = `${days} أيام، ${hours} ساعة، ${minutes} دقيقة`;



        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`https://pharmaparadise.in/back-end/public/api/offers/activate-offer/${offerId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ expires_in: formattedDuration })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error data:', errorData);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Response Data:", responseData);
        alert("yes")
        location.reload();

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}




document.getElementById('logout').addEventListener('click', async () => {


    try {
        const logoutResponse = await fetch('https://pharmaparadise.in/back-end/public/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (logoutResponse.ok) {
            console.log('Logout successful.');

            // Clear local storage and redirect to login page
            localStorage.removeItem('accessToken');
            location.replace('login.html');
        } else {
            const errorData = await logoutResponse.json();
            console.error('Logout failed:', errorData);
            alert('Logout failed: ' + (errorData.message || 'Unknown error'));
        }
    } catch (error) {
        console.error('Network error:', error);
        alert('Network error: ' + error.message);
    }
});

