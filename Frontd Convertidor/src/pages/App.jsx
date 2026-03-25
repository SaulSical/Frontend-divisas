import { Convertidor } from '../components/convertidor/convertidor.jsx';
import { Navbar } from '../components/Navbar/Navbar.jsx';
import { Footer } from '../components/footer/footer.jsx';
 
export const App = () => {
    return (
        <main>
            <Navbar />
            <Convertidor />
            <Footer />
        </main>
    );
}