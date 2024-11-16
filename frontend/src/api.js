async function createChat() {
  const res = await fetch('http://127.0.0.1:8000/start_session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await res.json();
  if (!res.ok) {
    return Promise.reject({ status: res.status, data });
  }
  return data;
}

async function sendChatMessage(sessionId, message) {
  const res = await fetch(`http://127.0.0.1:8000/process_input/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session_id: sessionId, user_input: message }), // Ensure the structure matches the API
  });

  if (!res.ok) {
    return Promise.reject({ status: res.status, data: await res.json() });
  }

  return res.json(); // Parse the response JSON
}

async function endSession(sessionId) {
  const res = await fetch(`http://127.0.0.1:8000/end_session/${sessionId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    return Promise.reject({ status: res.status, data: await res.json() });
  }

  return res.json(); // Parse and return the JSON response
}

async function confirmTransaction(sessionId) {
  const res = await fetch('http://127.0.0.1:8000/confirm_transaction/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session_id: sessionId }), // Ensure the structure matches the API
  });

  if (!res.ok) {
    return Promise.reject({ status: res.status, data: await res.json() });
  }

  return res.json(); // Parse and return the JSON response
}

async function createOrder(order) {
  console.log(JSON.stringify(order))
  const res = await fetch('http://localhost:3001/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  });

  if (!res.ok) {
    return Promise.reject({ status: res.status, data: await res.json() });
  }

  return res.json(); // Parse and return the response JSON
}

async function updateStatusOrder(orderId) {
  try {
    const res = await fetch(`http://localhost:3001/orders/${orderId}/solved`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      // No need to include a body unless your endpoint requires additional data
    });

    if (!res.ok) {
      const errorData = await res.json();
      return Promise.reject({ status: res.status, data: errorData });
    }

    return res.json(); // Parse and return the response JSON
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
}


export default {
  createChat,
  sendChatMessage,
  confirmTransaction,
  createOrder
};
