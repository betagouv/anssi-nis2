import './App.css'
import { Col, Container, Header, HeaderBody, HeaderOperator, Icon, Logo, Row, Service, Tool, ToolItem, ToolItemGroup } from '@dataesr/react-dsfr';
import AnssiLogo from './assets/anssi.png'
import '@gouvfr/dsfr/dist/utility/icons/icons-system/icons-system.min.css';

function App() {
  return (
    <>
      <Header>
        <HeaderBody>
          <Logo>République Française</Logo>
          <HeaderOperator>
            <img
              alt="Logotype ANSSI"
              src={AnssiLogo}
            />
          </HeaderOperator>
          <Service
            description=""
            title="MonParcoursNIS2"
          />

          <Tool>
            <ToolItemGroup>
              <ToolItem icon="ri-live-fill" link="/">
                Webinaire de présentation
              </ToolItem>
              <ToolItem icon="ri-arrow-right-line" link="/">
                FAQ NIS2
              </ToolItem>
            </ToolItemGroup>
          </Tool>
        </HeaderBody>
      </Header>
      <Container>
        <Row>
          <Col>
            <Icon
              name="ri-alert-fill"
              size="2x"
              title="Here is a title"
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
