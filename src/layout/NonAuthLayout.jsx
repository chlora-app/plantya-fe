import React from "react";

const NonAuthLayout = ({ children }) => {
    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center", // horizontal center
                alignItems: "center",      // vertical center
                backgroundColor: "#2c2f33",
            }}
        >
            <div
                style={{
                    height: "60%",
                    width: "30%",
                    // backgroundColor: "#222222",
                    borderRadius: "12px",
                    padding: "40px",
                    // boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default NonAuthLayout;
