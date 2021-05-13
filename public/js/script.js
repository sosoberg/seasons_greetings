// opens login page
const login = document.getElementById('login')

if (login) {
    login.addEventListener('click', function() {
        document.location.replace('/login');
    });
};

document.getElementById('chat').addEventListener('click', function() {
    document.location.replace('/community');
});

document.getElementById('home').addEventListener('click', function() {
    document.location.replace('/');
});

document.getElementById('profile').addEventListener('click', function() {
    document.location.replace('/profile');
});

