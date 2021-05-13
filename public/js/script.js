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

const newFormHandler = async () => {
    const state_name = document.querySelector('#select_state').value;
    const start_month = document.querySelector('#select_mon').value;
    const h4 = document.querySelector('#result');
    h4.innerHTML = '';
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
        for (let i = 0; i < data.length; i++) {
            if((data[i].state == state_name && data[i].start_season == start_month) || (data[i].state == state_name && data[i].start_season < start_month && data[i].end_season >= start_month) || (data[i].state == state_name && data[i].start_season < start_month && data[i].end_season < data[i].start_season)){
                var foodBtn = document.createElement('button');
                foodBtn.innerHTML = data[i].name
                h4.appendChild(foodBtn);
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
  