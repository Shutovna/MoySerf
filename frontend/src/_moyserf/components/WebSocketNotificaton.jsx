import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {Card} from "react-bootstrap";
import face9 from "../../assets/images/faces/9.jpg";
import useEventNotificationService from "../services/EventService.jsx";

const WebSocketNotification = () => {
    const [notification, setNotification] = useState();

    const {getFirstEventNotification} = useEventNotificationService();

    useEffect(() => {
        // Настройка WebSocket клиента
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            debug: (str) => console.log(str),
            onConnect: () => {
                console.log('Connected to WebSocket');
                stompClient.subscribe('/topic/notifications', (result) => {
                    setNotification(result.body);
                    console.log(result.body)
                });
            },
            onStompError: (frame) => {
                console.error('Broker error: ' + frame.headers['message']);
            }
        });

        stompClient.activate();

        getFirstEventNotification()
            .then((event) => {
                setNotification(event);
            })
            .catch(reason => {
                console.log(reason);
            })

        return () => {
            stompClient.deactivate();
        };
    }, []);

    return (
        <Card className="custom-card">
            <Card.Body>
                <div className="d-flex align-items-top justify-content-between mb-4">
                    <div>
                        <span className="d-block fs-15 fw-semibold">Текущие события</span>
                    </div>
                </div>
                <div className="text-center mb-4">
                    <div className="mb-3">
                        <span className="avatar avatar-xxl avatar-rounded circle-progress p-1">
                            <img src={face9} alt=""/>
                        </span>
                    </div>
                    <div>
                        <h5 className="fw-semibold mb-0">{notification && notification.userInfo && notification.userInfo.name}</h5>
                        <span className="fs-13 text-muted">{notification && notification.message}</span>
                    </div>
                </div>

            </Card.Body>
        </Card>
    );
};

export default WebSocketNotification;