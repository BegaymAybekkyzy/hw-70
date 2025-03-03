import { Card } from 'react-bootstrap';
import * as React from 'react';

interface Props {
  imgUrl: string;
  text: string;
  onHide?:() => void;
}

const ContactItem: React.FC<Props> = ({imgUrl, text, onHide}) => {
  return (
    <Card className="mb-3" onClick={onHide}>
      <Card.Body className="d-flex p-1 align-items-center">
        <div style={{maxWidth: "150px"}}>
          <Card.Img src={imgUrl} className="w-100 d-block" alt={text} />
        </div>
        <Card.Text className="p-3 fs-4">{text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ContactItem;