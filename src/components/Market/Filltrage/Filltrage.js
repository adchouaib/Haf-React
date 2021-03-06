import React, { useState } from 'react';
import './Filltrage.scss';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem , Button} from 'reactstrap';

const Filltrage = (props) => {
  const [dropdownOpen2, setOpen2] = useState(false);
  const toggle2 = () => setOpen2(!dropdownOpen2);

  return(
    <> 
      <div className="introo" >
        <div className="div1">
          <ButtonDropdown isOpen={dropdownOpen2} toggle={toggle2}>
            <DropdownToggle caret id="dropdowntoggle">
            Name
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem >Desc </DropdownItem>
              <DropdownItem >Asc</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </div> 
        <div className="div2">
          <input type="hidden" name="search_param" value="all" id="search_param"/>
          <input className="form-control resize" type="text" name="x" placeholder="Search"/>
          <Button className="btn"><i className="fa fa-search"></i></Button>
        </div>
      </div>     
  </> 
  );
  
} 


export default Filltrage;

