import { useEffect } from "react";
import { Link  } from "react-router";

const Layout = ({ children, title, banner }) => {
    useEffect(() => {
        if (title) document.title = ` GoGreener | ${title} `
    }, [title]);

  return (
    <div className="d-flex flex-column min-vh-100">
      {banner && (
        <div className="w-100">
          <Link to="/about">
            <img
              src={banner}
              alt="banner"
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
              }}
            />
          </Link>
        </div>
      )}
      <main className="flex-grow-1 container py-4">
        <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
            {title && <h2 >{title}</h2>}
            {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
