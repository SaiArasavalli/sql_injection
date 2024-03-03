const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  try {
    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (data.success) {
      alert('Login successful');
    } else {
      alert(`Login failed: ${data.message} `);
    }
  } catch (err) {
    console.error(Error);
    alert('Something went wrong. Please try again later');
  }
});
