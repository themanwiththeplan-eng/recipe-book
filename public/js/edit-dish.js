async function editFormHandler(event) {
    event.preventDefault()
  
    const title = document.querySelector('input[name="post-title"]').value.trim()
    const content = document.querySelector('input[name="content"]').value.trim()
    console.log(title)
    console.log(content)
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ]
  
    const response = await fetch(`/api/dishes/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        post_id: id,
        dishName,
        recipe,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  
    if (response.ok) {
      document.location.replace('/dashboard/')
    } else {
      alert(response.statusText)
    }
  }
  
  document
    .querySelector('.edit-dish-form')
    .addEventListener('submit', editFormHandler)