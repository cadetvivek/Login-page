document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const formData = new FormData(this);
    const data = {
      email: formData.get('email'),
      password: formData.get('password')
    };
  
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const result = await response.json();
      document.getElementById('message').textContent = result.message;
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('message').textContent = 'An error occurred, please try again.';
    }
  });
  