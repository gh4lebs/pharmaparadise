document.addEventListener('DOMContentLoaded', () => {
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded');
        return;
    }

    const ctx = document.getElementById('myChart').getContext('2d');
    const intervalSelect = document.getElementById('interval');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const updateButton = document.getElementById('updateButton');
    const accessToken = localStorage.getItem('accessToken');
    let chart;

    async function fetchData(startDate, endDate) {
        console.log(`Fetching data from ${startDate} to ${endDate}`);
        const response = await fetch('https://pharmaparadise.in/back-end/public/api/orders/stats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ from: startDate, to: endDate })
        });

        const result = await response.json();
        console.log('API Response:', result);
        return result.data.orders;
    }

    function processData(orders, interval) {
        let processedData = [];

        if (interval === 'day') {
            processedData = aggregateByDays(orders);
        } else if (interval === 'week') {
            processedData = aggregateByWeeks(orders);
        } else if (interval === 'month') {
            processedData = aggregateByMonths(orders);
        }

        return processedData;
    }

    function aggregateByDays(data) {
        const result = {};

        data.forEach(order => {
            const date = order.date.split(' ')[0];
            if (!result[date]) {
                result[date] = 0;
            }
            result[date] += parseFloat(order.total);
        });

        return Object.entries(result).map(([date, total]) => ({ date, total }));
    }

    function aggregateByWeeks(data) {
        const result = {};

        data.forEach(order => {
            const date = new Date(order.date);
            const year = date.getFullYear();
            const week = getWeekNumber(date);

            const key = `${year}-W${week}`;
            if (!result[key]) {
                result[key] = 0;
            }
            result[key] += parseFloat(order.total);
        });

        return Object.entries(result).map(([date, total]) => ({ date, total }));
    }

    function getWeekNumber(date) {
        const firstJan = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstJan) / 86400000;
        return Math.ceil((pastDaysOfYear + firstJan.getDay() + 1) / 7);
    }

    function aggregateByMonths(data) {
        const result = {};

        data.forEach(order => {
            const date = order.date.split(' ')[0].substring(0, 7); // YYYY-MM
            if (!result[date]) {
                result[date] = 0;
            }
            result[date] += parseFloat(order.total);
        });

        return Object.entries(result).map(([date, total]) => ({ date, total }));
    }

    function createChart(data) {
        if (chart) {
            chart.destroy();
        }
        console.log('Processed Data for Chart:', data);
        // Create a new Chart instance
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(item => item.date), // Adjust based on your data structure
                datasets: [{
                    label: 'Total Sales',
                    data: data.map(item => item.total), // Adjust based on your data structure
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgb(127, 161, 195)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: intervalSelect.value // Adjust based on the interval
                        }
                    },
                    y: {
                        beginAtZero: true,
                        min: 1,
                        type: 'linear'
                    }
                }
            }
        });
    }

    async function updateChart() {
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;
        const interval = intervalSelect.value;

        console.log(`Updating chart with interval: ${interval}`);

        const orders = await fetchData(startDate, endDate);
        const processedData = processData(orders, interval);
        createChart(processedData);
    }

    updateButton.addEventListener('click', updateChart);

    // Initialize chart with default values
    const today = new Date().toISOString().split('T')[0];
    startDateInput.value = today;
    endDateInput.value = today;
    updateChart();
});