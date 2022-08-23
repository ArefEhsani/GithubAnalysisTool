const loadingNumber = document.querySelector('#loadingNumber');
const loadingCircle = document.querySelector('.loading-circle');
let load = 0;

setInterval(updateLoader, 30);

function updateLoader() {
    load += (load < 100);
    loadingNumber.innerHTML = load;
    loadingCircle.style.background = 'conic-gradient(from 0deg at 50% 50%, rgb(231, 189, 0) 0%, rgb(231, 131, 0) ' + load + '%, #101012 ' + load + '%)'
}