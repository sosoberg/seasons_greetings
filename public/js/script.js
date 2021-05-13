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

const newFormHandler = async () => {
  
    const state_name = document.querySelector('#select_state').value;
    const start_month = document.querySelector('#select_mon').value;
    const h4 = document.querySelector('#test');
    // console.log(state_name)
    // console.log(start_month)

    // const response = await fetch(`/api/products`, {
    //     method: 'GET',
    // });
    //   if (response.ok) {
    //     data = response.json()
    //     console.log(data)
    //   } else {
    //     alert('Nothing Found!');
    //   }

    await fetch(`/api/products`).then(function (response) {
        return response.json();
    }).then(function (data) {
        var obj = {};
        for (let i = 0; i < data.length; i++) {
            if(data[i].state == state_name && data[i].start_season == start_month){
                console.log(data[i])
            }
        }
    })
  };
  
document.getElementById('search').addEventListener('click', function() {
    newFormHandler();
});
//   const delButtonHandler = async (event) => {
//     if (event.target.hasAttribute('data-id')) {
//       const id = event.target.getAttribute('data-id');
  
//       const response = await fetch(`/api/projects/${id}`, {
//         method: 'DELETE',
//       });
  
//       if (response.ok) {
//         document.location.replace('/profile');
//       } else {
//         alert('Failed to delete project');
//       }
//     }
//   };
  
//   document
//     .querySelector('.new-project-form')
//     .addEventListener('submit', newFormHandler);
  
//   document
//     .querySelector('.project-list')
//     .addEventListener('click', delButtonHandler);
  
