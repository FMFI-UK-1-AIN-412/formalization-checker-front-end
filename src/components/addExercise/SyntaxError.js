import React from 'react';
import { Form } from 'react-bootstrap';


function SyntaxError({ value, error }) {
  if (!error) {
    return null;
  }

  const start = error.location.start.offset;
  const end = error.location.end.offset;

  const str_1 = value.substring(0, start);
  const str_2 = value.substring(start, end);
  const str_3 = value.substring(end);

  const str = value === "" ?
    null : (
      <div>
        {str_1}
        <u className="bg-warning">
          {str_2}
        </u>
        {str_3}
      </div>
    );

  return (
    <Form.Text className="mb-3">
      {str}
      <div className="text-danger">
        {error.message}
      </div>
    </Form.Text>
  );
}

export default SyntaxError;
