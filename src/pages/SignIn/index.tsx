import React, { useCallback, useRef } from 'react';
import { Container, Content, Background, AnimationContent } from './styles';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { FormHandles } from '@unform/core';

import Logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/ToastContext';
import { Link, useHistory } from 'react-router-dom';

interface SignFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(async (data: SignFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail é obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().required('Senha é obrigatório.'),
      });

      await schema.validate(data, { abortEarly: false });
      await signIn({
        email: data.email,
        password: data.password
      });
      history.push('/');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }
      addToast({
        type: 'error',
        title: 'Erro na autenticação',
        description: 'E-mail e/ou senha incorreto.'
      });
    }
  }, [signIn, addToast, history]);

  return (

    <Container>
      <Content>
        <AnimationContent>
          <img src={Logo} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1> Faça seu Logon </h1>
            <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />

            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

            <Button type="submit" >Entrar</Button>

            <Link to="forgot">Esqueci minha senha</Link>
          </Form>

          <Link to="/signup">
            <FiLogIn />
          Criar conta</Link>
        </AnimationContent>
      </Content>

      <Background />
    </Container>
  );
}

export default SignIn;
