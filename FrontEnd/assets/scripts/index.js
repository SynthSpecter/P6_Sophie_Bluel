const token = sessionStorage.getItem("token");
const currentPage = window.location.pathname.split('/').pop();

if (token && currentPage !== 'edit.html') {
    window.location = "./edit.html";
}