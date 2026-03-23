import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      
      <Sidebar />

      <div
        style={{
          marginLeft: "240px",
          padding: "30px",
          width: "100%",
          background: "#f4f6f9",
          minHeight: "100vh"
        }}
      >
        {children}
      </div>

    </div>
  );
}

export default Layout;