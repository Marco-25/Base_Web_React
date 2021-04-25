import React, { useCallback, useRef } from 'react';
import { Container, Content, Background, AnimationContent } from './styles';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../hooks/ToastContext';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string().required('E-mail é obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'Senha de ter no minimo 6 digitos'),
      });

      await schema.validate(data, { abortEarly: false });
      await api.post('/users', data);
      history.push('/');
      addToast({
        type: 'success',
        title: 'Cadastro realizado!',
        description: 'Você ja pode efetuar login no GoBarber'
      });

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }
      addToast({
        type: 'error',
        title: 'Erro no cadastro',
        description: 'Ocorreu um erro ao tentar efetuar cadastro, tente novamente mais tarde.'
      });
    }
  }, [addToast, history]);

  return (

    <Container>
      <Background />

      <Content>
        <AnimationContent>
          <img src={Logo} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1> Faça seu Cadastro </h1>
            <Input name="name" icon={FiUser} type="text" placeholder="nome" />

            <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />

            <Input name="password" icon={FiLock} type="password" placeholder="senha" />

            <Button type="submit" >Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
          Voltar para logon</Link>
        </AnimationContent>
      </Content>
    </Container>
  );
}

export default SignUp;
