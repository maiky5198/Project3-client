import IndexAdventures from "./adventures/IndexAdventures"

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)
	const {user, msgAlert} = props

	return (
		<>
			<h2>Welcome to the adventureR!</h2>
		</>
	)
}

export default Home
