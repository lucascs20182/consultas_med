import React from 'react';
import { Container, Header, Footer, Text, Tab, Tabs } from 'native-base';

import List from '../screens/List';

const TelaInicial = () => {
  return (
    <Container>
      <Header hasTabs />
      <Tabs>
        <Tab heading="Pacientes cadastrados">
          <List />
        </Tab>
        <Tab heading="Médicos/Funcionários">
          <Text>conteudo2</Text>
        </Tab>
        <Tab heading="Consultas marcadas">
          <Text>conteudo3</Text>
        </Tab>
      </Tabs>
      <Footer />
    </Container>
  );
}

export default TelaInicial;
