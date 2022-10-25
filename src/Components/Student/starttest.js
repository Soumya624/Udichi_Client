import React, { useEffect, useRef, useState } from "react";
import Navbar from "./../../Common/Navbar_Student";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Footer from "../../Common/Footer";
import { useScreenshot } from "use-screenshot-hook";
import { useReactMediaRecorder } from "react-media-recorder";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function Confirmpresence() {
	const { id } = useParams();
	const [alloted_test, setAllotedTest] = useState(null);
	const [is_attempted, setIsAttempted] = useState(false);
	const [previous_submission, setPreviousSubmission] = useState(null);
	const [number_of_attempts, setNumberOfAttempts] = useState(0);

	useEffect(() => {
		axios
			.get(`http://localhost:5000/test/${id}`)
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					let data = res.data;
					let question_groups = data.question_groups;
					let questions = [];
					for (let ques of question_groups) {
						console.log(ques.questions);
						questions = questions.concat(ques.questions);
					}
					localStorage.setItem("questions", JSON.stringify(questions));
					localStorage.setItem("test_id", JSON.stringify(id));
					setAllotedTest(res.data);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [id]);

	useEffect(() => {
		let user = JSON.parse(localStorage.getItem("user_id"));
		axios
			.get(`http://localhost:5000/attempts/group/${user}/${id}`)
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					setNumberOfAttempts(res.data.attempts_submitted.length);
					setIsAttempted(true);
					setPreviousSubmission(res.data);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		let user = JSON.parse(localStorage.getItem("user_id"));
		let attempt_id = JSON.parse(localStorage.getItem("attempt_id"));
		if (attempt_id) {
			axios
				.get(`http://localhost:5000/attempts/attempt/${attempt_id}/${user}`)
				.then((res) => {
					console.log("kjbjb");
					console.log(res);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

	const { isLoading, image, takeScreenshot, clear } = useScreenshot();
	const { status, startRecording, stopRecording, mediaBlobUrl } =
		useReactMediaRecorder({ screen: true });
	const ref = useRef(null);

	const getImage = () => {
		clear();
		takeScreenshot("jpg", {
			backgroundColor: "white",
		});
	};

	const downloadImage = () => {
		let a = document.createElement("a");
		a.href = image;
		a.download = "Screenshot.png";
		a.click();
	};

	const startExam = async () => {
		let data = {
			test: id,
			candidate: JSON.parse(localStorage.getItem("user_id")),
			number_of_attempts_left: alloted_test.number_of_attempts,
		};

		// console.log(previous_submission._id)

		// check whether there is any
		if (is_attempted) {
			await axios
				.patch(`/attempts/groups/${previous_submission._id}`, data)
				.then((res) => {
					console.log(res);
					if (res.status === 201) {
						localStorage.setItem(
							"attempted_group_id",
							JSON.stringify(res.data._id),
						);
						// window.location = "/testStudent/1"
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			await axios
				.post("/attempts/create-group", data)
				.then((res) => {
					console.log(res);
					if (res.status === 200) {
						localStorage.setItem(
							"attempted_group_id",
							JSON.stringify(res.data._id),
						);
						// window.location = "/testStudent/1"
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
		let submitted_question = JSON.parse(
			localStorage.getItem("submitted_questions_id"),
		);
		let test = JSON.parse(localStorage.getItem("test_id"));
		let user = JSON.parse(localStorage.getItem("user_id"));
		let attempt_id = JSON.parse(localStorage.getItem("attempt_id"));

		let d = {
			test: test,
			candidate: user,
			questions_submitted: submitted_question,
		};

		if (attempt_id === null) {
			await axios
				.post("http://localhost:5000/attempts", d)
				.then((res) => {
					if (res.status === 200) {
						console.log(res.data);
						window.location = "/testStudent/1";
						localStorage.setItem("attempt_id", JSON.stringify(res.data._id));
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}else{
			console.log("sdfkjsk")
			window.location = "/testStudent/1";
		}
	};

	if (alloted_test === null) {
		return <h1>Loading...</h1>;
	}

	let left_attempts = alloted_test.number_of_attempts - number_of_attempts;

	return (
		<div>
			<Navbar />
			<div style={{ padding: "2%" }}>
				<center>
					<Card
						sx={{ maxWidth: 500 }}
						style={{
							alignItems: "center",
							justifyContent: "center",
							marginTop: "5rem",
							padding: "2%",
						}}
					>
						<CardContent>
							<Typography
								gutterBottom
								variant="h5"
								component="div"
								style={{ marginBottom: "0", fontWeight: "bold" }}
							>
								{alloted_test.title}
							</Typography>
							<br />
							<p style={{ marginTop: "0", textAlign: "justify" }}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation ullamco laboris
								nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
								in reprehenderit in voluptate velit esse cillum dolore eu fugiat
								nulla pariatur
							</p>
							<h4>Number of Attempts: {left_attempts}</h4>
							<br />
							<br />
							<br />
							<Typography variant="body2" color="text.secondary">
								{isLoading ? (
									<div>Loading...</div>
								) : (
									<div>
										{/* {isError && <p>Error</p>} */}
										<div ref={ref} />
										{image && (
											<img
												style={{ width: "30em" }}
												src={image}
												alt={"Screenshot"}
											/>
										)}
										<Button
											variant="contained"
											style={{
												backgroundColor:
													left_attempts <= 0 ? "#aaaaaa" : "#7882BD",
												margin: "1em",
											}}
											// onClick={getImage}
											// onClick={startRecording}
											// href='/testStudent/1'
											onClick={startExam}
											disabled={left_attempts <= 0}
										>
											Start Exam
										</Button>
										{/* <Button
											variant="contained"
											style={{ backgroundColor: "#7882BD", margin: "1em" }}
											onClick={() => {
												image && downloadImage();
											}}
										>
											Download Image
										</Button> */}
									</div>
								)}
								<br />
								<div>
									{/* <p>{status}</p> */}
									{/* <button onClick={startRecording}>Start Recording</button> */}
									{/* <button onClick={stopRecording}>Stop Recording</button>
									<video style={{width : "30em"}} src={mediaBlobUrl} controls autoPlay loop /> */}
								</div>
							</Typography>
						</CardContent>
						{/* <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions> */}
					</Card>
				</center>
				<br />
				<br />
				<br />
				<br />
				<br />
			</div>
			<Footer />
		</div>
	);
}
