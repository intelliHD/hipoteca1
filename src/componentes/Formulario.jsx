import { MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { calcularTotal } from '../helpers';
import InputNumeric from './InputNumeric';


const Formulario = ({cantidad, setCantidad, plazo, setPlazo, setTotal,deposito,setDeposito,interes,setInteres}) => {

    const [error, setError] = useState(false);

    const calcularPrestamo = e => {
        e.preventDefault();
        if (cantidad === 0 || plazo ==="") {
            setError(true);
            return;
        }
        setError(false);
        
        const total = calcularTotal(cantidad, plazo,interes,deposito);
        setTotal(total);
        //console.log(total);
    }

    const onChange = ({target}) => {
      
        // console.log(target.value * interes / 100);
        switch (target.name) {
            case 'precio':
                setCantidad(parseInt(target.value));
                setDeposito(target.value * interes / 100)
                console.log(deposito);
                break;
            case 'plazo':
                
                setPlazo(parseInt(target.value))

                break;
            case 'interes':
                
                setInteres(parseInt(target.value))
                setDeposito( (cantidad *target.value / 100).toFixed(0))
                break;
        
            default:
                break;
        }

    } 
    
    useEffect(() => {
        setDeposito(cantidad * interes / 100)
    }, [cantidad])
    

    return ( 
        <>
            <form onSubmit={ calcularPrestamo }>
                <div className="column">
                    <div>
                        <label >Precio de la vivienda</label>
                        
                        <InputNumeric
                        label={''}
                        name='precio'
                        values={cantidad}
                        handleChange={(e) => onChange(e)  }
                        />
                    </div>
                    <div>
                        <label >Deposito</label>
                        <InputNumeric
                       
                        name='deposito'
                        values={deposito}
                        handleChange={(e) => onChange(e)  }
                        />
                    </div>
                    <div  >
                        <label>Intereses (%)</label>
                        <Select
                            // value={values.interes}
                            className='selected'
                            onChange={(e) => onChange(e)}
                            name='interes'
                            autoWidth
                            defaultValue={"7"}
                            >
                                <MenuItem value="1">1%</MenuItem>
                                <MenuItem value="2">2%</MenuItem>
                                <MenuItem value="3">3%</MenuItem>
                                <MenuItem value="4">4%</MenuItem>
                                <MenuItem value="5">5%</MenuItem>
                                <MenuItem value="6">6%</MenuItem>
                                <MenuItem value="7">7%</MenuItem>
                            </Select>
                        {/* <select 
                        onChange={(e) => onChange(e)}
                        name={'interes'}
                        defaultValue={"7"}
                        >
                            <option value="">Seleccionar</option>
                            <option value="1">1%</option>
                            <option value="2">2%</option>
                            <option value="3">3%</option>
                            <option value="4">4%</option>
                            <option value="5">5%</option>
                            <option value="6">6%</option>
                            <option value="7">7%</option>
                        </select> */}
                    </div>
                    <div>
                        <label >Plazo en años</label>
                        
                        <TextField
                        type="number" 
                        onChange={(e) => onChange(e)}
                    
                        name='plazo'
                        value={plazo}
                        placeholder='12 años'
                       
                        variant="outlined"
                        
                    />
                    </div>
                </div>
                <div className="btnSubmit">
                    <input type="submit" value="Calcular" />
                </div>
            </form>
            {(error) ? <p className='error'>Todos los campos son obligatorios...</p> : ""}
            
        </>
    );
}
 
export default Formulario;