const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)
	const {user, msgAlert} = props

	return (
		<div style={{  
  			backgroundImage: "url(" + "https://www.torontoathleticclub.com/Portals/AdelaideClub/EasyDNNnews/491/img-february-22-mountains-cover.jpg" + ")",
  			backgroundPosition: 'center',
  			backgroundSize: 'cover',
  			backgroundRepeat: 'no-repeat',
			height: '750px'
			}}>
			<h1 style={{
				textAlign: 'center',
				fontFamily: 'fantasy',
				fontWeight: 'bold'
			}}
			>Welcome to the adventureR!</h1>
			<h3 style={{
				textAlign: 'center',
				fontFamily: 'fantasy'
			}}
			>Sign Up or Sign In to log your next adventure with us!</h3>
		</div>
	)
}

export default Home
