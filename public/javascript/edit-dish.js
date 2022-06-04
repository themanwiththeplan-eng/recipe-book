async function editFormHandler(event) {
  event.preventDefault()

  const dishName = document
    .querySelector('input[name="dish-dishName"]')
    .value.trim()
  const recipe = document.querySelector('input[name="recipe"]').value.trim()
  console.log(dishName)
  console.log(recipe)

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
