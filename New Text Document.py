# create_project.py
# Run with: python create_project.py
# This will create the project folders and files listed by the user with small placeholder contents.

from pathlib import Path
import json

files = [
    "src/assets/youware-bg.png",

    "src/components/Logo.jsx",
    "src/components/Navbar.jsx",
    "src/components/Sidebar.jsx",

    "src/contexts/AuthContext.jsx",
    "src/contexts/ThemeContext.jsx",

    "src/pages/accountant/AccountantDashboard.jsx",
    "src/pages/accountant/Payments.jsx",

    "src/pages/admin/AdminDashboard.jsx",
    "src/pages/admin/ManageUsers.jsx",
    "src/pages/admin/Settings.jsx",

    "src/pages/auth/Login.jsx",
    "src/pages/auth/Register.jsx",

    "src/pages/shared/Assignments.jsx",
    "src/pages/shared/Classes.jsx",
    "src/pages/shared/Exams.jsx",
    "src/pages/shared/Finance.jsx",
    "src/pages/shared/Invoices.jsx",
    "src/pages/shared/Messages.jsx",
    "src/pages/shared/OnlineClasses.jsx",
    "src/pages/shared/Profile.jsx",
    "src/pages/shared/Reports.jsx",
    "src/pages/shared/Settings.jsx",

    "src/pages/student/Attendance.jsx",
    "src/pages/student/OnlineExam.jsx",
    "src/pages/student/StudentDashboard.jsx",

    "src/pages/teacher/Classes.jsx",
    "src/pages/teacher/CreateExam.jsx",
    "src/pages/teacher/TeacherDashboard.jsx",

    "src/routes/ProtectedRoute.jsx",

    "src/styles/globals.css",

    "src/utils/storage.js",
    "src/utils/validators.js",

    "src/App.jsx",
    "src/main.jsx",
    "src/index.css",
    "src/index.html",

    "package.json",
    "PROJECT_DIAGRAM.svg",
    "tailwind.config.js",
    "vite.config.js",
    "YOUWARE.md",
    "yw_manifest.json"
]

# Simple placeholder templates for different file types
jsx_template = """import React from "react";

export default function {name}() {{
  return (
    <div>
      <h2>{name} component</h2>
      <p>Placeholder content — replace with actual UI.</p>
    </div>
  );
}}
"""

auth_context_template = """import React, { createContext, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {{
  const [user, setUser] = useState(null);
  const login = (u) => setUser(u);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {{children}}
    </AuthContext.Provider>
  );
}}
"""

theme_context_template = """import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext("light");

export function ThemeProvider({ children }) {{
  const [theme, setTheme] = useState("light");
  useEffect(() => {{
    document.documentElement.setAttribute("data-theme", theme);
  }}, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {{children}}
    </ThemeContext.Provider>
  );
}}
"""

storage_js = """// simple storage utility (localStorage wrapper)
export function setItem(key, value) {{
  localStorage.setItem(key, JSON.stringify(value));
}}
export function getItem(key) {{
  const v = localStorage.getItem(key);
  return v ? JSON.parse(v) : null;
}}
export function removeItem(key) {{
  localStorage.removeItem(key);
}}
"""

validators_js = """// simple validators placeholder
export function isEmail(s) {{
  return /\\S+@\\S+\\.\\S+/.test(s);
}}
export function isRequired(s) {{
  return s !== undefined && s !== null && String(s).trim().length > 0;
}}
"""

app_jsx = """import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import StudentDashboard from "./pages/student/StudentDashboard";

export default function App() {{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/protected" element={<ProtectedRoute><div>Protected</div></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}}
"""

protected_route_jsx = """import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {{
  const isAuthenticated = false; // placeholder, integrate with AuthContext
  if (!isAuthenticated) return <Navigate to="/auth/login" replace />;
  return children;
}}
"""

index_html = """<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>YOUWARE App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
"""

main_jsx = """import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(<App />);
"""

index_css = """/* global styles placeholder */
html, body, #root {
  height: 100%;
  margin: 0;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}
"""

globals_css = """/* globals.css placeholder */
:root {
  --bg: #ffffff;
  --text: #111827;
}
body {
  background: var(--bg);
  color: var(--text);
}
"""

package_json = {
    "name": "youware-project",
    "version": "0.1.0",
    "private": True,
    "scripts": {
        "dev": "vite",
        "build": "vite build",
        "preview": "vite preview"
    },
    "dependencies": {
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "react-router-dom": "^6.0.0"
    },
    "devDependencies": {
        "vite": "^5.0.0"
    }
}

tailwind_config = """// tailwind.config.js placeholder
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
"""

vite_config = """// vite.config.js placeholder
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
"""

youware_md = "# YOUWARE Project\n\nProject scaffold created by script."

yw_manifest = {}

readme_placeholder = "# Placeholder\n\nReplace these files with your real app code."

# helper to write file with directories created
def write_file(path: Path, content: str | bytes):
    path.parent.mkdir(parents=True, exist_ok=True)
    if isinstance(content, bytes):
        path.write_bytes(content)
    else:
        path.write_text(content, encoding="utf-8")
    print(f"Created: {path}")

def main():
    for p in files:
        path = Path(p)
        suffix = path.suffix.lower()

        # Special-case types
        if suffix == ".jsx":
            # choose specific template for contexts, App, ProtectedRoute, etc.
            name = path.stem
            if "AuthContext" in name:
                write_file(path, auth_context_template)
            elif "ThemeContext" in name:
                write_file(path, theme_context_template)
            elif path.name == "App.jsx":
                write_file(path, app_jsx)
            elif path.name == "ProtectedRoute.jsx":
                write_file(path, protected_route_jsx)
            else:
                # normal component
                cname = "".join(part.capitalize() for part in path.stem.split("_"))
                write_file(path, jsx_template.format(name=cname))
        elif suffix == ".js":
            if path.name == "storage.js":
                write_file(path, storage_js)
            elif path.name == "validators.js":
                write_file(path, validators_js)
            else:
                write_file(path, "// placeholder js\n")
        elif suffix == ".css":
            if path.name == "globals.css":
                write_file(path, globals_css)
            elif path.name == "index.css":
                write_file(path, index_css)
            else:
                write_file(path, "/* placeholder css */\n")
        elif suffix == ".png":
            # create empty binary placeholder for image
            write_file(path, b"")
        elif path.name == "index.html":
            write_file(path, index_html)
        elif path.name == "main.jsx":
            write_file(path, main_jsx)
        elif path.name == "App.jsx":
            write_file(path, app_jsx)
        elif path.name == "package.json":
            write_file(path, json.dumps(package_json, indent=2))
        elif path.name == "tailwind.config.js":
            write_file(path, tailwind_config)
        elif path.name == "vite.config.js":
            write_file(path, vite_config)
        elif path.name == "YOUWARE.md":
            write_file(path, youware_md)
        elif path.name == "yw_manifest.json":
            write_file(path, json.dumps(yw_manifest, indent=2))
        elif path.suffix == ".svg":
            write_file(path, "<svg><!-- diagram placeholder --></svg>")
        else:
            # fallback: plain placeholder
            write_file(path, "// placeholder file\n")

    # Also ensure src/ exists
    Path("src").mkdir(parents=True, exist_ok=True)
    print("\nProject scaffold complete. Open this folder in VS Code.")

if __name__ == "__main__":
    main()
