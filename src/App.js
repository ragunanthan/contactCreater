import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import img from "./logo/idcard.png";
import search from "./logo/search.png";
import edit from "./logo/edit.png";
import del from "./logo/delete.png";
import error from "./logo/error.png";

function App() {
  const [data, setdata] = useState([  ]);

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [company, setcompany]= useState("");
  const [errorusername, seterrorusername] = useState(false);
  const [erroremail, seterroremail] = useState(false)
  const [errorcompany, seterrorcompany] = useState(false)
  const [editusername, seteditusername] = useState("");
  const [editemail, seteditemail] =useState("");
  const [editcompany, seteditcompany] =useState("");
  const [key, setkey] = useState("")
  // add data to table
  function adddata(event) {

     if(username !==""& email !==""& company !=="" ){
      seterrorusername(false)
      seterroremail(false);
      seterrorcompany(false);
      const newdata =[...data, {username, email, company}];
      setdata(newdata);
      setusername("");
      setemail("");
      setcompany("");
      event.preventDefault();
      document.getElementById("createmodal").style.display = "none";
    }
    else if(username ==="" & email ===""&company==="" ){
      seterrorusername(true);
      seterroremail(true);
      seterrorcompany(true);
      event.preventDefault();
     
    }
    else if(username !=="" & email ===""&company==="" ){
      seterrorusername(false);
      seterroremail(true);
      seterrorcompany(true);
      event.preventDefault();
     
    }
    else if(username ==="" & email !==""&company==="" ){
      seterrorusername(true);
      seterroremail(false);
      seterrorcompany(true);
      event.preventDefault();
     
    }
    else if(username ==="" & email ===""&company !=="" ){
      seterrorusername(true);
      seterroremail(true);
      seterrorcompany(false);
      event.preventDefault();
     
    }
    else if(username !=="" & email !==""&company==="" ){
      seterrorusername(false);
      seterroremail(false);
      seterrorcompany(true);
      event.preventDefault();
     
    }
    else if(username ==="" & email !==""&company !=="" ){
      seterrorusername(true);
      seterroremail(false);
      seterrorcompany(false);
      event.preventDefault();
     
    }
    else if(username !=="" & email ===""&company!=="" ){
      seterrorusername(false);
      seterroremail(true);
      seterrorcompany(false);
      event.preventDefault();
     
    }
  }
  // function to get the individual contact for edit 
  function editcontact(k){
    data.find((e, key) => {if (key === k ) {seteditusername(e.username);seteditemail(e.email); seteditcompany(e.company); setkey(k)} return(null) } );
    document.getElementById("editmodal").style.display = "block";
  }
    // function to delete the individual contact
  function deletecontact(k) {
    const newdata = data.filter((e,key) => key !== k)
    setdata(newdata)
  }
  // function to edit the individual contact in the tabel
  function editdata(k) {
    data[k].username= editusername;
    data[k].email =editemail;
    data[k].company= editcompany;
    seteditusername("");
    seteditemail("");
    seteditcompany("");
    setkey("");
    document.getElementById("editmodal").style.display = "none";
    
  }
  // functions to open and close the create contact and edit contact
  function addContack() {
    document.getElementById("createmodal").style.display = "block";
  }
  function close() {
    seterrorusername(false)
    seterroremail(false);
    seterrorcompany(false);
    document.getElementById("createmodal").style.display = "none";
  }
  function closeedit() {
    document.getElementById("editmodal").style.display = "none";
  }
  useEffect(() => {
    window.onclick = function (event) {
      if (event.target === document.getElementById("createmodal")) {
        document.getElementById("createmodal").style.display = "none";
      }
      else if (event.target === document.getElementById("editmodal")){
        document.getElementById("editmodal").style.display = "none";
      }
    };
  });
  return (
    <Fragment>
      {/* header */}
      <div className="header">
        <div>
          <img className="logo" src={img} alt="Logo" />
        </div>
        <div className="headername">
          <p className="contacts">Contacts</p>
          <p className="welcome">Welcome to the Contact Page</p>
        </div>
      </div>
      {/* search box and add contact */}
      <div className="content">
        <div className="searchadd">
          <div className="search">
            <input placeholder="Search" />
            <img className="searchimage" src={search} alt="search" />
          </div>
          <button onClick={addContack}>+ Add Contact</button>
        </div>
        {/* display contact in list */}
        <div className="table">
          {data.length ? (
            <table className="table">
              <tr className="tableheading">
                <th className="tableheading1">no</th>
                <th className="tableheading2">Basic Info</th>
                <th className="tableheading3">Company</th>
                <th className="tableheading4">Action</th>
              </tr>
              {data.map((e, key) => (
                <tr key={key}>
                  <td className="tablevalue1">{key + 1}</td>
                  <td>
                    <div className="tabellogo">
                      <div className="tabellogo1">
                        {e.username.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span className="tableusername">{e.username}</span>
                        <br />
                        {e.email}
                      </div>
                    </div>
                  </td>
                  <td className="tablevalue1">{e.company}</td>
                  <td className="tablevalue1">
                    <img
                      className="del"
                      onClick={() => editcontact(key)}
                      src={edit}
                      alt="edit"
                    />
                    <img className="del" src={del} alt="del" onClick={() => deletecontact(key)} />
                  </td>
                </tr>
              ))}
            </table>
          ) : null}
        </div>
      </div>
      {/* model for add contact */}
      <div id="createmodal" className="modal">
        <div className="modal-content">
          <div className="modal-content-header">
            <span className="close" onClick={close}>
              &times;
            </span>
            <p className="create">Create Contact</p>
          </div>
          <form onSubmit={adddata}  >
          <div className="detailform">
                
            <p>Username</p>
            <div style={{display: "flex", flexDirection:"row"}}>
            <input  type="text" className={errorusername? "errorinput":"creatinput"}  placeholder="Enter your name" value={username} onChange={(e) =>{const name = e.target.value.slice(0,1).toUpperCase(); setusername(name + e.target.value.slice(1)); seterrorusername(false);}}   />
            {errorusername? <img src={error}    className="errorimg" />: null}
            </div>
            {errorusername? <p className="error">This Field is  Required</p>: null}
            <p>Email</p>
            <div style={{display: "flex", flexDirection:"row"}}>
            <input type="text" className={erroremail? "errorinput":"creatinput"}  placeholder="Enter your email address" value={email} onChange={(e) => { setemail(e.target.value); seterroremail(false);}}  />
            {erroremail? <img src={error}    className="errorimg" />: null}
            </div>
            {erroremail? <p className="error">This Field is   Required</p>: null}
            <p>Company</p>
            <div style={{display: "flex", flexDirection:"row"}}>
            <input type="text" className={errorcompany? "errorinput":"creatinput"}  placeholder="Company" value={company} onChange={(e) => {const name = e.target.value.slice(0,1).toUpperCase();setcompany(name + e.target.value.slice(1)); seterrorcompany(false);}}  />
            {errorcompany? <img src={error}    className="errorimg" />: null}
            </div>
            {errorcompany? <p className="error">This Field is   Required</p>: null}
          </div>
          <div className="Confirmform">
            <button className="cancel" onClick={close}>Cancel</button>
            <button className=  "Confirm"  type="submit">Confirm</button>
            
          </div>
          </form>
        </div>
      </div>
      {/* model for edit contact */}

      <div id="editmodal" className="modal">
        <div className="modal-content">
          <div className="modal-content-header">
            <span className="close" onClick={closeedit}>
              &times;
            </span>
            <p className="create">Edit Contact</p>
          </div>
          <form onSubmit={(event) =>{ event.preventDefault(); editdata(key);}} >
          <div className="detailform">
            <p>Username</p>
            <input  type="text" className="creatinput" placeholder="Enter your name" value={editusername} onChange={(e) => seteditusername(e.target.value)} required />
            <p>Email</p>
            <input  type="text" className="creatinput" placeholder="Enter your email address"  value={editemail} onChange={(e) => seteditemail(e.target.value)} required />
            <p>Company</p>
            <input  type="text" className="creatinput" placeholder="Company"  value={editcompany}  onChange={(e) => seteditcompany(e.target.value)} required />
          </div>
          
          <div className="Confirmform">
            <button className="cancel" onClick={closeedit}>Cancel</button>
            <button className="Confirm" type="submit" >Confirm</button>
          </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
