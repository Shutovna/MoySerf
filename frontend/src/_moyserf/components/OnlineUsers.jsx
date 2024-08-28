import {useWebSocket} from "./WebSocketProvider.jsx";

const WebSocketComponent = () => {
    const {usersOnline} = useWebSocket();
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
