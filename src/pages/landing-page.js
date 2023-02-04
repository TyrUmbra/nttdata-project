import { useEffect, useState } from "react"
import { GetUsers } from "../services/auth-services";
import styled from "@emotion/styled";
import { CSVLink, CSVDownload } from "react-csv";

const Table = styled("div")`
    display: grid;
    grid-template: repeat(16, 1fr)/repeat(6, 1fr) 60px;
    align-items: center;
    gap: 5px;
`;
const Header = styled("p")`
    background: #20262E;
    color: white;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Data = styled("p")`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
`;

const DownloadButton = styled(`button`)`
    background: #6096B4;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    margin-top: 5px;    
`;

export default function LandingPage() {
    const [users, setUsers] = useState();
    useEffect(() => {
        GetUsers().then(setUsers).catch(console.log)
    }, [])
    const usersSort = users?.sort((a, b) => {
        if (a.dob.age > b.dob.age) {
            return -1
        } else if ( a.dob.age < b.dob.age ) {
            return 1 
        } else {
            return 0
        }
    })
    const header = ["Nombre", "Apellido", "Edad", "Genero", "Email", "Nacionalidad", "Foto"]
    let even = null
    return (
        <>
        <Table>
            {header?.map(function(headerTitle) {
                return (
                    <Header>{headerTitle}</Header>
                )
            })}
            {usersSort?.map(function(person, index) {
                if (index % 2 === 0) {even = true} else if (index % 2 === 1 ) {even = false}
                return (
                    <>
                        <Data style={{background: (even)? "#6096B4" : "#BDCDD6"}}>{person?.name.first}</Data>
                        <Data style={{background: (even)? "#6096B4" : "#BDCDD6"}}>{person?.name.last}</Data>
                        <Data style={{background: (even)? "#6096B4" : "#BDCDD6"}}>{person?.dob.age}</Data>
                        <Data style={{background: (even)? "#6096B4" : "#BDCDD6"}}>{person?.gender}</Data>
                        <Data style={{background: (even)? "#6096B4" : "#BDCDD6"}}>{person?.email}</Data>
                        <Data style={{background: (even)? "#6096B4" : "#BDCDD6"}}>{person?.nat}</Data>
                        <div style={{width: "100%", height: "100%", background: (even)? "#6096B4" : "#BDCDD6", display: "flex", justifyContent: "center", alignItems: "center",}}>
                            <img src={person?.picture.thumbnail} style={{borderRadius: "50%"}}></img>
                        </div>
                    </>
                )
            })}
        </Table>
            {(users)? 
                <div style={{ display: "flex", justifyContent: "end", marginRight: "5px"}}>
                    <DownloadButton><CSVLink data={users} filename={"users.csv"} style={{color: "white", textDecoration: "none"}}>Download Users List</CSVLink></DownloadButton>
                    <CSVDownload data={users} target="_blank" /> 
                </div>
            : ""}
        </>
    )
}