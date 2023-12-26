import { Alert, Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css"
import { useState } from "react";
import { REST_URL } from "../../util/AuthUtil";

export default function SignUp() {

    const navigate = useNavigate()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [mobileNo, setMobileNo] = useState("")
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const signUpHandler = async (event) => {
        event.preventDefault();

        try {
            var res = await fetch(REST_URL + "/api/v1/auth/signup", {
                method: "POST",
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    mobileNo: mobileNo,
                    role: "USER"
                }),
                headers: { "Content-Type": "application/json" }
            })

            if (res.status === 201) {
                navigate("/signin")
            } else if (res.status === 409) {
                setErrorFlag(true);
                setErrorMessage("User already present")
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col sm={8} style={{ padding: 0 + 'px' }}>
                        <div className="left-bg"></div>
                    </Col>
                    <Col sm={4} className="SignUpLayout">
                        <Container>
                            <Alert className="mb-5" key={"danger"} variant={"danger"} show={errorFlag}>
                                {errorMessage}
                            </Alert>

                            <Form onSubmit={signUpHandler}>
                                <FloatingLabel controlId="floatingFirstName" label="First Name" className="mb-3">
                                    <Form.Control type="text" placeholder="John" id="firstName" onChange={(e) => { setFirstName(e.target.value) }}
                                        required />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingLastName" label="Last Name" className="mb-3">
                                    <Form.Control type="text" placeholder="Doe" id="lastName" onChange={(e) => { setLastName(e.target.value) }}
                                        required />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-3">
                                    <Form.Control type="email" placeholder="name@example.com" id="email" onChange={(e) => { setEmail(e.target.value) }}
                                        required />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingMobileNo" label="Mobile No" className="mb-3">
                                    <Form.Control type="text" placeholder="9876543210" id="mobileNo" onChange={(e) => { setMobileNo(e.target.value) }}
                                        required />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                                    <Form.Control type="password" placeholder="Password" id="password" onChange={(e) => { setPassword(e.target.value) }}
                                        required />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password" className="mb-3">
                                    <Form.Control type="password" placeholder="Confirm password"
                                        id="confirmPassword" onChange={(e) => { setConfirmPassword(e.target.value) }}
                                        isInvalid={password !== confirmPassword}
                                        isValid={password === confirmPassword}
                                        required />
                                    <Form.Control.Feedback type="invalid" tooltip>Password is not same</Form.Control.Feedback>
                                </FloatingLabel>
                                <div className="SignFormBottomBar">
                                    <Button type="submit" variant="primary">Sign Up</Button>
                                    <Link to="/signin">Already have an account?</Link>
                                </div>

                            </Form>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    );
}