import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from "./../../Common/Navbar_Admin";
import Footer from "../../Common/Footer";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Collapsible from "react-collapsible";
import "./style.css";
import axiosInstance from "../../axiosInstance";
import getCookie from "../../getCookie";

function createData(name, candidates, group, username, action) {
	return { name, candidates, group, username, action };
}

const rows = [
	createData(
		"A Bose",
		159,
		"JBL Tailoring@04.08.2022",
		"user@001",
		"View Details",
	),
	createData(
		"Sudip Nayak",
		237,
		"JBL Tailoring@04.08.2022",
		"user@002",
		"View Details",
	),
	createData(
		"B M Kumar",
		262,
		"JBL Tailoring@04.08.2022",
		"user@003",
		"View Details",
	),
	createData(
		"P Chetri",
		305,
		"JBL Tailoring@04.08.2022",
		"user@004",
		"View Details",
	),
	createData(
		"P K Das",
		356,
		"JBL Tailoring@04.08.2022",
		"user@005",
		"View Details",
	),
];

export default function BasicTable() {
	let token = getCookie("access_token");
	let user = JSON.parse(localStorage.getItem("user"));

	const config = {
		headers: { Authorization: `Bearer ${token}`, "user-type": user.usertype },
	};

	const [open, setOpen] = useState(true);
	const [candigroup, setCandigroup] = useState([]);

	const handleClick = () => {
		setOpen(!open);
	};

	useEffect(() => {
		getCandidates();
	}, []);

	function getCandidates({ error, setError }) {
		axiosInstance
			.get("/candidate_group/all/", config)
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					setCandigroup(res.data);
				}
			})
			.catch((err) => {
				console.log(err);
				setError("Error occurred! Please Try Again.....");
				setTimeout(() => {
					setError(null);
				}, 1000);
			});
	}

	return (
		<div>
			<Navbar />
			<div style={{ margin: "5%" }}>
				<br />
				<br />
				<br />
				<h4 style={{ textAlign: "left", fontSize: "28px", lineHeight: "1px" }}>
					Total Candidates
				</h4>
				<p style={{ lineHeight: "1px" }}>
					Want to Add a{" "}
					<a href="/addcandidateAdmin" style={{ textDecoration: "none" }}>
						New Candidate?
					</a>
					&nbsp;Or <input type="file" />
				</p>
				<br />
				<br />
				{candigroup.map((key) => {
					return (
						// <List
						//   sx={{ width: "100%", bgcolor: "background.paper" }}
						//   component="nav"
						//   aria-labelledby="nested-list-subheader"
						// >
						//   <ListItemButton onClick={handleClick}>
						//     <ListItemIcon>
						//       <InboxIcon />
						//     </ListItemIcon>
						//     <ListItemText primary={key.title} />
						//     {open ? <ExpandLess /> : <ExpandMore />}
						//   </ListItemButton>
						//   <Collapse in={open} timeout="auto" unmountOnExit>
						//     <TableContainer component={Paper}>
						//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
						//         <TableHead>
						//           <TableRow>
						//             <TableCell>
						//               <b>Candidate Name</b>
						//             </TableCell>
						//             <TableCell align="right">
						//               <b>ID of Candidates</b>
						//             </TableCell>

						//             <TableCell align="right">
						//               <b>Username</b>
						//             </TableCell>
						//             <TableCell align="right">
						//               <b>Action</b>
						//             </TableCell>
						//           </TableRow>
						//         </TableHead>
						//         <TableBody>
						//           {rows.map((row) => (
						//             <TableRow
						//               key={row.name}
						//               sx={{
						//                 "&:last-child td, &:last-child th": { border: 0 },
						//               }}
						//             >
						//               <TableCell component="th" scope="row">
						//                 {row.name}
						//               </TableCell>
						//               <TableCell align="right">{row.candidates}</TableCell>

						//               <TableCell align="right">{row.username}</TableCell>
						//               <TableCell
						//                 align="right"
						//                 style={{ cursor: "pointer" }}
						//               >
						//                 {row.action}
						//               </TableCell>
						//             </TableRow>
						//           ))}
						//         </TableBody>
						//       </Table>
						//     </TableContainer>
						//   </Collapse>
						// </List>
						<Collapsible trigger={key.title} style={{ padding: "2px" }}>
							<TableContainer component={Paper}>
								<Table sx={{ minWidth: 650 }} aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell>
												<b>Candidate Name</b>
											</TableCell>
											<TableCell align="right">
												<b>ID of Candidates</b>
											</TableCell>

											<TableCell align="right">
												<b>Username</b>
											</TableCell>
											<TableCell align="right">
												<b>Action</b>
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{key.candidates.map((x) => (
											<TableRow
												key={x._id}
												sx={{
													"&:last-child td, &:last-child th": { border: 0 },
												}}
											>
												<TableCell component="th" scope="row">
													{x.firstname + x.lastname}
												</TableCell>
												<TableCell align="right">{x._id}</TableCell>

												<TableCell align="right">{x.username}</TableCell>
												<TableCell
													align="right"
													style={{ cursor: "pointer", color: "red" }}
												>
													Delete
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Collapsible>
					);
				})}

				<br />
				<br />
			</div>
			<Footer />
		</div>
	);
}
