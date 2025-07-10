import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { navbar } from "../data/navbar";

const HeaderBar = () => {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
        height: 64,
        display: "flex",
        alignItems: "center",
        padding: "0 2rem",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(4px)",
      }}
    >
      {/* Logo */}
      <Link
        to={`/#${"home"}`}
        className="logo"
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          color: "white",
          textDecoration: "none",
          marginRight: "auto",
        }}
      >
        Seccad <span style={{ color: "var(--primary-color)" }}>YEŞİLKAYA</span>
      </Link>

      <Menu
        theme="dark"
        mode="horizontal"
        style={{
          flex: 1,
          justifyContent: "flex-end",
          display: "flex",
          flexWrap: "wrap",
          backgroundColor: "transparent",
        }}
        items={navbar.map((section) => ({
          key: section.key,
          label:
            section.type === "route" ? (
              <Link
                to={section.route}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                {section.label}
              </Link>
            ) : (
              <Link
                to={`/#${section.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                {section.label}
              </Link>
            ),
        }))}
      />
    </header>
  );
};

export default HeaderBar;
