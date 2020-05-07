import React from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import { NewQuestion } from './new-question/NewQuestion';
import { ViewQuestions } from './view-questions/ViewQuestions';

function App() {
  const saveQuestion = (question) => {
    const req = window.indexedDB.open('office-trivia', 1);

    req.onsuccess = function (event) {
      let db = event.target.result;

      const tx = db.transaction('questions', 'readwrite');
      const store = tx.objectStore('questions');
      store.add(question);
    };
  };

  return (
    <Container>
      <Tabs
        style={{ marginTop: '20px' }}
        defaultActiveKey="new-question"
        id="app-tabs"
        unmountOnExit
      >
        <Tab style={{ marginTop: '20px' }} eventKey="new-question" title="New Question">
          <NewQuestion onCreate={saveQuestion} />
        </Tab>
        <Tab style={{ marginTop: '20px' }} eventKey="questions" title="View Questions">
          <ViewQuestions />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default App;
