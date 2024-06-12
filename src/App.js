import { useState } from 'react';
import './App.css';

function App() {
  const [ flowRate, setFlowRate] = useState(null);
  const [ coConc, setcoConc] = useState(null);
  const [ chConc, setchConc] = useState(null);
  const [ hSeason, sethSeason] = useState(null);
  const [ cRate, setcRate] = useState(null);

  const [ coDensity, setcoDensity] = useState(1.861);
  const [ chDensity, setchDensity] = useState(0.6785);
  const [ gwpCo, setgwpCo] = useState(1);
  const [ gwpCh, setgwpCh] = useState(25);
  const [ coTon, setcoTon] = useState(30);

  return (
    <div className="App">
      <h1 className="mainTitle">Emissions MDU Credits</h1>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div className="inputData">
          <section className="user">
            <h2 className="userTitle">Input</h2>
            <form>
              <p>Flow Rate / SCFH : </p>
              <input type="text" value={flowRate} onChange={(e) => setFlowRate(e.target.value)}/>
              <br />
              <p>CO<sub>2</sub> Concentration in nat-gas / % : </p>
              <input type="text" value={coConc} onChange={(e) => setcoConc(e.target.value)}/>
              <br />
              <p>CH<sub>4</sub> Concentration in nat-gas / % : </p>
              <input type="text" value={chConc} onChange={(e) => setchConc(e.target.value)}/>
              <br />
              <p>Heating Season / yr : </p>
              <input type="text" value={hSeason} onChange={(e) => sethSeason(e.target.value)}/>
              <br />
              <p>Conversion Rate / % : </p>
              <input type="text" value={cRate} onChange={(e) => setcRate(e.target.value)}/>
            </form>
          </section>
          <section className="constants">
          <h2 className="userTitle">Constants</h2>
            <form>
              <p>CO<sub>2</sub> Density / kg/m<sup>3</sup> : </p>
              <input type="text" defaultValue={coDensity} onChange={(e) => setcoDensity(e.target.value)}/>
              <br />
              <p>CH<sub>4</sub> Density / kg/m<sup>3</sup> : </p>
              <input type="text" defaultValue={chDensity} onChange={(e) => setchDensity(e.target.value)}/>
              <br />
              <p>GWP CO<sub>2</sub> : </p>
              <input type="text" defaultValue={gwpCo} onChange={(e) => setgwpCo(e.target.value)}/>
              <br />
              <p>GWP CH<sub>4</sub> : </p>
              <input type="text" defaultValue={gwpCh} onChange={(e) => setgwpCh(e.target.value)}/>
              <br />
              <p>CO<sub>2</sub> per tonne / $ : </p>
              <input type="text" defaultValue={coTon} onChange={(e) => setcoTon(e.target.value)}/>
            </form>
          </section>
        </div>
      </div>
      <div style={{textAlign: 'center'}}>
        <button className='calculate' onClick={() => document.getElementById('result').style.display = 'flex'}>Calculate</button>
      </div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <section id="result">
          <table>
            <tr>
              <th></th>
              <th colSpan={2}>Emissions</th>
            </tr>
            <tr>
              <th></th>
              <th>Initial</th>
              <th>After Converter</th>
            </tr>
            <tr>
              <th className='rowDesc'>CH<sub>4</sub> / tonne</th>
              <td>{ ((flowRate*0.02831685) * 8760 * chConc/100 * chDensity * gwpCh / 1000).toFixed(2)}</td>
              <td>{ (((flowRate*0.02831685) * 8760 * chConc/100 * chDensity * gwpCh / 1000) * (1 - (cRate/100))).toFixed(2)}</td>
            </tr>
            <tr>
              <th className='rowDesc'>CO<sub>2</sub> from CH<sub>4</sub> conversion</th>
              <td></td>
              <td>{ ((flowRate*0.02831685) * 8760 * chConc/100 * cRate/100 * coDensity/1000).toFixed(2)}</td>
            </tr>
            <tr>
              <th className='rowDesc'>CO<sub>2</sub> / tonne</th>
              <td>{ ((flowRate*0.02831685) * 8760 * coConc/100 * coDensity * gwpCo/1000).toFixed(2)}</td>
              <td>{ ((flowRate*0.02831685) * 8760 * coConc/100 * coDensity * gwpCo/1000).toFixed(2)}</td>
            </tr>
            <tr>
              <th className='rowDesc'>GHG Reduction Tonnes</th>
              <td>{ (((flowRate*0.02831685) * 8760 * chConc/100 * chDensity * gwpCh / 1000) + ((flowRate*0.02831685) * 8760 * coConc/100 * coDensity * gwpCo/1000)).toFixed(2)}</td>
              <td>{ ((((flowRate*0.02831685) * 8760 * chConc/100 * chDensity * gwpCh / 1000) * (1 - (cRate/100))) + ((flowRate*0.02831685) * 8760 * chConc/100 * cRate/100 * coDensity/1000) + ((flowRate*0.02831685) * 8760 * coConc/100 * coDensity * gwpCo/1000)).toFixed(2)}</td>
            </tr>
          </table>
          <div className='statement'>
            <h1>GHG Reduction (CO<sub>2</sub> tonnes) : <span>{ ((((flowRate*0.02831685) * 8760 * chConc/100 * chDensity * gwpCh / 1000) + ((flowRate*0.02831685) * 8760 * coConc/100 * coDensity * gwpCo/1000)) - ((((flowRate*0.02831685) * 8760 * chConc/100 * chDensity * gwpCh / 1000) * (1 - (cRate/100))) + ((flowRate*0.02831685) * 8760 * chConc/100 * cRate/100 * coDensity/1000) + ((flowRate*0.02831685) * 8760 * coConc/100 * coDensity * gwpCo/1000))).toFixed(2)}</span></h1>
            <h1>GHG Reduction ($) : <span>${ Number((((((flowRate*0.02831685) * 8760 * chConc/100 * chDensity * gwpCh / 1000) + ((flowRate*0.02831685) * 8760 * coConc/100 * coDensity * gwpCo/1000)) - ((((flowRate*0.02831685) * 8760 * chConc/100 * chDensity * gwpCh / 1000) * (1 - (cRate/100))) + ((flowRate*0.02831685) * 8760 * chConc/100 * cRate/100 * coDensity/1000) + ((flowRate*0.02831685) * 8760 * coConc/100 * coDensity * gwpCo/1000))) * coTon).toFixed(2)).toLocaleString('en')}</span></h1>
          </div>
        </section>
      </div>     
      
    </div>
  );
}

export default App;
