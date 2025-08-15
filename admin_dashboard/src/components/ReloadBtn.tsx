import type React from "react";
import "/src/style/ReloadBtn.css";

const ReloadBtn: React.FC<{ handleRefresh: () => void; output: string }> = ({ handleRefresh, output }) => {
    return (
        <div className="dashboard-header">
            <h1 className="dashboard-title">{output}</h1>
            <img src="/src/assets/reload.png" className="reload" onClick={handleRefresh} />
        </div>
    );
}
export default ReloadBtn;