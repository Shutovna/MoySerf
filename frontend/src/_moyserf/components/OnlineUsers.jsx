import {useEffect, useState} from 'react';
import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {useAuth} from "../auth/AuthProvider.jsx";
import {useHttp} from "../hooks/http.hooks.jsx";

const WebSocketComponent = () => {
    const [usersOnline, setUsersOnline] = useState(0);
    const {user} = useAuth();
    let http = useHttp();

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                client.subscribe('/topic/usersOnline', (message) => {
                    setUsersOnline(parseInt(message.body));
                });

                client.publish(
                    {
                        destination: '/app/userConnected',
                        body: user.id
                    });
            },
            onStompError: function (frame) {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
        });

        client.activate();

        function sendBeacon() {
            const blob = new Blob([JSON.stringify(user.id)], { type: 'application/json' });

            // Отправляем данные при закрытии вкладки
            navigator.sendBeacon('/userDisconnect');

        }

        window.addEventListener('beforeunload', function (event) {
            // Вызов функции для отправки baecon
            sendBeacon();
        });

        return () => {
            client.publish({
                destination: '/app/userDisconnected',
                body: user.id
            });
            client.deactivate();
        };
    }, []);



    return (
        <div className="p-3 text-center rounded-2 bg-white border">
                                            <span
                                                className="mb-3 avatar avatar-lg avatar-rounded bg-primary-transparent">
                                                <i className="fs-24 bx bx-user-circle"></i>
                                            </span>
            <h3 className="fw-semibold mb-0 text-dark">{usersOnline}</h3>
            <p className="mb-1 fs-14 op-7 text-muted ">Всего онлайн</p>
        </div>
    );
};

export default WebSocketComponent;
