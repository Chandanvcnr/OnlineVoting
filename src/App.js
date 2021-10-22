import React, { useState,useEffect } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'; 
import Dropdown from 'react-bootstrap/Dropdown'; 
import Card from 'react-bootstrap/Card'; 
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Thankyou from './assets/VotingDone.jpg';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import firebaseDb from "./firebase";  

import './App.css';
import characters from './assets';
const MAXVOTE= 20;
// const contestant=['chandu','bindu','roopa','bhoomi','aparna']
const inputElement = null;
const ExampleToast = ({ children }) => {
  //const [show, toggleShow] = useState(true);
 
  return (
    <>
      {/* {!show && <Button onClick={() => toggleShow(true)}>Show Toast</Button>}
      <Toast show={show} onClose={() => toggleShow(false)}>
        <Toast.Header>
          <strong className="mr-auto">React-Bootstrap</strong>
        </Toast.Header>
        <Toast.Body>{children}</Toast.Body>
      </Toast> */}
      <Modal>
        <Modal.Header closeButton>
          <Modal.Title>Caution!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are u sure to vote, once voted,can be changed</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">
            Close
          </Button>
          <Button variant="primary">
            Vote him
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const App = () => {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(true);
  const [contestant,setContestents] = useState([{name:'Chandu',gender:'M'},
                                                {name:'Madhukar',gender:'M'},
                                                {name:'Rameshmath',gender:'M'},
                                                {name:'Appu stylish',gender:'M'},
                                                {name:'Manju shetti',gender:'M'},
                                                {name:'Sunil hn',gender:'M'},
                                                {name:'Manikanta mys',gender:'M'},
                                                {name:'Mouny',gender:'M'},
                                                {name:'Dhanraj',gender:'M'},
                                                {name:'Anand',gender:'M'},
                                                {name:'Nitin bk',gender:'M'},
                                                {name:'Amaresh',gender:'M'},
                                                {name:'Bhargav',gender:'M'},
                                                {name:'Gopal',gender:'M'},
                                                {name:'Lohith',gender:'M'},
                                                {name:'Ravi.N.P',gender:'M'},
                                                {name:'Shalini Dinesh',gender:'F'},
                                                {name:'Anjali Anju',gender:'F'},
                                                {name:'Hema Gowda',gender:'F'},
                                                {name:'Bhavya',gender:'F'},
                                                {name:'Sunitha Kannadathi',gender:'F'},
                                                {name:'Sunitha Harsha',gender:'F'},
                                                {name:'Suman',gender:'F'},
                                                {name:'Lata sali',gender:'F'},
                                                {name:'Aparna',gender:'F'},
                                                {name:'Rashmitha',gender:'F'},
                                                {name:'Renuka.J',gender:'F'},
                                                {name:'Ganu',gender:'F'},
                                                {name:'Manya',gender:'F'},
                                                {name:'Inchara',gender:'F'},
                                              ])
  const [dropdown,setDropdown] = useState(true);
  const [Selectedcontestent,setContestent] = useState('');
  const [SearchValue,setSearchValue] = useState('');
  const [Allcharacters,setAllCharacters] =useState(characters);
  const [userName,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const [loginId,setLoginId] = useState('');
  const [selectedCharacter,setSelectedCharacter]=useState({});
  const [totalVotes,setTotalVotes]=useState(0);
  const [voteDone,setVoteDone]=useState(false);
  const [errMsg,setErrMsg]= useState(false);
  const [showThankyou,setShowThankyou]= useState(false);
  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow(true);

  useEffect(()=>{ 
    // firebaseDb.child('loginDetails').on('value',snapshot =>{
    //   if(snapshot.val() !== null){
    //     //code u get that data
    //     //...snapshot.val()
    //     //console.log(snapshot.val().votes)
    //     const data = snapshot.val()
    //     //console.log(data)
    //     debugger
    //     Object.keys(data.votes !== null && data.votes !== undefined?data.votes:exit).map(id =>{
    //       console.log(data.votes[id])
    //     })
    //   }

    // })
    var userData = {};
    var finalData = [];
    firebaseDb.child(`loginDetails`).get().then((snapshot) => {
      if (snapshot.exists()) {
       console.log(Object.keys(snapshot.val()))
      
        userData = snapshot.val()
        Object.keys(userData).map((id)=>
        {
        console.log(Object.keys((userData[id].votes)))
          Object.keys((userData[id].votes)).map((vote)=>
        {
          // Object.keys(userData[id].votes[vote]).map((d)=>
            finalData.push({contestent:userData[id].votes[vote]['contestent'], character: userData[id].votes[vote]['text']})
            // )
        }
        )
      }
        )
      
      }
    }).then(()=>{
      debugger
      console.log('',finalData)
      const result = Object.values(finalData.reduce((r, e) => {
        let k = `${e.contestent}|${e.character}`;
        if(!r[k]) r[k] = {...e, count: 1}
          else r[k].count += 1;
        return r;
      }, {}))
  
  var compare=(a, b) => {
    const bandA = a.count;
    const bandB = b.count;
  
    let comparison = 0;
    if (bandA < bandB) {
      comparison = 1;
    } else if (bandA > bandB) {
      comparison = -1;
    }
    return comparison;
  }
  
  console.log(result.sort(compare));
    })
    // firebaseDb.child(`loginDetails/${loginId}`).get().then((snapshot) => {
    //   if (snapshot.exists()) {
    //     debugger
    //     console.log(snapshot.val());
        
    //     voteToOther(snapshot.val())
    //   } else {
    //     console.log("No data available");
    //   }
    // }).catch((error) => {
    //   console.error(error);
    // });
   

  },[voteDone,loginId])


  const voteToOther = (data) =>{
    
    console.log(Object.keys(data.votes).length)
    setDropdown(true);
    setTotalVotes(Object.keys(data.votes).length);
    if(Object.keys(data.votes).length >= MAXVOTE){
      setShowThankyou(true)
    }
    let filterData = []
    contestant.map((selectedGuy)=>{
      Object.keys(data.votes).map(id =>{

        if ((data.votes[id].contestent === selectedGuy.name))
           filterData = [...filterData,selectedGuy.name]
          
        
           //return null
      })
     // return null
    })
   // console.log(filterData)
    
    setContestents(contestant.filter(item => !filterData.includes(item.name)));


    let filterCharacters=[]
    Allcharacters.map((selectedCharacter)=>{
      Object.keys(data.votes).map(id =>{

        if ((data.votes[id].text === selectedCharacter.text))
        filterCharacters = [...filterCharacters,selectedCharacter.text]
          
        
       // return null
      })
      //return null
    })
    // console.log(filterCharacters)
    // debugger
    setAllCharacters(Allcharacters.filter((item,i) => !filterCharacters.includes(item.text)));
  }

  
     
  const searchCharacter = () =>{
   
    //console.log('SearchValue',SearchValue)
    const FilteredData =  Allcharacters.filter((characters)=>characters.text.includes(SearchValue.toLowerCase()));
    if(SearchValue === null || SearchValue.length === 1){
     // console.log('no data')
      setAllCharacters(characters)
    }
    else if(FilteredData.length === 0){
      setAllCharacters(characters)
    }else{
     // console.log(FilteredData)
      setAllCharacters(FilteredData)
    }
    
    //console.log(FilteredData)
  }
const handleLogin = () =>{
  console.log(userName,'userName',password,'password');


  // var id = firebaseDb.child('loginDetails').push(
  //   {
  //     userName,
  //     password: `${Math.floor(100000 + Math.random() * 900000)}KSW`
  //   },
  //   err =>{
  //     if(err)
  //     console.log(err)
  //   }
  // ).key
 // setLoginId(id)
  
  // setShow1(false);

   firebaseDb.child('loginDetails').orderByChild('userName').equalTo(`${userName}`).get().then((snapshot)=>{
    if(snapshot.exists()){
    
      const result = snapshot.val()
      Object.keys(result).map(id =>{
      console.log('hihi',result[id])
      if((result[id]['password'] === `${password}`) && (result[id]['userName'] === `${userName}`)){
        setLoginId(id);
        setErrMsg(false);
        setShow1(false);
      }else{
        setErrMsg(true);
      }
      })
    }
    else
    setErrMsg(true)
  }).catch((error) => {
    setErrMsg(true);
  })
 
}

const votePerson = () =>{
  //const voteTo = {selectedCharacter,selectedCharacter['contestent']:Selectedcontestent}
  selectedCharacter.contestent = Selectedcontestent
  firebaseDb.child(`loginDetails/${loginId}/votes`).push(
    selectedCharacter,
    err =>{
      if(err)
      console.log(err)
    }
  )
  setVoteDone(!voteDone)
  setContestent('')
  setSearchValue('')
  setShow(false);
} 

  const handleChange = e => {
   // console.log(e);
   e.preventDefault();
    setSearchValue(e.target.value)
    searchCharacter();
};
const selectNomini = (e) =>{
  console.log(e);
  console.log(Allcharacters)
  //setAllCharacters(characters.filter((item) => (item.gender === e.gender)));
  setContestent(e.name);setDropdown(false);
}
  return(

  <Container className="p-3">
    <Jumbotron>

        {/* <ExampleToast/> */}
    <h2  className="header">ಪೌರಾಣಿಕ ಶಿರೋನಾಮ</h2>  
    {
  totalVotes < MAXVOTE ?  <Row style={{textAlign:'center'}}>
  <Col>
  <h5>Voted: {totalVotes}/{MAXVOTE}</h5>
  </Col>
  <Col>
  <h6>{new Date().toLocaleString()}</h6>
  </Col>
  </Row>
  :
  null
  }    
     
      

      <Modal show={show1} animation>
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>User Name</Form.Label>
    <Form.Control type="text" placeholder="Enter user name"  onChange={e=>{setUserName(e.target.value)}}/>
    {/* <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text> */}
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password"  onChange={e=>{setPassword(e.target.value)}}/>
  </Form.Group>
  {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group> */}
  {
errMsg?
    <Alert  variant="danger">
    Incorrect User name or password!!
  </Alert>  
    :
    null
  }
    <br/>
  <Button variant="primary" onClick={handleLogin}>
    Login
  </Button>
</Form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose1}>
            Vote him
          </Button>
        </Modal.Footer> */}
      </Modal>
     
      {/* <h1 className="header">Welcome To Online voting</h1> */}
     
      <Modal show={show} onHide={handleClose} animation>
        <Modal.Header closeButton>
          <Modal.Title>Caution!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are u sure to vote, once voted,can't be changed</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={votePerson}>
            Vote
          </Button>
        </Modal.Footer>
      </Modal>
      

      <Modal show={showThankyou} animation centered>
        <Modal.Header style={{alignSelf: 'center',textAlign:'center'}}>
          <Modal.Title >Your voting session completed</Modal.Title>
        </Modal.Header>
        
        <Modal.Body style={{ alignSelf: 'center'}}>
        
        <Image src={Thankyou} fluid />
        </Modal.Body>
      </Modal>
      <Row>
    <Col> 
    {
      Selectedcontestent?
      <div style={{marginBottom:20,textAlignLast:'center'}}> 
      <h5>Contestent Name: <b>{Selectedcontestent}</b></h5>
    </div>
    :
    null
    }
    {
      totalVotes < MAXVOTE ?
      <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
       Select Contestent
      </Dropdown.Toggle>
    
      <Dropdown.Menu style={{maxHeight:300,overflowY:'scroll'}}>
        {
          contestant.map((d)=>{
            return <Dropdown.Item eventKey={d.name} key={d.id} onSelect={(e)=>{selectNomini(d)}}>{d.name}</Dropdown.Item>
          })
        }
       
      </Dropdown.Menu>
    </Dropdown>
     :
     null
    }
  <br/>
    
   
</Col>

    <Col>
    {
       !dropdown?
       <div>
          <input
          type="text"
          className="form-control"
          id="formGroupExampleInput"
          style={{padding:20,marginBottom:20,flex:1}}
          placeholder="Search..."
          value={SearchValue}
          onChange={handleChange}
          />
          </div>
          :
          null
    }
   
      <div  class='ScrollSmooth' style={{ height: '400px', overflowY: 'scroll'}}>
      
    {
      
       !dropdown?
       Allcharacters.map((character,i)=>{
      return <Card key={i} style={{ width: '18rem',alignSelf:'center',flex:1 ,marginBottom:20,borderColor:`#${Math.floor(Math.random()*100000) + 10000}`, boxShadow: "5px 5px 5px 5px #9E9E9E"}}>
  
  <Card.Img variant="top" src={character.name} />
  <Card.Body style={{alignSelf:'center'}}>
    {/* <Card.Title>Card Title</Card.Title> */}
    {/* <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text> */}
  {/* </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroupItem>Cras justo odio</ListGroupItem>
    <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
    <ListGroupItem>Vestibulum at eros</ListGroupItem>
  </ListGroup>
  <Card.Body> */}
  {/* <div style={{justifyContent:'center',flex:1,alignItems:'center'}}> */}
  <Button variant="outline-primary" onClick={()=>{setSelectedCharacter(character); handleShow()}} style={{boxShadow: "5px 5px 5px #0000FF"}}>Vote</Button>
  {/* </div> */}

    {/* <Card.Link href="#">Another Link</Card.Link> */}
  </Card.Body>
</Card>
    })
:
null
  }
  </div>
    </Col>
  </Row>
     


      {/* <ExampleToast>
        We now have Toasts
        <span role="img" aria-label="tada">
          🎉
        </span>
      </ExampleToast> */}
    </Jumbotron>
  </Container>
  )
    };

export default App;
