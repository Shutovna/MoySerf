import {createContext, useContext, useEffect, useState} from "react";
import SockJS from "sockjs-client";
import {Client} from "@stomp/stompjs";
import {useAuth} from "../auth/AuthProvider.jsx";

const UsersOnlineContext = createContext(null);

const UsersOnlineProvider = ({children}) => {
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
                        //body: user.id
                    });
            },
            onStompError: function (frame) {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
        });

        client.activate();



        window.addEventListener('beforeunload', function (event) {
            // Вызов функции для отправки baecon
            client.publish({
                destination: '/app/userDisconnected',
                //body: user.id
            });
        });

        return () => {
            client.publish({
                destination: '/app/userDisconnected',
                //body: user.id
            });
            client.deactivate();
        };
    }, []);

    return (
        <UsersOnlineContext.Provider
            value={{usersOnline}}>
            {children}
        </UsersOnlineContext.Provider>
    );

};
export default UsersOnlineProvider;

export const useUsersOnline = () => {
    return useContext(UsersOnlineContext);
};