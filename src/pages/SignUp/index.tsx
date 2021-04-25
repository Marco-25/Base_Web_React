import React, { useCallback, useRef } from 'react';
import { Container, Content, Background } from './styles';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import { Link } from 'react-router-dom';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string().required('E-mail é obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'Senha de ter no minimo 6 digitos'),
      });

      await schema.validate(data, { abortEarly: false });
    } catch (err) {
      // console.log({ err })
      const errors = getValidationErrors(err);
      formRef.current?.setErrors(errors);
    }
  }, []);

  return (

    <Container>
      <Background />

      <Content>
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

      </Content>
    </Container>
  );
}

export default SignUp;
