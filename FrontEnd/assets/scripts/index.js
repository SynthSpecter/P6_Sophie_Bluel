let token = sessionStorage.getItem("token");
let currentPage = window.location.pathname.split('/').pop();

if (token && currentPage !== 'edit.html') {
    window.location = "./edit.html";
}