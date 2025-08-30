import { useEffect } from "react";

const Layout = ({ children, title }) => {
    useEffect(() => {
        if (title) document.title = ` GoGreener | ${title} `
    }, [title]);

  return (
    <div className="d-flex flex-column min-vh-100">
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
