import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { createItem, updateItem, deleteItem } from './api'; // import ฟังก์ชัน

function App() {
  const [items, setItems] = useState([]);

  // เมื่อ component โหลดครั้งแรก ให้ดึงข้อมูลจาก API
  useEffect(() => {
    fetch('http://localhost:3000/api/items')
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>My CRUD App</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong>: {item.description}
            <button onClick={() => deleteItem(item.id, setItems)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => createItem("New Item", "This is a new item", setItems)}>
        Add Item
      </button>
    </div>
  );
}

export default App;
