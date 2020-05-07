import React from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import { Collection } from './components/Collection';

export function NewQuestion({ onCreate }) {
  const [season, setSeason] = React.useState('');
  const [episode, setEpisode] = React.useState('');
  const [text, setText] = React.useState('');
  const [answer, setAnswer] = React.useState('');
  const [option, setOption] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const [tag, setTag] = React.useState('');
  const [tags, setTags] = React.useState([]);

  const reset = () => {
    setSeason('');
    setEpisode('');
    setText('');
    setAnswer('');
    setOption('');
    setOptions([]);
    setTag('');
    setTags([]);
  };

  const isValid = () => {
    return text.length > 0 && answer.length > 0 && options.length > 0 && tags.length > 0;
  };

  const createQuestion = () => {
    const question = {
      season,
      episode,
      text,
      answer,
      options,
      tags
    };

    onCreate(question);
    reset();
  };

  return (
    <Container>
      <Row>
        <Col xs={7}>
          <Form>
            <Form.Row>
              <Col>
                <Form.Group controlId="season">
                  <Form.Control
                    as="select"
                    placeholder={'Season'}
                    value={season}
                    onChange={({ target: { value } }) => setSeason(value)}
                  >
                    <option value="">Select Season</option>
                    {Array.from({ length: 9 }).map((_, i) => {
                      const v = `Season ${i + 1}`;
                      return <option key={v}>{v}</option>;
                    })}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="episode">
                  <Form.Control
                    as="select"
                    disabled={season.length === 0}
                    value={episode}
                    onChange={({ target: { value } }) => setEpisode(value)}
                  >
                    <option value="">Select Episode</option>
                    {Array.from({ length: EPS_IN_SEASON[season] }).map((_, i) => (
                      <option key={i}>Episode {i + 1}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Group controlId="question">
              <Form.Label>Question</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                value={text}
                onChange={({ target: { value } }) => setText(value)}
              />
            </Form.Group>
            <Form.Group controlId="answer">
              <Form.Label>Answer</Form.Label>
              <Form.Control
                as="textarea"
                rows="2"
                value={answer}
                onChange={({ target: { value } }) => setAnswer(value)}
              />
            </Form.Group>
            <Collection
              placeholder="Option"
              item={option}
              setItem={setOption}
              collection={options}
              setCollection={setOptions}
            />
            <Collection
              placeholder="Tag"
              item={tag}
              setItem={setTag}
              collection={tags}
              setCollection={setTags}
            />
          </Form>
          <div style={{ float: 'right', marginTop: '10px' }}>
            <Button variant="secondary" style={{ marginRight: '5px' }} onClick={reset}>
              Reset
            </Button>
            <Button onClick={createQuestion} disabled={!isValid()}>
              Create
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

const EPS_IN_SEASON = {
  'Season 1': 6,
  'Season 2': 22,
  'Season 3': 25,
  'Season 4': 19,
  'Season 5': 28,
  'Season 6': 26,
  'Season 7': 26,
  'Season 8': 24,
  'Season 9': 25
};
