// api.js
export const createItem = async (name, description, setItems) => {
    const res = await fetch('http://localhost:3000/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }),
    });
    const newItem = await res.json();
    setItems((prev) => [...prev, newItem]); // อัปเดต state ใน App
  };
  
  export const updateItem = async (id, name, description) => {
    await fetch(`http://localhost:3000/api/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }),
    });
  };
  
  export const deleteItem = async (id, setItems) => {
    await fetch(`http://localhost:3000/api/items/${id}`, {
      method: 'DELETE',
    });
    setItems((prev) => prev.filter((item) => item.id !== id)); // ลบจาก state
  };
  