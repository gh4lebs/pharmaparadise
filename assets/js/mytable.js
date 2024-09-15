var currentPage = 1;
var rowsPerPage = 10;

document.addEventListener('DOMContentLoaded', (event) => {
    renderTable();
    updatePageInfo();
});

function searchTable() {
    currentPage = 1;
    renderTable();
}

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    dir = "asc";

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }

    currentPage = 1;
    renderTable();
}

function renderTable() {
    var input, filter, table, tr, td, i, j, txtValue, count = 0;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // First, hide all rows except the headers
    for (i = 1; i < tr.length; i++) {
        tr[i].style.display = "none";
    }

    // Then, display only the rows that match the search and fall within the current page
    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        var showRow = false;
        for (j = 0; j < td.length; j++) {
            if (td[j]) {
                txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    showRow = true;
                }
            }
        }
        if (showRow) {
            if (count >= (currentPage - 1) * rowsPerPage && count < currentPage * rowsPerPage) {
                tr[i].style.display = "";
            }
            count++;
        }
    }

    updatePageInfo();
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
}

function nextPage() {
    var count = document.getElementById("myTable").rows.length;
    count = Math.ceil(count / rowsPerPage)
    if (currentPage < count) {
        currentPage++;
        renderTable();
    }
}

function updatePageInfo() {
    var table, tr, count = document.getElementById("myTable").rows.length;
    count = Math.ceil(count / rowsPerPage)
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // for (i = 1; i < tr.length; i++) {
    //     if (tr[i].style.display !== "none") {
    //         count++;
    //     }
    // }
    var pageInfo = document.getElementById("pageInfo");
    pageInfo.innerText = "Page " + currentPage + " of " + count;
}



var currentPage = 1;
var rowsPerPage = 10;

document.addEventListener('DOMContentLoaded', (event) => {
    renderTable();
    updatePageInfo();
});

function searchTable() {
    currentPage = 1;
    renderTable();
}

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable1");
    switching = true;
    dir = "asc";

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }

    currentPage = 1;
    renderTable();
}

function renderTable() {
    var input, filter, table, tr, td, i, j, txtValue, count = 0;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable1");
    tr = table.getElementsByTagName("tr");

    // First, hide all rows except the headers
    for (i = 1; i < tr.length; i++) {
        tr[i].style.display = "none";
    }

    // Then, display only the rows that match the search and fall within the current page
    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        var showRow = false;
        for (j = 0; j < td.length; j++) {
            if (td[j]) {
                txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    showRow = true;
                }
            }
        }
        if (showRow) {
            if (count >= (currentPage - 1) * rowsPerPage && count < currentPage * rowsPerPage) {
                tr[i].style.display = "";
            }
            count++;
        }
    }

    updatePageInfo();
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
}

function nextPage() {
    var count = document.getElementById("myTable1").rows.length;
    count = Math.ceil(count / rowsPerPage)
    if (currentPage < count) {
        currentPage++;
        renderTable();
    }
}

function updatePageInfo() {
    var table, tr, count = document.getElementById("myTable2").rows.length;
    count = Math.ceil(count / rowsPerPage)
    table = document.getElementById("myTable1");
    tr = table.getElementsByTagName("tr");

    // for (i = 1; i < tr.length; i++) {
    //     if (tr[i].style.display !== "none") {
    //         count++;
    //     }
    // }
    var pageInfo = document.getElementById("pageInfo");
    pageInfo.innerText = "Page " + currentPage + " of " + count;
}


var currentPage = 1;
var rowsPerPage = 10;

document.addEventListener('DOMContentLoaded', (event) => {
    renderTable();
    updatePageInfo();
});

function searchTable() {
    currentPage = 1;
    renderTable();
}

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable2");
    switching = true;
    dir = "asc";

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }

    currentPage = 1;
    renderTable();
}

function renderTable() {
    var input, filter, table, tr, td, i, j, txtValue, count = 0;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable2");
    tr = table.getElementsByTagName("tr");

    // First, hide all rows except the headers
    for (i = 1; i < tr.length; i++) {
        tr[i].style.display = "none";
    }

    // Then, display only the rows that match the search and fall within the current page
    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        var showRow = false;
        for (j = 0; j < td.length; j++) {
            if (td[j]) {
                txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    showRow = true;
                }
            }
        }
        if (showRow) {
            if (count >= (currentPage - 1) * rowsPerPage && count < currentPage * rowsPerPage) {
                tr[i].style.display = "";
            }
            count++;
        }
    }

    updatePageInfo();
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
}

function nextPage() {
    var count = document.getElementById("myTable2").rows.length;
    count = Math.ceil(count / rowsPerPage)
    if (currentPage < count) {
        currentPage++;
        renderTable();
    }
}

function updatePageInfo() {
    var table, tr, count = document.getElementById("myTable2").rows.length;
    count = Math.ceil(count / rowsPerPage)
    table = document.getElementById("myTable2");
    tr = table.getElementsByTagName("tr");

    // for (i = 1; i < tr.length; i++) {
    //     if (tr[i].style.display !== "none") {
    //         count++;
    //     }
    // }
    var pageInfo = document.getElementById("pageInfo");
    pageInfo.innerText = "Page " + currentPage + " of " + count;
}

var currentPage = 1;
var rowsPerPage = 10;

document.addEventListener('DOMContentLoaded', (event) => {
    renderTable();
    updatePageInfo();
});

function searchTable() {
    currentPage = 1;
    renderTable();
}

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("Productstable");
    switching = true;
    dir = "asc";

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }

    currentPage = 1;
    renderTable();
}

function renderTable() {
    var input, filter, table, tr, td, i, j, txtValue, count = 0;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("Productstable");
    tr = table.getElementsByTagName("tr");

    // First, hide all rows except the headers
    for (i = 1; i < tr.length; i++) {
        tr[i].style.display = "none";
    }

    // Then, display only the rows that match the search and fall within the current page
    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        var showRow = false;
        for (j = 0; j < td.length; j++) {
            if (td[j]) {
                txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    showRow = true;
                }
            }
        }
        if (showRow) {
            if (count >= (currentPage - 1) * rowsPerPage && count < currentPage * rowsPerPage) {
                tr[i].style.display = "";
            }
            count++;
        }
    }

    updatePageInfo();
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
}

function nextPage() {
    var count = document.getElementById("Productstable").rows.length;
    count = Math.ceil(count / rowsPerPage)
    if (currentPage < count) {
        currentPage++;
        renderTable();
    }
}

function updatePageInfo() {
    var table, tr, count = document.getElementById("Productstable").rows.length;
    count = Math.ceil(count / rowsPerPage)
    table = document.getElementById("Productstable");
    tr = table.getElementsByTagName("tr");

    // for (i = 1; i < tr.length; i++) {
    //     if (tr[i].style.display !== "none") {
    //         count++;
    //     }
    // }
    var pageInfo = document.getElementById("pageInfo");
    pageInfo.innerText = "Page " + currentPage + " of " + count;
}
document.addEventListener('DOMContentLoaded', (event) => {
    renderTable();
    updatePageInfo();
});

function searchTable() {
    currentPage = 1;
    renderTable();
}

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTableO");
    switching = true;
    dir = "asc";

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }

    currentPage = 1;
    renderTable();
}

function renderTable() {
    var input, filter, table, tr, td, i, j, txtValue, count = 0;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTableO");
    tr = table.getElementsByTagName("tr");

    // First, hide all rows except the headers
    for (i = 1; i < tr.length; i++) {
        tr[i].style.display = "none";
    }

    // Then, display only the rows that match the search and fall within the current page
    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        var showRow = false;
        for (j = 0; j < td.length; j++) {
            if (td[j]) {
                txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    showRow = true;
                }
            }
        }
        if (showRow) {
            if (count >= (currentPage - 1) * rowsPerPage && count < currentPage * rowsPerPage) {
                tr[i].style.display = "";
            }
            count++;
        }
    }

    updatePageInfo();
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
}

function nextPage() {
    var count = document.getElementById("myTableO").rows.length;
    count = Math.ceil(count / rowsPerPage)
    if (currentPage < count) {
        currentPage++;
        renderTable();
    }
}

function updatePageInfo() {
    var table, tr, count = document.getElementById("myTableO").rows.length;
    count = Math.ceil(count / rowsPerPage)
    table = document.getElementById("myTableO");
    tr = table.getElementsByTagName("tr");

    // for (i = 1; i < tr.length; i++) {
    //     if (tr[i].style.display !== "none") {
    //         count++;
    //     }
    // }
    var pageInfo = document.getElementById("pageInfo");
    pageInfo.innerText = "Page " + currentPage + " of " + count;
}


var currentPage = 1;
var rowsPerPage = 10;

document.addEventListener('DOMContentLoaded', (event) => {
    renderTable();
    updatePageInfo();
});

function searchTable() {
    currentPage = 1;
    renderTable();
}

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    dir = "asc";

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }

    currentPage = 1;
    renderTable();
}

function renderTable() {
    var input, filter, table, tr, td, i, j, txtValue, count = 0;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // First, hide all rows except the headers
    for (i = 1; i < tr.length; i++) {
        tr[i].style.display = "none";
    }

    // Then, display only the rows that match the search and fall within the current page
    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        var showRow = false;
        for (j = 0; j < td.length; j++) {
            if (td[j]) {
                txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    showRow = true;
                }
            }
        }
        if (showRow) {
            if (count >= (currentPage - 1) * rowsPerPage && count < currentPage * rowsPerPage) {
                tr[i].style.display = "";
            }
            count++;
        }
    }

    updatePageInfo();
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
}

function nextPage() {
    var count = document.getElementById("myTable").rows.length;
    count = Math.ceil(count / rowsPerPage)
    if (currentPage < count) {
        currentPage++;
        renderTable();
    }
}

function updatePageInfo() {
    var table, tr, count = document.getElementById("myTable").rows.length;
    count = Math.ceil(count / rowsPerPage)
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // for (i = 1; i < tr.length; i++) {
    //     if (tr[i].style.display !== "none") {
    //         count++;
    //     }
    // }
    var pageInfo = document.getElementById("pageInfo");
    pageInfo.innerText = "Page " + currentPage + " of " + count;
}



var currentPage = 1;
var rowsPerPage = 10;

document.addEventListener('DOMContentLoaded', (event) => {
    renderTable();
    updatePageInfo();
});

function searchTable() {
    currentPage = 1;
    renderTable();
}

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("OrdersTable");
    switching = true;
    dir = "asc";

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }

    currentPage = 1;
    renderTable();
}

function renderTable() {
    var input, filter, table, tr, td, i, j, txtValue, count = 0;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("OrdersTable");
    tr = table.getElementsByTagName("tr");

    // First, hide all rows except the headers
    for (i = 1; i < tr.length; i++) {
        tr[i].style.display = "none";
    }

    // Then, display only the rows that match the search and fall within the current page
    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        var showRow = false;
        for (j = 0; j < td.length; j++) {
            if (td[j]) {
                txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    showRow = true;
                }
            }
        }
        if (showRow) {
            if (count >= (currentPage - 1) * rowsPerPage && count < currentPage * rowsPerPage) {
                tr[i].style.display = "";
            }
            count++;
        }
    }

    updatePageInfo();
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
}

function nextPage() {
    var count = document.getElementById("OrdersTable").rows.length;
    count = Math.ceil(count / rowsPerPage)
    if (currentPage < count) {
        currentPage++;
        renderTable();
    }
}

function updatePageInfo() {
    var table, tr, count = document.getElementById("OrdersTable").rows.length;
    count = Math.ceil(count / rowsPerPage)
    table = document.getElementById("OrdersTable");
    tr = table.getElementsByTagName("tr");

    // for (i = 1; i < tr.length; i++) {
    //     if (tr[i].style.display !== "none") {
    //         count++;
    //     }
    // }
    var pageInfo = document.getElementById("pageInfo");
    pageInfo.innerText = "Page " + currentPage + " of " + count;
}



var currentPage = 1;
var rowsPerPage = 10;

document.addEventListener('DOMContentLoaded', (event) => {
    renderTable();
    updatePageInfo();
});

function searchTable() {
    currentPage = 1;
    renderTable();
}

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("offerTable");
    switching = true;
    dir = "asc";

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }

    currentPage = 1;
    renderTable();
}

function renderTable() {
    var input, filter, table, tr, td, i, j, txtValue, count = 0;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("offerTable");
    tr = table.getElementsByTagName("tr");

    // First, hide all rows except the headers
    for (i = 1; i < tr.length; i++) {
        tr[i].style.display = "none";
    }

    // Then, display only the rows that match the search and fall within the current page
    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        var showRow = false;
        for (j = 0; j < td.length; j++) {
            if (td[j]) {
                txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    showRow = true;
                }
            }
        }
        if (showRow) {
            if (count >= (currentPage - 1) * rowsPerPage && count < currentPage * rowsPerPage) {
                tr[i].style.display = "";
            }
            count++;
        }
    }

    updatePageInfo();
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
}

function nextPage() {
    var count = document.getElementById("offerTable").rows.length;
    count = Math.ceil(count / rowsPerPage)
    if (currentPage < count) {
        currentPage++;
        renderTable();
    }
}

function updatePageInfo() {
    var table, tr, count = document.getElementById("offerTable").rows.length;
    count = Math.ceil(count / rowsPerPage)
    table = document.getElementById("offerTable");
    tr = table.getElementsByTagName("tr");

    // for (i = 1; i < tr.length; i++) {
    //     if (tr[i].style.display !== "none") {
    //         count++;
    //     }
    // }
    var pageInfo = document.getElementById("pageInfo");
    pageInfo.innerText = "Page " + currentPage + " of " + count;
}
