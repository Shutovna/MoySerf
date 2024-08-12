import {Card, Dropdown} from "react-bootstrap";
import useUserService from "../services/UserService.jsx";
import {useEffect, useState} from "react";

const MostActiveUsers = () => {
    const {findMostActiveUsers} = useUserService();
    const [users, setUsers] = useState([])

    useEffect(() => {
        findMostActiveUsers().then((mostActiveUsers) => {
            console.log(mostActiveUsers);
            setUsers(mostActiveUsers);
        })
            .catch((error) => {
                console.log(error)
            })
    }, []);

    return <Card className="custom-card">
        <Card.Header className="  justify-content-between">
            <Card.Title>
                Топ 5 активных пользователей
            </Card.Title>
        </Card.Header>
        <Card.Body>
            <ul className="list-unstyled crm-top-deals mb-0">
                {
                    users.map((user) => {
                        return <li>
                            <div className="d-flex align-items-top flex-wrap">
                                <div className="me-2">
                                    <span
                                        className="avatar avatar-sm avatar-rounded bg-warning-transparent fw-semibold">
                                        АВ
                                    </span>
                                </div>
                                <div className="flex-fill">
                                    <p className="fw-semibold mb-0">{user.name}</p>
                                    <span
                                        className="text-muted fs-12">{user.email}</span>
                                </div>
                                <div className="fw-semibold fs-15">{user.earned}</div>
                            </div>
                        </li>
                    })
                }

            </ul>
        </Card.Body>
    </Card>
}

export default MostActiveUsers;