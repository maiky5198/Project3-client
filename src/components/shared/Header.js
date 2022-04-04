import { toBePartiallyChecked } from '@testing-library/jest-dom/dist/matchers'
import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'

const linkStyle = {
    color: 'white',
    textDecoration: 'none',
	// backgroundColor: 'black',
	
}
const authenticatedOptions = (
	<>
		<Link to='/adventures' style={linkStyle}>
				All Adventures
			</Link>
		<Nav.Item>
		    <Link to='addAdventure' style={linkStyle}>Add Adventure</Link>
        </Nav.Item>
		<Nav.Item>
		    <Link to='/adventures/mine' style={linkStyle}>My Adventures</Link>
        </Nav.Item>
		<Nav.Item>
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Item>
		<Nav.Item>
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Item>
	</>
)

const unauthenticatedOptions = (
	<>
        <Nav.Item>
		    <Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Item>
        <Nav.Item>
		    <Link to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Item>
	</>
)

const alwaysOptions = (
	<>
		<Nav.Link>
			
		</Nav.Link>
	</>
)

const Header = ({ user }) => (
	<Navbar id='custom-nav' bg='dark' variant='dark' expand='md'>
		<Navbar.Brand>
            <Link to='/' style={linkStyle}>
                AdventureR
            </Link>
        </Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ml-auto'>
				{user && (
					<span className='navbar-text mr-2'>Welcome, {user.email}</span>
				)}
				{alwaysOptions}
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
