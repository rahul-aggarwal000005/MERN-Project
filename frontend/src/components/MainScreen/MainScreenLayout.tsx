import React, { ReactNode } from "react";
import "./MainScreenLayout.css";
import { Container, Row } from "react-bootstrap";
type Props = {
  title: string;
  children: ReactNode;
};

const MainScreenLayout: React.FC<Props> = ({ children, title }) => {
  return (
    <div className="mainback">
      <Container>
        <Row>
          <div className="page">
            {title && (
              <>
                <h1 className="heading">{title}</h1>
                <hr />
              </>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default MainScreenLayout;
