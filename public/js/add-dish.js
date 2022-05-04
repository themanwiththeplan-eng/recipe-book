async function newFormHandler(event) {
    event.preventDefault()
  
    const dishName = document.querySelector('input[name="post-title"]').value
    const recipe = document.querySelector('input[name="content"]').value
  
    const response = await fetch(`/api/dishes`, {
      method: 'POST',
      body: JSON.stringify({
        dishName,
        recipe,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  
    if (response.ok) {
      document.location.replace('/dashboard')
    } else {
      alert(response.statusText)
    }
  }
  
  document
    .querySelector('#new-post-form')
    .addEventListener('submit', newFormHandler)