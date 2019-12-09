import React, { useState } from 'react';
import { navigate } from 'gatsby-link';
import styled from 'styled-components';
import { Heading, Text, Box, Flex } from 'rebass/styled-components';
import { MainLayout } from '@layouts';
import { coloredSection } from '@utils/mixins';
import { colors } from '@theme';
import SEO from '@components/seo';
import Newsletter from '@components/newsletter';

const offset = 160;

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

const Header = styled.header`
  ${coloredSection('738px', '-15deg')};
`;

const Form = styled.form`
  input,
  textarea {
    display: block;
    width: 100%;
    border: 1px solid #e5e5e5;
    background: ${colors.white};
    padding: 0.5rem;
    height: 48px;
    box-sizing: border-box;
  }

  button {
    display: flex;
    width: 100%;
    height: 48px;
    padding: 20px;
    font-size: 14px;
    justify-content: center;
    align-items: center;
    background-color: ${colors.lipstick};
    color: ${colors.white};
    border: none;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 250ms ease-in-out;

    &:hover,
    &:focus {
      background-color: ${colors.ligthPeach};
      color: ${colors.lipstick};
    }
  }
`;

const Label = ({ children, ...rest }) => (
  <Text
    as="label"
    fontSize="12px"
    lineHeight="24px"
    color="warmGrey"
    mb="0.5rem"
    {...rest}
  >
    {children}
  </Text>
);
const Field = ({ label, id = '', children }) => (
  <Box mb="1rem">
    <Label htmlFor={id}>{label}</Label>
    {children}
  </Box>
);

export default () => {
  const [state, setState] = useState({});

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch(error => alert(error));
  };

  return (
    <MainLayout bg="whiteTwo">
      <SEO title="Contact" />
      <Header>
        <Heading as="h1" fontSize={[32, 56]} lineHeight="1.2" mb="0.5em">
          Contactez-nous
        </Heading>
        <Text
          maxWidth="340px"
          mb={`${offset}px`}
          color="greyishBrown"
          fontSize={14}
          lineHeight="24px"
          textAlign="center"
        >
          On adore avoir de vos nouvelles ! Alors que ce soit pour une question
          sur un produit, sur une disponibilité, sur nos collections, pour
          parler up cycling ou zéro déchet ou encore pour devenir revendeur de
          nos bijoux, envoyez nous votre message !
        </Text>
      </Header>
      <Flex p={[20, 0]}>
        <Box
          p={[20, 120]}
          bg="white"
          mt={`-${offset}px`}
          mb={`${offset}px`}
          ml="auto"
          mr="auto"
          width={[1, '700px']}
        >
          <Heading
            textAlign="center"
            as="h2"
            fontSize={24}
            lineHeight="1.2"
            mb="0.5em"
          >
            Votre message
          </Heading>
          <Form
            name="contact"
            method="post"
            action="/thanks/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="bot-field" onChange={handleChange} />
            <Field label="Votre demande" id="demand">
              <input
                type="text"
                name="demand"
                required
                onChange={handleChange}
              />
            </Field>
            <Field label="Votre nom complet">
              <input type="text" name="name" required onChange={handleChange} />
            </Field>
            <Field label="Votre email">
              <input
                type="email"
                name="email"
                required
                onChange={handleChange}
              />
            </Field>
            <Field label="Votre entreprise (facultatif)">
              <input type="text" name="company" onChange={handleChange} />
            </Field>
            <Field label="Votre demande">
              <textarea
                name="message"
                cols="30"
                rows="10"
                required
                onChange={handleChange}
              ></textarea>
            </Field>
            <Box mt={['1rem', '4rem']}>
              <button type="submit">Envoyer la missive</button>
            </Box>
          </Form>
        </Box>
      </Flex>
      <Newsletter />
    </MainLayout>
  );
};
