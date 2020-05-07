import React from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';

export function Collection({ collection, item, setItem, setCollection, placeholder }) {
  const removeItem = index => {
    setCollection(collection.filter((o, i) => i !== index));
  };

  const addItem = () => {
    setCollection([...collection, item]);
    setItem('');
  };

  return (
    <React.Fragment>
      <InputGroup style={{ marginBottom: '10px' }}>
        <Form.Control
          placeholder={placeholder}
          value={item}
          onChange={({ target: { value } }) => setItem(value)}
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" disabled={item.length === 0} onClick={addItem}>
            Add
          </Button>
        </InputGroup.Append>
      </InputGroup>
      {collection.map((option, i) => (
        <li key={option} onClick={() => removeItem(i)}>
          {option}
        </li>
      ))}
    </React.Fragment>
  );
}
