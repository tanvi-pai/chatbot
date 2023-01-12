import { Card,Form } from "react-bootstrap"
const Home=()=><>
<Card className="loading-banner">
    <Card.Header>Hello</Card.Header>
    <Card.Body></Card.Body>
    <Card.Footer>
    <div className="admin-cei-edit-style">
                  <Form.Control
                    type="text"
                    placeholder="Enter CEI Name"
                    // onChange={clickCEIHandleChange}
                    
                  />
                </div>
    </Card.Footer>
</Card>
</>

export default Home