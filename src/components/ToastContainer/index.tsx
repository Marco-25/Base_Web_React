import React from 'react';
import { useTransition } from 'react-spring';
import { ToastMessage } from '../../hooks/ToastContext';
import { Container } from './styles';
import Toast from './Toast';

interface ToastProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    // message => message.id,
    {
      from: { right: '-120%' },
      enter: { right: '0%}' },
      leave: { right: '-120%' },
    }
  );

  return (
    <Container>
      {messages.map(message => (
        <Toast key={message.id} message={message} />
      ))}
    </Container>
  );
}

export default ToastContainer;
