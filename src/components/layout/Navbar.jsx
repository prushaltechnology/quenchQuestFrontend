import { Layout, Menu, Button, Drawer, Grid } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import AuthModal from "../../auth/AuthModal";
import { getUser, logout } from "../../utils/auth";


const { Header } = Layout;
const { useBreakpoint } = Grid;

const menuItems = [
  { key: "/", label: <Link to="/">Home</Link> },
  { key: "/about", label: <Link to="/about">About</Link> },
  { key: "/programs", label: <Link to="/programs">Programs</Link> },
  { key: "/projects", label: <Link to="/projects">Projects & Impact</Link> },
  { key: "/get-involved", label: <Link to="/get-involved">Get Involved</Link> },
  { key: "/contact", label: <Link to="/contact">Contact</Link> },
];


const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  // ✅ USER STATE INSIDE COMPONENT
 const [user, setUser] = useState(() => getUser());

  // ✅ LOGOUT
  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1100,
          padding: 0,
          height: 70,
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            height: "100%",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Link to="/" onClick={(e) => {
            e.preventDefault();
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}>
            <img src={logo} alt="NGO Logo" style={{ height: 42 }} />
          </Link>

          {/* Desktop Menu */}
          {!isMobile && (
            <Menu
              mode="horizontal"
              selectedKeys={[location.pathname]}
              items={menuItems}
              style={{
                flex: 1,
                justifyContent: "center",
                borderBottom: "none",
              }}
            />
          )}

          {/* ✅ LOGIN / PROFILE / LOGOUT (THIS IS THE CORRECT PLACE) */}
          {!isMobile && (
  !user ? (
    <Button type="primary" onClick={() => setAuthOpen(true)}>
      Login
    </Button>
  ) : (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      
      <Button onClick={() => navigate("/profile")}>
        {user?.name || "Profile"}
      </Button>

      <Button danger onClick={handleLogout}>
        Logout
      </Button>

    </div>
  )
)}

          {/* Mobile Menu */}
          {isMobile && (
            <Button
              type="text"
              icon={
                open ? (
                  <CloseOutlined style={{ fontSize: 22 }} />
                ) : (
                  <MenuOutlined style={{ fontSize: 22 }} />
                )
              }
              onClick={() => setOpen(!open)}
              style={{ marginLeft: "auto" }}
            />
          )}
        </div>
      </Header>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Menu
          mode="vertical"
          items={menuItems}
          onClick={() => setOpen(false)}
        />

        {/* ✅ SAME LOGIC FOR MOBILE */}
        {!user ? (
          <Button
            type="primary"
            block
            style={{ marginTop: 20 }}
            onClick={() => setAuthOpen(true)}
          >
            Login
          </Button>
        ) : (
          <>
            <Button
              block
              onClick={() => navigate("/profile")}
            >
              {user?.name || "Profile"}
            </Button>

            <Button
              danger
              block
              style={{ marginTop: 10 }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        )}
      </Drawer>

      {/* Auth Modal */}
      <AuthModal
  open={authOpen}
  onClose={() => setAuthOpen(false)}
  setUser={setUser}
/>
    </>
  );
};

export default Navbar;