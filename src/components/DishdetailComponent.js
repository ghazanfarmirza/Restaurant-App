import moment from 'moment';
import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';


function RenderDish({dish}) {
  return (
    <Card>
      <CardImg top src={dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  )
}

function RenderComments({comments}) {

  const showComments = comments.map((comment) => {
    return (
      <div key={comment.id}>
        <div>{comment.comment}</div>
        <div>
            {'-- ' + comment.author + ', ' + moment(comment.date).format('MMM DD, YYYY')}
        </div>
        <br/>
      </div>
    );
  })

  return (
      <div>
          <h3>Comments</h3>
          <ul className="list-unstyled">
              {showComments}
          </ul>
      </div>
  );
}

// Dishdetail is implemented as a functional (stateless) component
const DishDetail = (props) => {

    if (props.dish) {
      return (
        <div className="container">
        <div className="row">
          <Breadcrumb>
              <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
              <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
              <h3>{props.dish.name}</h3>
              <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments} />
            <b>Price is {props.dish.price}</b>
          </div>
          <div className="row">
          <form>
            <h2>30% Discount for Students and Faculty of COMSATS Lahore</h2>
            <label>
               <h4><b>Order Your {props.dish.name} Now:</b></h4><br></br>
               Please Select Your Qauntity:<br></br>
            </label>
            <br></br>
            <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            </select>
            <br></br>
            <input type="submit" value="Order" />
          </form>
          </div>
        </div>
        </div>
    );
    } else { // Empty props
      return(
        <div className="col-12"></div>
      )
    }
}

export default DishDetail;