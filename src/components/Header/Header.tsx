import Image from "next/image";
import './styles.scss';
import {HeaderDataInfo} from '../../utils/DateNow';

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
                    <p>{HeaderDataInfo}</p>
                </div>
            </div>
        </header>
    )
}