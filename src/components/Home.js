import IndexAdventures from "./adventures/IndexAdventures"

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)
	const {user, msgAlert} = props

	return (
		<>
			<h2>Home Page</h2>
			<IndexAdventures user={user} msgAlert={msgAlert}/>
		</>
	)
}

export default Home
