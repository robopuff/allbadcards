import * as React from "react";
import {MdArrowForward} from "react-icons/all";
import Button from "@material-ui/core/Button";
import {RouteComponentProps, withRouter} from "react-router";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {UserData, UserDataStore} from "../../Global/DataStore/UserDataStore";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {SponsorList} from "./SponsorList";
import {Divider, Grid} from "@material-ui/core";
import {TwitterTimelineEmbed} from "react-twitter-embed";
import {EnvDataStore} from "../../Global/DataStore/EnvDataStore";
import {JoinNewButtons} from "../../UI/JoinNewButtons";

interface IGameDashboardProps extends RouteComponentProps
{
}

interface DefaultProps
{
}

type Props = IGameDashboardProps & DefaultProps;
type State = ICreationState;

interface ICreationState
{
	userData: UserData;
	nicknameDialogOpen: boolean;
	createLoading: boolean;
}

export const gamesOwnedLsKey = "games-owned";

class GameDashboard extends React.Component<Props, State>
{
	constructor(props: Props)
	{
		super(props);

		this.state = {
			userData: UserDataStore.state,
			nicknameDialogOpen: false,
			createLoading: false
		};
	}

	public componentDidMount(): void
	{
		UserDataStore.listen(data => this.setState({
			userData: data
		}));
	}

	public render()
	{
		const mobile = matchMedia('(max-width:768px)').matches;

		const familyMode = EnvDataStore.state.site.family;

		return (
			<Container style={{textAlign: "center"}}>
				<Typography component={"h1"} variant={mobile ? "h5" : "h3"}>be rude. be irreverent. be hilarious!</Typography>

				{familyMode && (
					<Typography variant={"h4"} style={{marginTop: "1rem"}}>Family-friendly edition!</Typography>
				)}

				<img style={{width: "50%", margin: "2rem auto", maxWidth: "13rem"}} src={"/logo-large.png"}/>

				<ButtonGroup style={{width: "100%", justifyContent: "center", marginTop: "2rem"}}>
					<JoinNewButtons/>
				</ButtonGroup>
				{!familyMode && (
					<ButtonGroup style={{width: "100%", justifyContent: "center", marginTop: "2rem"}}>
						<Button href={"https://not.allbad.cards"}>
							Family-Friendly Version &nbsp; <MdArrowForward/>
						</Button>
					</ButtonGroup>
				)}
				<div>
					<SponsorList/>
				</div>

				<Paper style={{padding: "1rem", margin: "3rem 0 1rem", textAlign: "left"}}>
					<Grid container>
						<Grid item md={7} xs={12}>
							<Typography>
								<strong>Updates - 5/29</strong>
								<li>Added automatic "rounds to win" behavior that scales based on the number of players playing (overrideable)</li>
								<li>Bug fixes and performance improvements</li>
								<br/>
								<strong>Updates - 5/27</strong>
								<li>Fix for idle behavior causing issues for normal games starting</li>
								<li>Idle timer only kicks players automatically in public games</li>
								<li>Idle timer marks players as idle in private games</li>
								<br/>
							</Typography>
						</Grid>
						<Grid item md={1} xs={12} style={{display: "flex", justifyContent: "center", margin: "2rem 0"}}>
							<Divider orientation={"vertical"}/>
						</Grid>
						<Grid item md={4} xs={12}>
							<TwitterTimelineEmbed
								sourceType="profile"
								screenName="allbadcards"
								options={{
									height: 400
								}}
							/>
						</Grid>
					</Grid>
				</Paper>
				{EnvDataStore.state.site.family && (
					<Paper style={{padding: "1rem", marginTop: "3rem"}}>
						<Typography variant={"caption"}>
							Cards Against Humanity by <a href={"https://cardsagainsthumanity.com"}>Cards Against Humanity</a> LLC is licensed under CC BY-NC-SA 2.0.
						</Typography>
					</Paper>
				)}
			</Container>
		);
	}
}

export default withRouter(GameDashboard);