import { Layout, Menu } from "antd";
import "antd/dist/reset.css";
import { useEffect, useState, useRef } from "react";
import "./index.css";
import Footer from "./components/footer/Footer.jsx";
import Home from "./components/HomePage.jsx"; // doğru yoldan emin ol

const { Header, Content } = Layout;

const navbar = [
  {
    key: "1",
    id: "home",
    label: "Anasayfa",
    content: "Burası Anasayfa. Hoş geldiniz!",
  },
  {
    key: "2",
    id: "education",
    label: "Eğitim",
    content:
      "Eğitim sayfasına hoş geldiniz. Burada eğitimler hakkında bilgi bulabilirsiniz.",
  },
  {
    key: "3",
    id: "services",
    label: "Hizmetler",
    content: "Hizmetlerimiz hakkında detaylı bilgiye buradan ulaşabilirsiniz.",
  },
  {
    key: "4",
    id: "projects",
    label: "Projeler",
    content: "Projelerimiz burada listelenmiştir. İnceleyebilirsiniz.",
  },
  {
    key: "5",
    id: "contact",
    label: "Bana Ulaş",
    content: "Bizimle iletişime geçmek için bu sayfayı kullanabilirsiniz.",
  },
];

function App() {
  const [activeKey, setActiveKey] = useState("1");
  const sectionRefs = useRef([]);

  useEffect(() => {
    // Sayfa yüklenince en üste git
    window.scrollTo(0, 0);

    // IntersectionObserver ile scroll takip
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            if (index !== -1) {
              setActiveKey(navbar[index].key);
            }
          }
        });
      },
      { threshold: 0.6 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <Layout style={{ minHeight: "100vh", width: "100vw" }}>
<Header
  style={{
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 1000,
    height: 64,
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // kırmızı + opacity
    backdropFilter: "blur(4px)", // opsiyonel: hafif blur efekti verir
  }}
>
  {/* Site İkonu */}
  <a
    href="#home"
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
  </a>

  <Menu
    theme="dark"
    mode="horizontal"
    selectedKeys={[activeKey]}
    style={{
      flex: 1,
      justifyContent: "flex-end",
      display: "flex",
      flexWrap: "wrap",
      backgroundColor: "transparent", // Menü arka planı görünmesin
    }}
    items={navbar.map((section) => ({
      key: section.key,
      label: (
        <a
          href={`#${section.id}`}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          {section.label}
        </a>
      ),
    }))}
  />
</Header>


      <Content style={{ backgroundColor: "var(--bg-color)" }}>
        {navbar.map((section, index) => (
          <section
            id={section.id}
            key={section.key}
            ref={(el) => (sectionRefs.current[index] = el)}
            style={{
              minHeight: "100vh",
              paddingTop: index === 0 ? 64 : 128,
              marginTop: index === 0 ? 0 : -64,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              scrollMarginTop: 64,
            }}
          >
            {section.key === "1" ? (
              <Home />
            ) : (
              <>
                <h1>{section.label}</h1>
                <p style={{ maxWidth: "600px", textAlign: "center" }}>
                  {section.content}
                </p>
              </>
            )}
          </section>
        ))}
        <Footer />
      </Content>
    </Layout>
  );
}

export default App;
