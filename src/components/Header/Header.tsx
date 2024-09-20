import Image from "next/image";
import './styles.scss';

export default function Header() {
    return (
        <header>
            <div className="header-container">
                <div>
                    <Image src="/images/logo.svg" alt="logo" width={150} height={36} />
                </div>
                <div>
                    <h1 >Bem-vindo de volta, Marcus</h1>
                </div>
                <div>
                    <p>Segunda, 01 de dezembro de 2025</p>
                </div>
            </div>
        </header>
    )
}