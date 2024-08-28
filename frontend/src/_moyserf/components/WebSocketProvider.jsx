import {createContext, useContext, useEffect, useState} from "react";
import SockJS from "sockjs-client";
import {Client} from "@stomp/stompjs";
import {useAuth} from "../auth/AuthProvider.jsx";

const WebSocketContext = createContext(null);

const WebSocketProvider = ({children}) => {
    const [usersOnline, setUsersOnline] = useState(0);
    const {user} = useAuth();

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
            client.publish({
                destination: '/app/userDisconnected',
                body: user.id
            });

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
        <WebSocketContext.Provider
            value={{usersOnline}}>
            {children}
        </WebSocketContext.Provider>
    );

};
export default WebSocketProvider;

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};