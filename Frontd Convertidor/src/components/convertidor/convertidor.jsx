import { useState } from "react"
import axios from "axios"
import './convertidor.css'
 
export const Convertidor = () => {
 
    const [ formData, setFormData ] = useState({
        from: '',
        to: '',
        amount: ''
    });
 
    const [ result, setResult ] = useState(null);
    const [ error, setError ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
 
    const currencyCode = ['GTQ', 'USD', 'EUR', 'MXN', 'HNL', 'CAD']
 
    const handleChange = (evento) => {
        const { name, value } = evento.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }
 
    const handleSubmit = async (evento) => {
        evento.preventDefault();
        setError('');

        if(!formData.from || !formData.to || !formData.amount){
            setResult(null);
            setError('Completa todos los campos');
            return;
        }

        if(Number(formData.amount) <= 0){
            setResult(null);
            setError('El monto debe ser mayor a 0');
            return;
        }

        setIsLoading(true);

        try {
 
            const response = await axios.post(
                'http://localhost:3000/api/v1/convert',
                {
                    ...formData,
                    amount: Number(formData.amount)
                }
            );
 
            setResult(response.data);
            setError('');
 
        } catch (error) {
            setResult(null);
            setError(error?.response?.data?.msg || 'No se pudo realizar la conversión');
        } finally {
            setIsLoading(false);
        }
    }
 
    return (
        <div>
            <section className="converter">
                <form onSubmit={handleSubmit}>
                    <select
                        name="from"
                        value={formData.from}
                                onChange={handleChange}
                       className="input"
                                required
                    >
                        <option value="">Moneda de origen</option>
                        {
                            currencyCode.map((code) => {
                                return (
                                    <option key={code} value={code}>
                                        {code}
                                    </option>
                                );
                            })
                        }
                    </select>
                    <select
                        name="to"
                        value={formData.to}
                                onChange={handleChange}
                       className="input"
                                required
                    >
                        <option value="">Moneda de destino</option>
                        {currencyCode.map((code) => {
                            return (
                                <option key={code} value={code}>
                                    {code}
                                </option>
                            );
                        })}
                    </select>
                    <input  
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="Escribe el monto a convertir"
                        type="number"
                        className="input"
                        min="0.01"
                        step="0.01"
                        required
                    />
                    <button type="submit" className="submit-btn" disabled={isLoading}>
                        {isLoading ? 'Convirtiendo...' : 'Convertir'}
                    </button>
                </form>
                {result && (
                    <div className="result">
                        <p>
                            Total de la conversión: {result.conversionAmount} { result.target }
                        </p>
                        <p>
                            Tipo de cambio: { result.conversionRate }
                        </p>
                    </div>    
                )}
                {error && <p className="error">Error: {error}</p>}
            </section>
        </div>
    );
}
 