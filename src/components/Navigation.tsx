import { Link } from "react-router-dom";

export function Navigation() {
    return (
        <nav className="navigation">
            <div>
                
            </div>
            <span className="links">
                <Link to='/' className="link">Калькулятор</Link>
                <Link to='/calories' className="link">Дневной отчет</Link>
                <p className="link">Профиль</p>
            </span>
        </nav>
    )
}