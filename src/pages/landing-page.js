import { useEffect, useState } from "react"
import { GetUsers } from "../services/auth-services";
import styled from "@emotion/styled";
import { CSVLink, CSVDownload } from "react-csv";


const Body = styled("div")`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(45deg, #49a09d, #5f2c82);
`;

const Table = styled("div")`
    display: grid;
    grid-template: repeat(16, 55px)/140px 140px 100px 100px 300px 150px 60px;
    align-items: center;
    border-collapse: collapse;
    box-shadow: 0 0 20px rgba(0,0,0,0.1);
    color: #fff;
    background-color: rgba(255,255,255,0.2);
    margin-top: 15px;
`;
const Header = styled("p")`
    background: #55608f;
    color: white;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
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
    color: #fff;
    background-color: rgba(255,255,255,0.2);
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
    console.log(usersSort)
    const CSVUsersData = usersSort?.map(function(person) {
        return ({
            Nombre: person?.name.first,
            Apellido: person?.name.last,
            Edad: person?.dob.age,
            Genero: person?.gender,
            Email: person?.email,
            Nacionalidad: person?.nat,
            Foto: person?.picture.thumbnail
        })
    })
    return (
        <Body style={{width: "100vw", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
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
                            <Data>{person?.name.first}</Data>
                            <Data>{person?.name.last}</Data>
                            <Data>{person?.dob.age}</Data>
                            <Data>{person?.gender}</Data>
                            <Data>{person?.email}</Data>
                            <Data>{person?.nat}</Data>
                            <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center",}}>
                                <img src={person?.picture.thumbnail} style={{borderRadius: "50%"}} alt="perfil"></img>
                            </div>
                        </>
                    )
                })}
            </Table>
                {(users)? 
                    <div style={{ 
                        display: "flex", 
                        justifyContent: "end", 
                        marginRight: "5px",
                        }}>
                        <DownloadButton><CSVLink data={CSVUsersData} filename={"usersData.csv"} style={{color: "white", textDecoration: "none"}}>Download Users List</CSVLink></DownloadButton>
                        <CSVDownload data={CSVUsersData} target="_blank" /> 
                    </div>
                : ""}
        </Body>
    )
}