
import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'

const linkStyle = {
    color: '#F2DB94',
    textDecoration: 'none',
	// backgroundColor: 'black',
	
}
const authenticatedOptions = (
	<>

		<Navbar.Brand>
			<Link to='/adventures' className= 'm-2' style={linkStyle}>
				AdventureR
			</Link>
        </Navbar.Brand>	
		<Nav.Item className="m-2">
			<Link  to='/adventures' style={linkStyle}>All Adventures</Link>
		</Nav.Item>
		<Nav.Item className="m-2">
		    <Link to='addAdventure' style={linkStyle}>Add Adventure</Link>
        </Nav.Item>
		<Nav.Item className="m-2">
		    <Link to='/adventures/mine' style={linkStyle}>My Adventures</Link>
        </Nav.Item>
		<Nav.Item className="m-2">
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Item>
		<Nav.Item className="m-2">
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Item>
	</>
)

const unauthenticatedOptions = (
	<>
		<Navbar.Brand>
			<Link to='/sign-in' className= 'm-2' style={linkStyle}>
				AdventureR
			</Link>
        </Navbar.Brand>
        <Nav.Item className="m-2">
		    <Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Item>
        <Nav.Item className="m-2">
		    <Link to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Item>
	</>
)


// const homeName = () => {
// 	if (use){

// 	}
// }

const Header = ({ user }) => (
	<Navbar sticky='top' className='custom-nav' bg='myBlue' variant='light' expand='md'>
		{/* <Navbar.Brand>
				<Link to='/sign-in' className= 'm-2' style={linkStyle}>
					AdventureR
				</Link>
        </Navbar.Brand> */}
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ml-auto'>
				{user ? authenticatedOptions : unauthenticatedOptions}
				{user && (
					<span className='m-2'  style={{color: 'white', margin: 'auto'}}>Welcome, {user.email}</span>
					
					)}
				{/* {alwaysOptions} */}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
