import React from "react";
import { Col, Container, Row } from "reactstrap";

const NonAuthLayout = ({ children }) => {
    return (
        <Container fluid className="p-0 m-0" style={{ height: '100vh' }}>

            <Row lg="12" md="12" sm="12"
                className="p-0 m-0 d-flex flex-row h-100"
            >
                <Col lg="6" md="6" sm="6"
                    className="d-flex flex-column justify-content-center align-items-center p-4 h-100"
                >
                    {children}
                </Col>

                <Col lg="6" md="6" sm="6"
                    className="p-0 position-relative h-100"
                >
                    <img
                        src="/NonAuthBackground.png"
                        alt="Background"
                        style={{
                            width: '100%',
                            height: '100vh',
                            objectFit: 'cover'
                        }}
                    />
                    <img
                        src="/BaseLogo.png"
                        alt="Logo"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            maxWidth: '50%',
                            height: 'auto',
                        }}
                    />
                </Col>

            </Row>
        </Container>
    );
};

export default NonAuthLayout;
