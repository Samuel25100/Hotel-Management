import "./style/TopBar.css";

function TopBar() {
    return (
        <div className="top-bar">
            <div className="left_menu">
                <div className="info_icons">
                    <img src="/src/assets/notification.png" alt="Notifications" />
                    <span className="badge" hidden>3</span>
                </div>
                <div className="info_icons">
                    <img className="email" src="/src/assets/email.png" alt="Email" />
                    <span className="badge" hidden>3</span>
                </div>
                <div className="user-info">
                    <div className="user_profile">
                       <img src="/src/assets/user.png" alt="User Avatar" />
                    </div>
                    <div className="user-details">
                        <p>Admin Name</p>
                        <p>Role</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TopBar;