import React,{useState} from 'react';
import './Donate.scss';
import ReactDOM from "react-dom"

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

const Donate = (props) => {
  
  console.log(props)
  console.log(props.location.state.input)
  const createOrder = (data, actions) =>{
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: props.location.state.input.input,
          },
        },
      ],
    });
  };

  const onApprove=async(data, actions) => {
    const order = await actions.order.capture();
    const donation={
      "projectId":props.history.location.state.idProject,
      "donorId":props.profile._id,
      "amount":order.purchase_units[0].amount.value
    }
    props.AddDonation(donation.projectId,donation.donorId,donation.amount);
    console.log(donation)
    console.log('ORDER', order);
};

  const [navItems, setnavItems] = useState({"paypal":true,"otheroption":false});
  const [activeClass, setactiveClass] = useState({"paypal":"-active","otheroption":""});
  const toggle = (Event) =>{
    
    
      switch (Event.target.id) {
          case "paypals":
              setnavItems({"paypal":true,"credit":false,"otheroption":false});
              setactiveClass({"paypal":"-active","credit":"","otheroption":""});
              break;
         
          case "otheroptions":
              setnavItems({"paypal":false,"credit":false,"otheroption":true});
              setactiveClass({"paypal":"","credit":"","otheroption":"-active"});
              break;   
          default:
            break;
      }
  }
  return(
  <div className="Donate" data-testid="Donate">
     <div className="main" id="payement">
      <div className="container-fluid">
        <div className="DonateTo">
          <h5 >Donate to <strong>Project Name </strong>
          <div><p id="wi">and we will send you updates about your impact</p></div>
            
          </h5>
        </div>
        <div className="payements"> 
          <div className="paypal"> 
            <div className={"bar"+activeClass.paypal}></div>
            <h6  id="paypals" onClick={toggle} >Paypal/Credit Card</h6>
          </div>
          
          <div className="others">
            <div className={"bar"+activeClass.otheroption}></div>
            <h6 id="otheroptions" onClick={toggle}>others</h6>
          </div>
        </div>
        <div className="paragraph"> 
          <p>
            Please click the button below and follow the instructions
            provided to complete your   {props.location.state.input.input} $ donation.
          </p>
        </div>
        <div>
                {navItems.paypal ? <div><div> 
                <PayPalButton style={{"z-index":"10px"}}
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
        </div></div> :null}
                {navItems.credit ? <div>credit</div>:null}
                {navItems.otheroption ? <div>otheroption</div>:null}
            </div>
        
      </div>
    </div>
  </div>
);
  }



export default Donate;