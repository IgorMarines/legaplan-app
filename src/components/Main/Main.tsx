import './styles.scss';

export default function Main({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className='container'>
            <main>
                {children}
            </main>
        </div>
    );
}
